'use server'
import { revalidateTag } from 'next/cache'

export  async function revalidateUser() {
  return revalidateTag('user')
}
