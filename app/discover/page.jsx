// import { useState, useEffect } from 'react'
// import HomePage from '@/components/HomePage/HomePage'
import HomePage2 from '@/components/HomePage/HomePage2'
// import axios from 'axios'
// import { toast } from 'react-hot-toast'

// const getUsers = async () => {
//   try {
//     const res = await axios.get('/api/public/users')
//     if (res.status !== 200) {
//       toast.error('Error fetching users')
//       return []
//     }
//     return res.data.filter(
//       (user) =>
//         user.first_name &&
//         user.last_name &&
//         user.username &&
//         user.email &&
//         user.region.ip &&
//         user.avatar.length !== 0 &&
//         user.guild_id,
//     )
//   } catch (error) {
//     toast.error('Internal Server Error')
//     return []
//   }
// }

// const getGuilds = async () => {
//   try {
//     const res = await axios.get('/api/public/guilds')
//     if (res.status !== 200) {
//       toast.error('Failed to fetch guilds data')
//       return []
//     }
//     return res.data
//   } catch (error) {
//     toast.error('Internal Server Error')
//     return []
//   }
// }

const Discover = () => {
  // const [users, setUsers] = useState([])
  // const [guilds, setGuilds] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedUsers = await getUsers()
  //     const fetchedGuilds = await getGuilds()
  //     setUsers(fetchedUsers)
  //     setGuilds(fetchedGuilds)
  //   }
  //   fetchData()
  // }, [])
  // const cookieStorage = cookies()
  // const token = cookieStorage.get('token')
  // console.log(token)
  return (
    <div>
      {/* <HomePage users={users} guilds={guilds} /> */}
      <HomePage2 />
    </div>
  )
}

export default Discover
