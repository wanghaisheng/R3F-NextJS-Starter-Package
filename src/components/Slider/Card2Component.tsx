'use client'
import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import CardsFlipCard from '../card/cardsFlipCard'

import { TiDelete } from 'react-icons/ti'

import axios from 'axios'

async function getCardInfo() {
  try {
    const res = await fetch('http://localhost:3000/api/card')
    if (!res.ok) {
      throw new Error('failed to fetch the skills')
    }
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export default function CardComponent() {
  const { user } = useUser()
  const [cards, setCards] = useState([
    { card_id: '', type: 'newCard', name: '', description: '', dateIn: '', dateOut: '' },
  ])

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const testData = await getCardInfo() // Fetch cards data
        const filteredData = testData.filter((element: any) => element.gg_id === user.gg_id) // Filter data based on user

        if (filteredData.length != 0) {
          setCards(filteredData) // Set the filtered data
        }
      } catch (error) {
        console.error('Error fetching cards data:', error)
      }
    }

    if (user) {
      fetchCardsData() // Fetch data only if user is available
    }
  }, [user])

  const checkActiveCard = (element: any) => {
    return element.gg_id === user.gg_id
  }

  const handleSubmit = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      type: cards[index].type,
      name: cards[index].name,
      description: cards[index].description,
      dateIn: cards[index].dateIn,
      dateOut: cards[index].dateOut,
    }
    try {
      await axios({
        url: `/api/card`,
        method: 'POST',
        data: submit,
      })
      alert('card info saved')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async (e: any, id: any, index: number) => {
    e.preventDefault()
    const submit = {
      type: cards[index].type,
      name: cards[index].name,
      description: cards[index].description,
      dateIn: cards[index].dateIn,
      dateOut: cards[index].dateOut,
    }
    console.log('type: ', typeof submit.dateIn, ': ', submit.dateIn)
    try {
      await axios({
        url: `/api/card/${id}`,
        method: 'PUT',
        data: submit,
      })
      alert('card info updated')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: any) => {
    try {
      await axios({
        url: `/api/card/${id}`,
        method: 'DELETE',
      })
      alert('card info deleted')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const handleCardTypeChange = (index: number, newType: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].type = newType
      return updatedCards
    })
  }

  const handleCardNameChange = (index: number, newName: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].name = newName
      return updatedCards
    })
  }

  const handleCardDescriptionChange = (index: number, newDescription: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].description = newDescription
      return updatedCards
    })
  }

  const handleCardDateInChange = (index: number, newDateIn: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].dateIn = newDateIn
      return updatedCards
    })
  }

  const handleCardDateOutChange = (index: number, newDateOut: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].dateOut = newDateOut
      return updatedCards
    })
  }

  const handleAddCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      { card_id: '', type: 'newCard', name: '', description: '', dateIn: '', dateOut: '' },
    ])
  }

  const handleDeleteCard = (index: number, card_id: any) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards.splice(index, 1)
      handleDelete(card_id)
      return updatedCards
    })
  }

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div
        id='card'
        className='relative flex h-fit w-[68%] rounded-3xl border border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          {/* heading */}
          <div className='relative my-3 flex justify-center text-2xl drop-shadow md:my-8 md:text-7xl'>
            Card
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute top-14 rounded-full bg-black/10 p-2 text-sm text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900 md:bottom-0 md:right-0 md:size-fit'
              onClick={() => {
                handleAddCard()
              }}
            >
              Add Card &emsp; +
            </motion.button>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start md:my-6'>
              {cards.map((card, index) => (
                <Tab key={index} className='ml-4 flex px-1 '>
                  {card.type}
                  <button
                    className='ml-2 text-white hover:text-red-500'
                    onClick={() => handleDeleteCard(index, card.card_id)}
                  >
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            {cards.map((card, index) => (
              <TabPanel key={index}>
                {/* <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'> */}
                <div>
                  <div className='flex flex-col md:flex-row md:justify-between'>
                    {/* Card Image / Container */}

                    <div className='flex'>
                      <CardsFlipCard type={card.type} name={card.name} dateIn={card.dateIn} dateOut={card.dateOut} />
                    </div>

                    {/* Form for user input */}
                    <div className='w-full md:w-[50%]'>
                      {user && checkActiveCard(card) != true ? (
                        <form
                          onSubmit={(e) => handleSubmit(e, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4'>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor='type'>Type</label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/20 px-3 md:w-[70%]'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option value='' className='bg-black text-gray-600' selected>
                                  Select Type
                                </option>
                                <option value='Educational' className='bg-black'>
                                  Educational
                                </option>
                                <option value='Work' className='bg-black'>
                                  Work
                                </option>
                                <option value='Gym' className='bg-black'>
                                  Gym
                                </option>
                              </select>
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Name</label>
                              <input
                                type='text'
                                value={card.name}
                                onChange={(e) => handleCardNameChange(index, e.target.value)}
                                placeholder='Card Name'
                                className='rounded-md bg-white/20 px-3 md:w-[70%]'
                                required
                              />
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Description</label>
                              <input
                                type='text'
                                value={card.description}
                                onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                placeholder='Card Description'
                                className='rounded-md bg-white/20 px-3  md:w-[70%]'
                              />
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Date In</label>
                              <input
                                type='date'
                                value={card.dateIn}
                                className='rounded-md bg-white/20 px-3  md:w-[70%]'
                                onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                required
                              />
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Date Out</label>
                              <input
                                type='date'
                                value={card.dateOut}
                                className='rounded-md bg-white/20 px-3  md:w-[70%]'
                                onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          {/* Submit button */}
                          <button
                            type='submit'
                            className='mt-4 flex justify-center rounded-2xl px-4 py-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900'
                          >
                            Generate
                          </button>
                        </form>
                      ) : (
                        <form
                          onSubmit={(e) => handleUpdate(e, card.card_id, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4'>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor='type'>Type</label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/20 px-2 md:w-[70%]'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option value='' className='bg-black text-gray-600' selected>
                                  Select Type
                                </option>
                                <option value='Educational' className='bg-black'>
                                  Educational
                                </option>
                                <option value='Work' className='bg-black'>
                                  Work
                                </option>
                                <option value='Gym' className='bg-black'>
                                  Gym
                                </option>
                              </select>
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Name</label>
                              <input
                                type='text'
                                value={card.name}
                                onChange={(e) => handleCardNameChange(index, e.target.value)}
                                placeholder='Card Name'
                                className='rounded-md bg-white/20 px-3 md:w-[70%]'
                                required
                              />
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Description</label>
                              <input
                                type='text'
                                value={card.description}
                                onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                placeholder='Card Description'
                                className='rounded-md bg-white/20 px-3  md:w-[70%]'
                              />
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Date In</label>
                              <input
                                type='date'
                                value={card.dateIn}
                                className='rounded-md bg-white/20 px-3  md:w-[70%]'
                                onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                required
                              />
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                              <label htmlFor=''>Date Out</label>
                              <input
                                type='date'
                                value={card.dateOut}
                                className='rounded-md bg-white/20 px-3  md:w-[70%]'
                                onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          {/* Submit button */}
                          <button
                            type='submit'
                            className='mt-4 flex justify-center rounded-2xl px-4 py-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900'
                          >
                            Generate
                          </button>
                        </form>
                      )}
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
