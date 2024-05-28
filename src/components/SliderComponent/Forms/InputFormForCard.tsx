'use client'
import { useState } from 'react'
export default function InputFormForCard({
  card,
  handleCardTypeChange,
  handleCardblood_groupChange,
  handleCardemergency_contactChange,
  handleCardemergency_detailsChange,
  handleCardemergency_addressChange,
  handleCardNameChange,
  handleCardDescriptionChange,
  handleCardDateInChange,
  handleCardDateOutChange,
  index,
}) {
  const [isCurrent, setIsCurrent] = useState(card.date_out === null)
  const handleIsCurrentChange = (e) => {
    setIsCurrent(e.target.checked)
    if (e.target.checked) {
      handleCardDateOutChange(index, null) // Set date_out to null when the checkbox is checked
    }
  }
  return (
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
          <option
            defaultValue='Emergency'
            value='Emergency'
            className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'
          >
            Emergency
          </option>
          <option value='Educational' className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'>
            Educational
          </option>
          <option value='Work' className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200'>
            Work
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
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value=''>
                Select Blood Group
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='A+'>
                A+
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='A-'>
                A-
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='B+'>
                B+
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='B-'>
                B-
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='O+'>
                O+
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='O-'>
                O-
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='AB+'>
                AB+
              </option>
              <option className='bg-purple-200 text-purple-950 dark:bg-black dark:text-purple-200' value='AB-'>
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
          <div className='flex'>
            <label htmlFor='isCurrent' className='font-semibold'>
              Current
            </label>
            <input
              id='isCurrent'
              type='checkbox'
              checked={isCurrent}
              onChange={handleIsCurrentChange}
              className='ml-10 size-5'
            />
          </div>
          {!isCurrent && (
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
          )}
        </>
      )}
    </div>
  )
}