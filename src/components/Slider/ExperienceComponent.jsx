'use client'

import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

export default function ExperienceComponent() {
  return (
    <div className='mt-10 flex size-full flex-col items-center'>
      <div className='relative flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex flex-col '>
          <div className='flex justify-center text-7xl drop-shadow'>Experience</div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='absolute right-6 top-6 w-56 rounded-2xl border p-2 text-white shadow-md '
          >
            Add New Project
          </motion.button>

          <Tabs>
            <TabList>
              <Tab>Project 1</Tab>
              <Tab>Project 2</Tab>
              <Tab>Project 3</Tab>
              <Tab>Project 4</Tab>
            </TabList>

            <TabPanel>
              <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                <div className='flex justify-between gap-x-5'>
                  <div className='flex items-center'>
                    <img className=' rounded-t-lg object-cover' src='/image.png' alt='' />
                  </div>
                  <div>
                    <div className='flex items-center justify-between'>
                      <h1 className='text-2xl font-bold'>Project 1 Name</h1>

                      <h1 className='text-xl font-semibold'>Educational</h1>
                    </div>
                    <p className='mt-4 '>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum fugit corrupti aperiam saepe
                      fugiat illum ad iure asperiores quod dolores inventore vitae, quasi nulla pariatur, molestiae
                      animi itaque harum.
                    </p>
                    <p className='mt-4'>Skills : HTML, CSS, REACT.JS, DOTNET</p>
                    <p className='mt-4'>Tools and Tech : VSCODE, FIGMA</p>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='rounded-xl bg-black p-2 hover:bg-white/20'>Read More</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                <div className='flex justify-between gap-x-5'>
                  <div className='flex items-center'>
                    <img className=' rounded-t-lg object-cover' src='/image.png' alt='' />
                  </div>
                  <div>
                    <div className='flex items-center justify-between'>
                      <h1 className='text-2xl font-bold'>Project 2 Name</h1>

                      <h1 className='text-xl font-semibold'>Educational</h1>
                    </div>
                    <p className='mt-4 '>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum fugit corrupti aperiam saepe
                      fugiat illum ad iure asperiores quod dolores inventore vitae, quasi nulla pariatur, molestiae
                      animi itaque harum.
                    </p>
                    <p className='mt-4'>Skills : HTML, CSS, NEXT.JS</p>
                    <p className='mt-4'>Tools and Tech : VSCODE, FIGMA</p>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='rounded-xl bg-black p-2 hover:bg-white/20'>Read More</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                <div className='flex justify-between gap-x-5'>
                  <div className='flex items-center'>
                    <img className=' rounded-t-lg object-cover' src='/image.png' alt='' />
                  </div>
                  <div>
                    <div className='flex items-center justify-between'>
                      <h1 className='text-2xl font-bold'>Project 3 Name</h1>

                      <h1 className='text-xl font-semibold'>Educational</h1>
                    </div>
                    <p className='mt-4 '>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum fugit corrupti aperiam saepe
                      fugiat illum ad iure asperiores quod dolores inventore vitae, quasi nulla pariatur, molestiae
                      animi itaque harum.
                    </p>
                    <p className='mt-4'>Skills : NEXT.JS</p>
                    <p className='mt-4'>Tools and Tech : VSCODE</p>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='rounded-xl bg-black p-2 hover:bg-white/20'>Read More</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                <div className='flex justify-between gap-x-5'>
                  <div className='flex items-center'>
                    <img className=' rounded-t-lg object-cover' src='/image.png' alt='' />
                  </div>
                  <div>
                    <div className='flex items-center justify-between'>
                      <h1 className='text-2xl font-bold'>Project 4 Name</h1>

                      <h1 className='text-xl font-semibold'>Work</h1>
                    </div>
                    <p className='mt-4 '>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum fugit corrupti aperiam saepe
                      fugiat illum ad iure asperiores quod dolores inventore vitae, quasi nulla pariatur, molestiae
                      animi itaque harum.
                    </p>
                    <p className='mt-4'>Skills : HTML, CSS, NEXT.JS</p>
                    <p className='mt-4'>Tools and Tech : VSCODE, FIGMA</p>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='rounded-xl bg-black p-2 hover:bg-white/20'>Read More</button>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
