'use server'
import { revalidateTag } from 'next/cache'

export async function revalidateUser() {
console.log('Revalidating user cache')
  return revalidateTag('user')
}
