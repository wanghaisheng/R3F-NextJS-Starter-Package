'use client'
import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState } from 'react'

export default function CardComponent() {
  const [cards, setCards] = useState([
    { type: 'Educational', name: 'School/College Name', description: 'lorem', dateIn: '', dateOut: '' },
    { type: 'Work', name: 'Office Name', description: 'lorem', dateIn: '', dateOut: '' },
    { type: 'Gym', name: 'Gym Name', description: 'lorem', dateIn: '', dateOut: '' },
  ])

  const handleCardTypeChange = (index, newType) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].type = newType
      return updatedCards
    })
  }

  const handleCardNameChange = (index, newName) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].name = newName
      return updatedCards
    })
  }

  const handleCardDescriptionChange = (index, newDescription) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].description = newDescription
      return updatedCards
    })
  }

  const handleCardDateInChange = (index, newDateIn) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].dateIn = newDateIn
      return updatedCards
    })
  }

  const handleCardDateOutChange = (index, newDateOut) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].dateOut = newDateOut
      return updatedCards
    })
  }

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div className='relative flex h-fit w-[68%] rounded-3xl border border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex w-full flex-col'>
          {/* heading */}
          <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>
            Card
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute bottom-0 right-0 w-fit rounded-lg bg-black p-2 text-sm text-white shadow-md '
              // onClick={() => {
              // }}
            >
              Add New Card &emsp;&emsp; +
            </motion.button>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='my-6 flex flex-col sm:flex-row sm:items-start sm:justify-start'>
              {cards.map((card, index) => (
                <Tab key={index} className='flex pl-1 pr-5'>
                  {card.type}
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            {cards.map((card, index) => (
              <TabPanel key={index}>
                <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                  <div className='flex justify-between'>
                    {/* Card Image / Container */}
                    <div className='flex w-[50%] flex-col rounded-xl bg-black p-4'>
                      <div translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                        {card.type}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        {card.name}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        {card.description}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        Date In : {card.dateIn}
                      </div>
                      <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                        Date Out : {card.dateOut}
                      </div>
                    </div>

                    {/* Form for user input */}
                    <div className='w-[50%]'>
                      <form className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
                        <div className='flex w-full flex-col gap-y-2 px-4'>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Type</label>
                            <input
                              type='text'
                              value={card.type}
                              onChange={(e) => handleCardTypeChange(index, e.target.value)}
                              placeholder='Card Type'
                              className='w-[70%] rounded-md bg-white/20 px-3'
                              required
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Name</label>
                            <input
                              type='text'
                              value={card.name}
                              onChange={(e) => handleCardNameChange(index, e.target.value)}
                              placeholder='Card Name'
                              className='w-[70%] rounded-md bg-white/20 px-3'
                              required
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Description</label>
                            <input
                              type='text'
                              value={card.description}
                              onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                              placeholder='Card Description'
                              className='w-[70%] rounded-md bg-white/20  px-3'
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Date In</label>
                            <input
                              type='date'
                              className='w-[70%] rounded-md bg-white/20  px-3'
                              onChange={(e) => handleCardDateInChange(index, e.target.value)}
                              required
                            />
                          </div>
                          <div className='flex justify-between'>
                            <label htmlFor=''>Date Out</label>
                            <input
                              type='date'
                              className='w-[70%] rounded-md bg-white/20  px-3'
                              onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                            />
                          </div>
                        </div>
                        {/* Submit button */}
                        <button
                          type='submit'
                          className='mt-4 rounded-xl bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-500'
                        >
                          Generate
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
