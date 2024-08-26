'use client'

import { Field, Form, Formik } from 'formik'
// import { useUser } from './UserClientProvider'
import { useUser } from '@/UserClientProvider'
import Cookies from 'js-cookie'
import { revalidateUser } from 'lib/actions'
import toast from 'react-hot-toast'

const TestFormik = () => {
  const { user, updateUser } = useUser()
  const token = Cookies.get('token')
  const id = user ? user.gg_id : ''
  return (
    <>
      <div className='relative h-screen w-full'>
        <p>{user ? user.username : 'not a username'}</p>
        <div className='mt-24 flex size-full justify-center'>
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
                  updateUser(token)
                  toast.success('username updated')
                } else {
                  toast.error('Update failed')
                }
              } else {
                toast.error('id not loaded')
              }
            }}
          >
            <Form action={revalidateUser}>
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
