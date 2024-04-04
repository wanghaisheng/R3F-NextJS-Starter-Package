'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function GitHubCard() {
  // State for storing the username
  const [username, setUsername] = useState(() => {
    return ''
  })

  const [token, setToken] = useState(() => {
    return ''
  })

  const [gitData, setGitData] = useState([])

  useEffect(() => {
    const fetchGitData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setGitData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchGitData()
  }, [username, token])

  // Debounced callback function for handling input changes
  const handleChange = useDebouncedCallback((e) => {
    setUsername(e.target.value)
  }, 400) // Debounce delay of 400ms

  const handleTokenChange = useDebouncedCallback((e) => {
    setToken(e.target.value)
  }, 400) // Debounce delay of 400ms

  return (
    <>
      {/* Main content */}
      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
        {/* Card container */}
        <div className='flex flex-col justify-center rounded-2xl border border-slate-800 bg-black/10 bg-clip-padding p-11 shadow-xl shadow-blue-700 backdrop-blur-md hover:shadow-blue-500 '>
          {/* Input field */}
          <input
            type='text'
            placeholder='Enter your GitHub username'
            onChange={(e) => handleChange(e)}
            className='mx-auto rounded-md bg-blue-950 p-2 text-white focus:outline-none active:bg-blue-700'
          />
          <input
            type='text'
            placeholder='Enter your secret token'
            onChange={(e) => handleTokenChange(e)}
            className='mx-auto rounded-md bg-blue-950 p-2 text-white focus:outline-none active:bg-blue-700'
          />

          {/* Display GitHub chart if username is provided */}
          {username.length !== 0 && (
            <div className='mt-10 flex justify-center'>
              <img width='1050' src={`https://ghchart.rshah.org/${username}`} alt='github chart' />
            </div>
          )}

          <div className=' flex items-center justify-center'>
            <div className='relative mt-10 overflow-x-auto rounded-lg bg-black/10'>
              <table className='w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                <tbody>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Public Repos
                    </th>
                    <td class='px-6 py-4'>{gitData.public_repos}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Joined
                    </th>
                    <td class='px-6 py-4'>{gitData.created_at}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Followers
                    </th>
                    <td class='px-6 py-4'>{gitData.followers}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Following
                    </th>
                    <td class='px-6 py-4'>{gitData.following}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
