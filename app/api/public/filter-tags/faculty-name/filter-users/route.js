import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

// async function getUsers(guildsIds, users) {
//   try {
//     const finalUsers = []
//     for (let i = 0; i < guildsIds.length; i++) {
//       for (let j = 0; j < users.length; j++) {
//         if (guildsIds[i] === users[j].guild_id) {
//           finalUsers.push(users)
//         }
//       }
//     }
//     return finalUsers
//   } catch (error) {
//     console.error(`Error fetching users for guild ID: ${guild_id}`, error)
//     return []
//   }
// }

async function getUsers(guildsIds, users) {
  try {
    const guildsMap = new Map()

    // Create a map where key is guild_id and value is an array of users
    for (const user of users) {
      if (!guildsMap.has(user.guild_id)) {
        guildsMap.set(user.guild_id, [])
      }
      guildsMap.get(user.guild_id).push(user)
    }

    const finalUsers = []

    // Iterate through guildsIds and collect users from the map
    for (const guildId of guildsIds) {
      if (guildsMap.has(guildId)) {
        finalUsers.push(...guildsMap.get(guildId))
      }
    }

    return finalUsers
  } catch (error) {
    console.error('Error fetching users:', error)
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
    console.log(`guilds fetched: ${guilds.length}`)

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
    const uniqueGuildIdsArray = Array.from(new Set(validGuildIds))

    const passedUsers = await getUsers(uniqueGuildIdsArray, users)

    console.log('passed guilds: ', uniqueGuildIdsArray.length)

    console.log('passed users: ', passedUsers.length)

    return NextResponse.json(passedUsers)
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
