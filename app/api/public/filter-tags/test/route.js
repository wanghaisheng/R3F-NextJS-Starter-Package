import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// let guilds = []
// let users = []

// async function getGuildId(faculty_name) {
//   try {
//     const guild = guilds.find((guild) => {
//       return guild.faculty.some((faculty) => faculty.faculty_name === faculty_name)
//     })
//     return guild ? guild.id : null // Assuming guild.id is the correct ID field
//   } catch (error) {
//     console.error(`Error fetching guild ID for faculty: ${faculty_name}`, error)
//     return null
//   }
// }

// async function getUsers(guild_id) {
//   try {
//     const sendUsers = users.filter((user) => user.guild_id === guild_id)
//     return sendUsers
//   } catch (error) {
//     console.error(`Error fetching users for guild ID: ${guild_id}`, error)
//     return []
//   }
// }

// // Break down inputTags into smaller batches
// async function batchProcess(array, batchSize, callback) {
//   const results = []
//   for (let i = 0; i < array.length; i += batchSize) {
//     const batch = array.slice(i, i + batchSize)
//     const result = await callback(batch)
//     results.push(...result)
//   }
//   return results
// }

// export async function POST(request) {
//   try {
//     const { inputTags } = await request.json()
//     console.log(`Input tags: ${inputTags.length}`)

//     // Fetch users and guilds once
//     guilds = await prisma.guilds.findMany()
//     console.log(`Guilds fetched: ${guilds.length}`)

//     const allUsers = await prisma.users.findMany({
//       select: {
//         first_name: true,
//         last_name: true,
//         username: true,
//         email: true,
//         image_urls: true,
//         description: true,
//         guild_id: true,
//         address: true,
//         region: true,
//         cards: true,
//         experience: true,
//         avatar: true,
//         skills: true,
//         faculty: true,
//       },
//     })
//     users = allUsers.filter(
//       (user) => user.username && user.email && user.region?.ip && user.avatar.length !== 0 && user.guild_id,
//     )
//     console.log(`Users fetched: ${users.length}`)

//     const batchSize = 5 // Adjust the batch size based on your requirements

//     // Ensure all guild IDs are fetched before mapping users
//     const filteredGuildIds = await batchProcess(inputTags, batchSize, async (batch) => {
//       const guildIds = await Promise.all(batch.map((tag) => getGuildId(tag)))
//       return guildIds
//     })

//     // Filter out any null guild IDs
//     const validGuildIds = filteredGuildIds.filter((id) => id !== null)
//     const uniqueGuildIdsSet = new Set(validGuildIds)
//     const uniqueGuildIdsArray = [...uniqueGuildIdsSet]
//     console.log(`unique guild IDs: ${uniqueGuildIdsArray.length}`)

//     // Fetch all users based on valid guild IDs
//     const usersByGuild = await batchProcess(uniqueGuildIdsArray, batchSize, async (batch) => {
//       const userResults = await Promise.all(batch.map((guild_id) => getUsers(guild_id)))
//       return userResults
//     })

//     const passedUser = usersByGuild[0]
//     console.log(`passed users list: ${passedUser.length}`)

//     return NextResponse.json(passedUser)
//   } catch (error) {
//     console.error('Error processing request:', error)
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
//   }
// }

let guilds = []
let users = []

async function getGuildId(faculty_name) {
  try {
    const guild = guilds.find((guild) => {
      return guild.faculty.some((faculty) => faculty.faculty_name === faculty_name)
    })

    return guild ? guild.id : null // Assuming guild.id is the correct ID field
  } catch (error) {
    console.error(`Error fetching guild ID for faculty: ${faculty_name}`, error)
    return null
  }
}

async function getUsers(guild_id) {
  try {
    const sendUsers = users.filter((user) => user.guild_id === guild_id)
    return sendUsers
  } catch (error) {
    console.error(`Error fetching users for guild ID: ${guild_id}`, error)
    return []
  }
}

// Break down inputTags into smaller batches
async function batchProcess(array, batchSize, callback) {
  const results = []
  for (let i = 0; i < array.length; i += batchSize) {
    const batch = array.slice(i, i + batchSize)
    const result = await callback(batch)
    results.push(...result)
  }
  return results
}

export async function POST(request) {
  try {
    const { inputTags } = await request.json()
    console.log(`Input tags: ${inputTags.length}`)

    // Fetch users and guilds once
    guilds = await prisma.guilds.findMany()
    console.log(`Guilds fetched: ${guilds.length}`)

    const allUsers = await prisma.users.findMany({
      select: {
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        image_urls: true,
        description: true,
        guild_id: true,
        address: true,
        region: true,
        cards: true,
        experience: true,
        avatar: true,
        skills: true,
        faculty: true,
      },
    })
    users = allUsers.filter(
      (user) => user.username && user.email && user.region?.ip && user.avatar.length !== 0 && user.guild_id,
    )
    console.log(`Users fetched: ${users.length}`)

    const batchSize = 5 // Adjust the batch size based on your requirements

    // Ensure all guild IDs are fetched before mapping users
    const filteredGuildIds = await batchProcess(inputTags, batchSize, async (batch) => {
      const guildIds = await Promise.all(batch.map((tag) => getGuildId(tag)))
      return guildIds
    })

    // Filter out any null guild IDs
    const validGuildIds = filteredGuildIds.filter((id) => id !== null)
    const uniqueGuildIdsSet = new Set(validGuildIds)
    const uniqueGuildIdsArray = [...uniqueGuildIdsSet]
    console.log(`unique guild IDs: ${uniqueGuildIdsArray.length}`)

    // Fetch all users based on valid guild IDs
    const usersByGuild = await batchProcess(uniqueGuildIdsArray, batchSize, async (batch) => {
      const userResults = await Promise.all(batch.map((guild_id) => getUsers(guild_id)))
      return userResults
    })

    const passedUser = usersByGuild[0]
    console.log(`passed users : ${passedUser.length}`)

    return NextResponse.json(passedUser)
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
