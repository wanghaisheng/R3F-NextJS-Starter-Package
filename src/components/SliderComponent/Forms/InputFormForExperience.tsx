'use client'
import { TagsInput } from 'react-tag-input-component'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function InputFormForExperience({
  exp_id,
  project,
  handleProjectTypeChange,
  handleProjectNameChange,
  handleProjectDescriptionChange,
  handleSkillsChange,
  handleToolsChange,
  handleProjectLinkChange,
  handleImageUrlsChange,
  index,
}) {
  const [imageUrls, setImageUrls] = useState([])
  const handleChangeEvent = (items) => {
    const successfulFiles = items.allEntries.filter((file) => file.status === 'success')
    const imageUrls = successfulFiles.map((file) => file.cdnUrl) // Extract cdnUrls
    if (exp_id) {
      setImageUrls(imageUrls) // Update cdnUrls state
    } else {
      handleImageUrlsChange(imageUrls)
    }
  }

  useEffect(() => {
    const updateImage = () => {
      handleImgUpdate(imageUrls[imageUrls.length - 1])
    }
    if (imageUrls.length !== 0) {
      updateImage()
    }
  }, [imageUrls])

  const handleImgUpdate = async (image_url) => {
    const submit = {
      project_picture: image_url,
    }
    try {
      await axios({
        url: `/api/internal/experience/${exp_id}`,
        method: 'put',
        data: submit,
      })
      toast.success('Project pic updated successfully!')
    } catch (error) {
      toast.error('Error updating project pic')
    }
  }

  return (
    <div className='flex w-full flex-col gap-y-2 px-4 text-purple-200'>
      <div className='flex flex-row items-center justify-between '>
        <div>
          <label
            htmlFor='educational'
            className={` ${project.type === 'educational' ? 'font-bold text-purple-200' : 'text-purple-200 hover:text-purple-400'}`}
          >
            Educational
          </label>
          <input
            type='radio'
            aria-label='educational'
            id='educational'
            name='type'
            value='educational'
            checked={project.type === 'educational'}
            onChange={(e) => handleProjectTypeChange(index, e.target.value)}
            className='hidden'
          />
        </div>
        <div>
          <input
            type='radio'
            aria-label='business'
            id='work'
            name='type'
            value='work'
            checked={project.type === 'business'}
            onChange={(e) => handleProjectTypeChange(index, e.target.value)}
            className='hidden'
          />
          <label
            htmlFor='work'
            className={`${project.type === 'work' ? 'font-bold  text-purple-200' : 'text-purple-200 hover:text-purple-400'}`}
          >
            Business
          </label>
        </div>
        <div>
          <input
            type='radio'
            aria-label='other'
            id='other'
            name='type'
            value='other'
            checked={project.type === 'other'}
            onChange={(e) => handleProjectTypeChange(index, e.target.value)}
            className='hidden'
          />
          <label
            htmlFor='other'
            className={` ${project.type === 'other' ? 'font-bold text-purple-200' : 'text-purple-200 hover:text-purple-400'}`}
          >
            Other
          </label>
        </div>
      </div>
      <div className='mt-4 flex flex-col lg:mt-0 lg:flex-row lg:justify-between'>
        <label htmlFor='projectName' className='font-semibold'>
          Name
        </label>
        <input
          id='projectName'
          aria-label='projectName'
          type='text'
          value={project.name}
          onChange={(e) => handleProjectNameChange(index, e.target.value)}
          placeholder='Project Name'
          className='rounded-md border border-none bg-white/20 px-3 lg:w-[70%]'
          required
        />
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <label htmlFor='description' className='font-semibold'>
          Description
        </label>
        <input
          id='description'
          aria-label='description'
          type='text'
          value={project.description}
          onChange={(e) => handleProjectDescriptionChange(index, e.target.value)}
          placeholder='Project Description'
          className='rounded-md border border-none bg-white/20 px-3 lg:w-[70%]'
        />
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <label className='font-semibold' htmlFor='file_input'>
          ProjPic
        </label>
        <FileUploaderRegular
          onChange={handleChangeEvent}
          pubkey={'aff2bf9d09cde0f92516'}
          maxLocalFileSizeBytes={10000000}
          imgOnly={true}
          sourceList='local, url, camera'
        />
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <label htmlFor='' className='font-semibold'>
          Skills
        </label>
        <div className='text-sm text-black placeholder:text-black  focus:outline-none lg:w-[70%]'>
          <TagsInput
            value={project.project_skills}
            onChange={(tags) => handleSkillsChange(index, tags)}
            aria-label='skills_input'
            name='skills'
            placeHolder='Enter skills'
          />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <label htmlFor='' className='font-semibold'>
          Tools
        </label>
        <div className='text-sm  text-black placeholder:text-black focus:outline-none lg:w-[70%]'>
          <TagsInput
            value={project.tools}
            onChange={(tags) => handleToolsChange(index, tags)}
            aria-label='tools_input'
            name='tools'
            placeHolder='Enter tools used'
          />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <label htmlFor='link' className='font-semibold'>
          Link
        </label>
        <input
          id='link'
          aria-label='link'
          type='text'
          value={project.link}
          onChange={(e) => handleProjectLinkChange(index, e.target.value)}
          placeholder='Project Link'
          className='rounded-md border px-3 lg:w-[70%] dark:border-none  dark:bg-white/20'
        />
      </div>
    </div>
  )
}
