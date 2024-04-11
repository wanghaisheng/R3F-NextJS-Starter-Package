'use client'
import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState } from 'react'
import FormModal2 from '@/components/FormModal/Modal2'

export default function CardComponent() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [cards, setCards] = useState([
    {
      type: 'Educational',
      name: 'School/College Name',
      description: 'lorem',
      dateIn: 'calendar',
      dateOut: 'calendar',
    },
    {
      type: 'Work',
      name: 'Office Name',
      description: 'lorem',
      dateIn: 'calendar',
      dateOut: 'calendar',
    },
    {
      type: 'Gym',
      name: 'Gym Name',
      description: 'lorem',
      dateIn: 'calendar',
      dateOut: 'calendar',
    },
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
    setProjects((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].description = newDescription
      return updatedCards
    })
  }

  const handleCardDateInChange = (index, newDateIn) => {
    setProjects((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].dateIn = newDateIn
      return updatedCards
    })
  }

  const handleCardDateOutChange = (index, newDateOut) => {
    setProjects((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].dateOut = newDateOut
      return updatedCards
    })
  }

  const handleAddCards = () => {
    setProjects((prevCards) => [...prevCards, { type: '', name: '', description: '', dateIn: '', dateOut: '' }])
  }

  const openCardModal = () => {
    setIsCardModalOpen(true)
  }

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div className='relative flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex w-full flex-col'>
          <div className='relative my-8 flex justify-center text-7xl drop-shadow'>
            Card
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute bottom-0 right-0 w-fit rounded-lg bg-black p-2 text-sm text-white shadow-md '
              onClick={() => {
                openCardModal(true)
              }}
            >
              Add New Project &emsp;&emsp; +
            </motion.button>
          </div>

          <FormModal2 show={isCardModalOpen} onClick={openCardModal} onclose={setIsCardModalOpen}>
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className='my-4 flex w-fit items-center rounded-[20px] bg-black px-4 py-2 shadow-sm shadow-white'
            >
              <button onClick={handleAddCards}>Add New Card</button>
            </motion.div>
            {cards.map((card, index) => (
              <div key={index}>
                <input
                  type='text'
                  value={card.type}
                  onChange={(e) => handleCardTypeChange(index, e.target.value)}
                  placeholder='Card Type'
                  className='rounded-md bg-white/20'
                />
                <input
                  type='text'
                  value={card.name}
                  onChange={(e) => handleCardNameChange(index, e.target.value)}
                  placeholder='Card Name'
                  className='rounded-md bg-white/20'
                />
                <input
                  type='text'
                  value={card.description}
                  onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                  placeholder='Card Description'
                  className='rounded-md bg-white/20'
                />
                <input
                  type='text'
                  value={card.dateIn}
                  onChange={(e) => handleCardDateInChange(index, e.target.value)}
                  placeholder='Date In'
                  className='rounded-md bg-white/20'
                />
                <input
                  type='text'
                  value={card.dateOut}
                  onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                  placeholder='Date Out'
                  className='rounded-md bg-white/20'
                />
              </div>
            ))}
          </FormModal2>

          <Tabs>
            <TabList>
              {cards.map((card, index) => (
                <Tab key={index}> {card.type}</Tab>
              ))}
            </TabList>

            {cards.map((card, index) => (
              <TabPanel key={index}>
                <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                  <div className='flex justify-between gap-x-5'>
                    <div className='flex flex-col items-center'>
                      <img
                        className=' rounded-t-lg object-cover'
                        src='/image.png'
                        alt=''
                        width='400px'
                        height='268px'
                      />
                      <h1 className='mt-4 text-xl font-semibold'>{card.type}</h1>
                    </div>
                    <div className='w-[65%]'>
                      <h1 className='text-2xl font-bold'>{card.name}</h1>
                      <p className='mt-4 '>{card.description}</p>
                      <p className='mt-4'>Date In : {card.dateIn}</p>
                      <p className='mt-4'>Date Out : {card.dateOut}</p>
                    </div>
                  </div>
                  {/* <div className='flex justify-end'>
                    <button className='rounded-xl bg-black p-2 hover:bg-white/20'>Read More</button>
                  </div> */}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
