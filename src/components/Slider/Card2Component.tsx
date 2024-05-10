'use client'
import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import CardsFlipCard from '../card/cardsFlipCard'

import { TiDelete } from 'react-icons/ti'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

import axios from 'axios'

async function getCardInfo() {
  try {
    const res = await axios.get('/api/card')
    if (res.status !== 200) {
      throw new Error('failed to fetch the cards')
    }
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default function CardComponent({ onNextButtonClick }) {
  const { user } = useUser()
  const [cards, setCards] = useState([
    { card_id: '', type: 'type', name: '', description: '', date_in: '', date_out: '' },
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
      date_in: cards[index].date_in,
      date_out: cards[index].date_out,
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
      date_in: cards[index].date_in,
      date_out: cards[index].date_out,
    }
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
      updatedCards[index].date_in = newDateIn
      return updatedCards
    })
  }

  const handleCardDateOutChange = (index: number, newDateOut: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].date_out = newDateOut
      return updatedCards
    })
  }

  const handleAddCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      { card_id: '', type: 'type', name: '', description: '', date_in: '', date_out: '' },
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
        className='relative flex h-[550px] py-4  md:rounded-3xl md:border md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:px-10 md:shadow-inner md:shadow-purple-700/70 md:backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          {/* heading */}
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-5 lg:text-7xl'>
            Card
            <div className='absolute right-0 top-10 text-sm'>
              <DrawOutlineButton
                onClick={() => {
                  handleAddCard()
                }}
              >
                Add Card &emsp; +
              </DrawOutlineButton>
            </div>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start lg:my-6'>
              {cards.map((card, index) => (
                <Tab key={index} className='ml-4 flex cursor-pointer px-1'>
                  {card.type}
                  <button
                    className='ml-2 text-gray-900 hover:text-red-500'
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
                  <div className='flex flex-col lg:flex-row lg:justify-between'>
                    {/* Card Image / Container */}

                    <div className='flex justify-center'>
                      <CardsFlipCard type={card.type} name={card.name} dateIn={card.date_in} dateOut={card.date_out} />
                    </div>

                    {/* Form for user input */}
                    <div className='w-full lg:w-[50%]'>
                      {user && checkActiveCard(card) != true ? (
                        <form
                          onSubmit={(e) => handleSubmit(e, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4'>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='type'>Type</label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option defaultValue='' className='bg-black text-gray-600'>
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
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardName'>Card Name</label>
                              <input
                                id='cardName'
                                type='text'
                                value={card.name}
                                onChange={(e) => handleCardNameChange(index, e.target.value)}
                                placeholder='Card Name'
                                className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardDescription'>Description</label>
                              <input
                                id='cardDescription'
                                type='text'
                                value={card.description}
                                onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                placeholder='Card Description'
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateIn'>Date In</label>
                              <input
                                id='dateIn'
                                type='date'
                                value={card.date_in}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateOut'>Date Out</label>
                              <input
                                id='dateOut'
                                type='date'
                                value={card.date_out}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          {/* Submit button */}
                          <div className='mt-4 gap-x-2'>
                            <DrawOutlineButton type='submit'>Generate</DrawOutlineButton>
                          </div>
                        </form>
                      ) : (
                        <form
                          onSubmit={(e) => handleUpdate(e, card.card_id, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4'>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='type'>Type</label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/20 px-2 lg:w-[70%]'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option defaultValue='' className='bg-black text-gray-600'>
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
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardName'>Card Name</label>
                              <input
                                type='text'
                                id='cardName'
                                value={card.name}
                                onChange={(e) => handleCardNameChange(index, e.target.value)}
                                placeholder='Card Name'
                                className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardDescription'>Description</label>
                              <input
                                type='text'
                                id='cardDescription'
                                value={card.description}
                                onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                placeholder='Card Description'
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateIn'>Date In</label>
                              <input
                                type='date'
                                id='dateIn'
                                value={card.date_in}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateOut'>Date Out</label>
                              <input
                                id='dateOut'
                                type='date'
                                value={card.date_out}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          {/* Submit button */}
                          <div className='mt-4'>
                            <DrawOutlineButton type='submit'>Generate</DrawOutlineButton>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
          <div className='mt-2 flex justify-center lg:mt-0'>
            <DrawOutlineButton onClick={onNextButtonClick}>Next</DrawOutlineButton>
          </div>
        </div>
      </div>
    </div>
  )
}
