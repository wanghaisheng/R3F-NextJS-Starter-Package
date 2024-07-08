// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// const checkUser = (user) => {
//   return user.faculty && user.faculty.primary_faculty !== null && user.faculty.primary_faculty !== ''
// }

// export async function GET(request, { params }) {
//   try {
//     const faculty_name = params.facultyname
//     const users = await prisma.users.findMany()
//     const checkedUsers = users.filter((user) => checkUser(user))
//     const filteredUsers = checkedUsers.filter((user) => user.faculty.primary_faculty === faculty_name)

//     return NextResponse.json(filteredUsers)
//   } catch (error) {
//     console.error(error)
//     return new NextResponse('Internal server error', { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const faculty_name = params.facultyname

    const users = await prisma.users.findMany({
      where: {
        AND: [
          {
            faculty: {
              path: ['primary_faculty'],
              not: '',
            },
          },
          {
            faculty: {
              path: ['primary_faculty'],
              equals: faculty_name,
            },
          },
        ],
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
