'use client'

import { Formik, Field, Form } from 'formik'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider' //----------------> module not found error in my branch
import toast from 'react-hot-toast'
import { revalidateUser } from '../../../lib/actions'

const TestFormik = () => {
  const { user } = useUser()
  const id = user ? user.gg_id : ''
  return (
    <>
      <div className='relative h-screen w-full'>
        <p>{user ? user.username : 'not a username'}</p>
        <div className='flex size-full justify-center mt-24'>
          <Formik
            initialValues={{
              username: '',
            }}
            onSubmit={async (values) => {
              if (id) {
                const res = await fetch(`/api/internal/users/${id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                })
                if (res.ok) {
                  await revalidateUser()
                  toast.success('username updated')
                }
              } else {
                toast.error('id not loaded')
              }
            }}
          >
            <Form>
              <label className='mr-8' htmlFor='username'>
                Username
              </label>
              <Field className='text-black' id='username' name='username' placeholder='username' />
              <button type='submit'>update</button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}

export default TestFormik
