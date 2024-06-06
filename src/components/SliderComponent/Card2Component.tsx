'use client'
import InputFormForCard from './Forms/InputFormForCard'
import toast from 'react-hot-toast'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import CardsFlipCard from '../card/cardsFlipCard'
import { TiDelete } from 'react-icons/ti'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import axios from 'axios'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function CardComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [cards, setCards] = useState([
    {
      card_id: '',
      type: 'Emergency',
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
      toast.success('Generated Sucessfully')
      onNextButtonClick() // Move to next slide after successful generation
    } catch (error) {
      toast.error('Failed to Generate')
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
      toast.success('Updated Sucessfully')
      onNextButtonClick() // Move to next slide after successful update
    } catch (error) {
      toast.error('Failed to Update')
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios({
        url: `/api/internal/card/${id}`,
        method: 'DELETE',
      })
      toast.success('Deleted Sucessfully')
    } catch (error) {
      toast.error('Failed to Delete')
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

        type: 'Emergency',

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
  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='card'
        className='relative flex h-[900px] w-[300px] flex-col rounded bg-[#F5F5F5] py-4 md:w-[600px] md:rounded-3xl md:px-10 md:shadow-md md:backdrop-blur-md lg:h-[550px] lg:w-[800px] dark:bg-transparent md:dark:bg-black/10 dark:md:shadow-purple-700'
      >
        <div className='flex w-full flex-col'>
          {/* heading */}
          <div className='relative my-3 flex justify-center text-2xl font-semibold text-purple-950 drop-shadow lg:my-5 lg:text-5xl dark:text-purple-200 '>
            MEMBERSHIPS
            <div className='absolute top-10 text-sm lg:right-0'>
              <DrawOutlineButton
                onClick={() => {
                  handleAddCard()
                }}
                aria-label='Add Card'
              >
                Add Membership &emsp; +
              </DrawOutlineButton>
            </div>
          </div>
          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start lg:my-6'>
              {cards.map((card, index) => (
                <Tab key={index} className='ml-4 flex cursor-pointer px-1 text-purple-950 dark:text-purple-200'>
                  {card.type}
                  {index !== 0 && ( // Condition to check if it's not the first tab
                    <button
                      className='ml-2 text-gray-900 hover:text-red-500'
                      onClick={() => handleDeleteCard(index, card.card_id)}
                      aria-label='Delete Card'
                    >
                      <TiDelete />
                    </button>
                  )}
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
                      <form
                        onSubmit={
                          user && checkActiveCard(card) !== true
                            ? (e) => handleSubmit(e, index)
                            : (e) => handleUpdate(e, card.card_id, index)
                        }
                        className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                      >
                        <InputFormForCard
                          card={card}
                          index={index}
                          handleCardDateInChange={handleCardDateInChange}
                          handleCardDateOutChange={handleCardDateOutChange}
                          handleCardDescriptionChange={handleCardDescriptionChange}
                          handleCardNameChange={handleCardNameChange}
                          handleCardTypeChange={handleCardTypeChange}
                          handleCardblood_groupChange={handleCardblood_groupChange}
                          handleCardemergency_addressChange={handleCardemergency_addressChange}
                          handleCardemergency_contactChange={handleCardemergency_contactChange}
                          handleCardemergency_detailsChange={handleCardemergency_detailsChange}
                        />

                        {/* Next */}
                        {!isSmallScreen ? (
                          <>
                            <div className='absolute bottom-4 right-4'>
                              <button
                                className='rounded-full bg-black transition-all duration-150 hover:scale-105 hover:bg-gray-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                                type='submit'
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
                            <DrawOutlineButton type='submit' aria-label='next slide'>
                              Next
                            </DrawOutlineButton>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
        {/* Back Button */}
        <div className='absolute bottom-4 left-4 mt-4'>
          {!isSmallScreen ? (
            <button
              className='rounded-full bg-black transition-all duration-150 hover:scale-105 hover:bg-gray-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
              onClick={onPrevButtonClick}
              aria-label='prev'
            >
              <p className='p-4'>
                <FaArrowLeft />
              </p>
            </button>
          ) : (
            <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>
              Back
            </DrawOutlineButton>
          )}
        </div>
      </div>
    </div>
  )
}
