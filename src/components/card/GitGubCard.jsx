'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function GitHubCard({ githubKey }) {
  // State for storing the username
  const [username, setUsername] = useState(() => {
    return ''
  })

  const [repositories, setRepositories] = useState([])

  const [gitData, setGitData] = useState([])

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `Bearer ${githubKey}`,
          },
        })

        setRepositories(response.data)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      }
    }
    const fetchGitData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${githubKey}`,
          },
        })
        setGitData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchRepositories()
    fetchGitData()
  }, [username])

  // Debounced callback function for handling input changes
  const handleChange = useDebouncedCallback((e) => {
    setUsername(e.target.value)
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
          {/* Display GitHub chart if username is provided */}
          {username.length !== 0 && (
            <div className='mt-10 flex justify-center'>
              <img width='1050' src={`https://ghchart.rshah.org/${username}`} alt='github chart' />
            </div>
          )}
          <div className='flex items-center justify-center'>
            <ul>
              {repositories.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url}>{repo.name}</a>
                </li>
              ))}
            </ul>
            <div className='flex flex-col'>
              Created At: {gitData.created_at}
              Public Repos: {gitData.public_repos}
              Follower: {gitData.followers}
              Following: {gitData.following}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
