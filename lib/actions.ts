'use server'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
export async function revalidateUser() {
  console.log('Revalidating user cache')
  try {
    revalidateTag('user')
    redirect('/')
  } catch (error) {
    console.error('Revalidation error:', error)
  }
}
