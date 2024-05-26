'use client'

import { enqueueSnackbar } from 'notistack'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import CardsFlipCard from '../card/cardsFlipCard'

import { TiDelete } from 'react-icons/ti'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

import axios from 'axios'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { IoHome } from 'react-icons/io5'

export default function CardComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [cards, setCards] = useState([
    {
      card_id: '',
      type: 'type',
      name: '',
      description: '',
      date_in: '',
      date_out: '',
      emergency_contact: '',
      emergency_details: '',
      blood_group: '',
      emergency_address: '',
    },
  ])

  const formRefs = useRef([])

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        if (user.cards.length !== 0) {
          setCards(user.cards) // Set the filtered data
        }
      } catch (error) {
        console.error('Error fetching cards data:', error)
      }
    }

    if (user) {
      fetchCardsData() // Fetch data only if user is available
    }
  }, [user])

  const checkActiveCard = (element) => {
    return element.gg_id === user.gg_id
  }

  const handleSubmit = async (e, index) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      type: cards[index].type,
      name: cards[index].name,
      description: cards[index].description,
      date_in: cards[index].date_in,
      date_out: cards[index].date_out,
      emergency_contact: cards[index].emergency_contact,
      emergency_details: cards[index].emergency_details,
      blood_group: cards[index].blood_group,
      emergency_address: cards[index].emergency_address,
    }
    try {
      await axios({
        url: `/api/internal/card`,
        method: 'POST',
        data: submit,
      })
      enqueueSnackbar('Generated Sucessfully', {
        autoHideDuration: 2000,
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to Generate', { autoHideDuration: 2000, variant: 'error' })
    }
  }

  const handleUpdate = async (e, id, index) => {
    e.preventDefault()
    const submit = {
      type: cards[index].type,
      name: cards[index].name,
      description: cards[index].description,
      date_in: cards[index].date_in,
      date_out: cards[index].date_out,
      emergency_contact: cards[index].emergency_contact,
      emergency_details: cards[index].emergency_details,
      blood_group: cards[index].blood_group,
      emergency_address: cards[index].emergency_address,
    }
    try {
      await axios({
        url: `/api/internal/card/${id}`,
        method: 'PUT',
        data: submit,
      })
      enqueueSnackbar('Updated Sucessfully', {
        autoHideDuration: 2000,
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to Update', { autoHideDuration: 2000, variant: 'error' })
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios({
        url: `/api/internal/card/${id}`,
        method: 'DELETE',
      })
      alert('Card info deleted')
      return
    } catch (error) {
      console.error(error)
    }
  }

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
      updatedCards[index].date_in = newDateIn
      return updatedCards
    })
  }

  const handleCardDateOutChange = (index, newDateOut) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].date_out = newDateOut
      return updatedCards
    })
  }

  const handleCardemergency_contactChange = (index, newEmergency_contact) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].emergency_contact = newEmergency_contact
      return updatedCards
    })
  }

  const handleCardemergency_detailsChange = (index, newEmergency_details) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].emergency_details = newEmergency_details
      return updatedCards
    })
  }

  const handleCardblood_groupChange = (index, newBlood_group) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].blood_group = newBlood_group
      return updatedCards
    })
  }

  const handleCardemergency_addressChange = (index, newEmergency_address) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].emergency_address = newEmergency_address
      return updatedCards
    })
  }

  const handleAddCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      {
        card_id: '',
        type: 'type',
        name: '',
        description: '',
        date_in: '',
        date_out: '',
        emergency_contact: '',
        emergency_details: '',
        blood_group: '',
        emergency_address: '',
      },
    ])
  }

  const handleDeleteCard = (index, card_id) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards.splice(index, 1)
      handleDelete(card_id)
      return updatedCards
    })
  }

  const handleHomeClick = async (index) => {
    const form = formRefs.current[index]
    const isSubmitted = await (form
      ? form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      : true)
    if (isSubmitted) {
      window.location.href = '/hero3'
    }
  }

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='card'
        className='relative flex h-[900px] w-[300px] flex-col bg-violet-300 py-4 md:w-[600px] md:rounded-3xl md:px-10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md lg:h-[550px] lg:w-[800px] md:dark:bg-black/10'
      >
        <div className='flex w-full flex-col'>
          {/* heading */}
          <div className='relative my-3 flex justify-center text-2xl font-semibold text-purple-950 drop-shadow lg:my-5 lg:text-5xl dark:text-purple-200 '>
            CARD
            <div className='absolute right-0 top-10 text-sm'>
              <DrawOutlineButton
                onClick={() => {
                  handleAddCard()
                }}
                aria-label='Add Card'
              >
                Add Card &emsp; +
              </DrawOutlineButton>
            </div>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start lg:my-6'>
              {cards.map((card, index) => (
                <Tab key={index} className='ml-4 flex cursor-pointer px-1 text-purple-950 dark:text-purple-200'>
                  {card.type}
                  <button
                    className='ml-2 text-gray-900 hover:text-red-500'
                    onClick={() => handleDeleteCard(index, card.card_id)}
                    aria-label='Delete Card'
                  >
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            {cards.map((card, index) => (
              <TabPanel key={index}>
                <div>
                  <div className='flex flex-col lg:flex-row lg:justify-between'>
                    {/* Card Image / Container */}
                    <div className='flex justify-center'>
                      <CardsFlipCard
                        type={card.type}
                        name={card.name}
                        dateIn={card.date_in}
                        dateOut={card.date_out}
                        description={card.description}
                        blood_group={card.blood_group}
                        emergency_contact={card.emergency_contact}
                        emergency_address={card.emergency_address}
                        emergency_details={card.emergency_details}
                      />
                    </div>

                    {/* Form for user input */}
                    <div className='w-full lg:w-[50%]'>
                      {user && checkActiveCard(card) !== true ? (
                        <form
                          onSubmit={(e) => handleSubmit(e, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4 text-purple-950 dark:text-purple-200'>
                            <div className='flex flex-col  lg:flex-row lg:justify-between '>
                              <label htmlFor='type' className='font-semibold'>
                                Type
                              </label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option defaultValue='' className='bg-purple-200  text-gray-600  dark:bg-black'>
                                  Select Type
                                </option>
                                <option
                                  value='Educational'
                                  className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                >
                                  Educational
                                </option>
                                <option
                                  value='Work'
                                  className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                >
                                  Work
                                </option>
                                <option
                                  value='Emergency'
                                  className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                >
                                  Emergency
                                </option>
                              </select>
                            </div>

                            {card.type === 'Emergency' ? (
                              <>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`blood_group-${index}`} className='text-sm font-semibold'>
                                    Blood Group
                                  </label>
                                  <select
                                    id={`blood_group-${index}`}
                                    value={card.blood_group}
                                    onChange={(e) => handleCardblood_groupChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  >
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value=''
                                    >
                                      Select Blood Group
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='A+'
                                    >
                                      A+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='A-'
                                    >
                                      A-
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='B+'
                                    >
                                      B+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='B-'
                                    >
                                      B-
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='O+'
                                    >
                                      O+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='O-'
                                    >
                                      O-
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='AB+'
                                    >
                                      AB+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='AB-'
                                    >
                                      AB-
                                    </option>
                                  </select>
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`emergency_contact-${index}`} className='font-semibold'>
                                    Contact
                                  </label>
                                  <input
                                    id={`emergency_contact-${index}`}
                                    value={card.emergency_contact}
                                    onChange={(e) => handleCardemergency_contactChange(index, e.target.value)}
                                    type='text'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    placeholder='Emergency Contact'
                                    required
                                  />
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`emergency_details-${index}`} className='font-semibold'>
                                    Details
                                  </label>
                                  <textarea
                                    id={`emergency_details-${index}`}
                                    value={card.emergency_details}
                                    onChange={(e) => handleCardemergency_detailsChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    placeholder='Emergency Details'
                                  ></textarea>
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`emergency_address-${index}`} className='font-semibold'>
                                    Address
                                  </label>
                                  <input
                                    id={`emergency_address-${index}`}
                                    value={card.emergency_address}
                                    onChange={(e) => handleCardemergency_addressChange(index, e.target.value)}
                                    type='text'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    placeholder='Emergency Address'
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='name' className='font-semibold'>
                                    Name
                                  </label>
                                  <input
                                    id='name'
                                    type='text'
                                    value={card.name}
                                    onChange={(e) => handleCardNameChange(index, e.target.value)}
                                    placeholder='Name'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='description' className='font-semibold'>
                                    Description
                                  </label>
                                  <textarea
                                    id='description'
                                    value={card.description}
                                    onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                    placeholder='Description'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='dateIn' className='font-semibold'>
                                    Date In
                                  </label>
                                  <input
                                    id='dateIn'
                                    type='date'
                                    value={card.date_in}
                                    onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='dateOut' className='font-semibold'>
                                    Date Out
                                  </label>
                                  <input
                                    id='dateOut'
                                    type='date'
                                    value={card.date_out}
                                    onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          {/* Next and Generate Button */}
                          {!isSmallScreen ? (
                            <>
                              <div className='mt-4'>
                                <DrawOutlineButton type='submit' aria-label='generate'>
                                  Generate
                                </DrawOutlineButton>
                              </div>
                              <div className='absolute bottom-4 right-4'>
                                <button
                                  className='mr-2 rounded-full bg-purple-950 transition-all  duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                                  onClick={() => handleHomeClick(0)}
                                  aria-label='home btn'
                                >
                                  <p className='p-4'>
                                    <IoHome />
                                  </p>
                                </button>
                                <button
                                  className='rounded-full bg-purple-950 transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                                  type='submit'
                                  onClick={onNextButtonClick}
                                  aria-label='next'
                                >
                                  <p className='p-4'>
                                    <FaArrowRight />
                                  </p>
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className='absolute bottom-4 right-4 flex gap-x-1'>
                              <DrawOutlineButton onClick={() => handleHomeClick(0)} aria-label='home'>
                                <IoHome className='my-1' />
                              </DrawOutlineButton>
                              <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                Next
                              </DrawOutlineButton>
                            </div>
                          )}
                        </form>
                      ) : (
                        <form
                          onSubmit={(e) => handleUpdate(e, card.card_id, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center '
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4 text-purple-950 dark:text-purple-200'>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='type' className='font-semibold'>
                                Type
                              </label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option defaultValue='' className='bg-purple-200  text-gray-600 dark:bg-black '>
                                  Select Type
                                </option>
                                <option
                                  value='Educational'
                                  className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                >
                                  Educational
                                </option>
                                <option
                                  value='Work'
                                  className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                >
                                  Work
                                </option>
                                <option
                                  value='Emergency'
                                  className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                >
                                  Emergency
                                </option>
                              </select>
                            </div>

                            {card.type === 'Emergency' ? (
                              <>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`blood_group-${index}`} className='text-sm font-semibold'>
                                    Blood Group
                                  </label>
                                  <select
                                    id={`blood_group-${index}`}
                                    value={card.blood_group}
                                    onChange={(e) => handleCardblood_groupChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  >
                                    <option className='bg-purple-200 text-gray-600 dark:bg-black ' value=''>
                                      Select Blood Group
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='A+'
                                    >
                                      A+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='A-'
                                    >
                                      A-
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='B+'
                                    >
                                      B+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='B-'
                                    >
                                      B-
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='O+'
                                    >
                                      O+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='O-'
                                    >
                                      O-
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='AB+'
                                    >
                                      AB+
                                    </option>
                                    <option
                                      className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
                                      value='AB-'
                                    >
                                      AB-
                                    </option>
                                  </select>
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`emergency_contact-${index}`} className='font-semibold'>
                                    Contact
                                  </label>
                                  <input
                                    id={`emergency_contact-${index}`}
                                    value={card.emergency_contact}
                                    onChange={(e) => handleCardemergency_contactChange(index, e.target.value)}
                                    type='text'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    placeholder='Emergency Contact'
                                    required
                                  />
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`emergency_details-${index}`} className='font-semibold'>
                                    Details
                                  </label>
                                  <textarea
                                    id={`emergency_details-${index}`}
                                    value={card.emergency_details}
                                    onChange={(e) => handleCardemergency_detailsChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    placeholder='Emergency Details'
                                  ></textarea>
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor={`emergency_address-${index}`} className='font-semibold'>
                                    Address
                                  </label>
                                  <input
                                    id={`emergency_address-${index}`}
                                    value={card.emergency_address}
                                    onChange={(e) => handleCardemergency_addressChange(index, e.target.value)}
                                    type='text'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    placeholder='Emergency Address'
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='name' className='font-semibold'>
                                    Name
                                  </label>
                                  <input
                                    id='name'
                                    type='text'
                                    value={card.name}
                                    onChange={(e) => handleCardNameChange(index, e.target.value)}
                                    placeholder='Name'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='description' className='font-semibold'>
                                    Description
                                  </label>
                                  <textarea
                                    id='description'
                                    value={card.description}
                                    onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                    placeholder='Description'
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='dateIn' className='font-semibold'>
                                    Date In
                                  </label>
                                  <input
                                    id='dateIn'
                                    type='date'
                                    value={card.date_in}
                                    onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>

                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                  <label htmlFor='dateOut' className='font-semibold'>
                                    Date Out
                                  </label>
                                  <input
                                    id='dateOut'
                                    type='date'
                                    value={card.date_out}
                                    onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                                    className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
                                    required
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          {/* Next and Update Button */}
                          {!isSmallScreen ? (
                            <>
                              <div className='mt-4'>
                                <DrawOutlineButton type='submit' aria-label='generate'>
                                  Update
                                </DrawOutlineButton>
                              </div>
                              <div className='absolute bottom-4 right-4'>
                                <button
                                  className='mr-2 rounded-full bg-purple-950 transition-all  duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                                  onClick={() => handleHomeClick(0)}
                                  aria-label='home btn'
                                >
                                  <p className='p-4'>
                                    <IoHome />
                                  </p>
                                </button>
                                <button
                                  className='rounded-full bg-purple-950 transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                                  type='submit'
                                  onClick={onNextButtonClick}
                                  aria-label='next'
                                >
                                  <p className='p-4'>
                                    <FaArrowRight />
                                  </p>
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className='absolute bottom-4 right-4 flex gap-x-1'>
                              <DrawOutlineButton onClick={() => handleHomeClick(0)} aria-label='home'>
                                <IoHome className='my-1' />
                              </DrawOutlineButton>
                              <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                Next
                              </DrawOutlineButton>
                            </div>
                          )}
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
        {/* Back Button */}
        {!isSmallScreen ? (
          <div>
            <div className='absolute bottom-4 left-4 mt-4'>
              <button
                className='rounded-full bg-purple-950 transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                onClick={onPrevButtonClick}
                aria-label='prev'
              >
                <p className='p-4'>
                  <FaArrowLeft />
                </p>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className='absolute bottom-4 left-4 mt-4'>
              <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>
                Back
              </DrawOutlineButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
