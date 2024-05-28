import { TagsInput } from 'react-tag-input-component'

export default function InputFormForExperience({
  project,
  handleProjectTypeChange,
  handleProjectNameChange,
  handleProjectDescriptionChange,
  handleSkillsChange,
  handleToolsChange,
  index,
}) {
  return (
    <div className='flex w-full flex-col gap-y-2 px-4 text-purple-950 dark:text-purple-200'>
      <div className='flex flex-row items-center justify-between '>
        <div>
          <label
            htmlFor='educational'
            className={` ${project.type === 'educational' ? 'font-bold text-purple-950 dark:text-purple-200' : 'text-purple-950 hover:text-purple-700 dark:text-purple-200 hover:dark:text-purple-400'}`}
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
            aria-label='work'
            id='work'
            name='type'
            value='work'
            checked={project.type === 'work'}
            onChange={(e) => handleProjectTypeChange(index, e.target.value)}
            className='hidden'
          />
          <label
            htmlFor='work'
            className={`${project.type === 'work' ? 'font-bold text-purple-950 dark:text-purple-200' : 'text-purple-950 hover:text-purple-700 dark:text-purple-200 hover:dark:text-purple-400'}`}
          >
            Work
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
            className={` ${project.type === 'other' ? 'font-bold text-purple-950 dark:text-purple-200' : 'text-purple-950 hover:text-purple-700 dark:text-purple-200 hover:dark:text-purple-400'}`}
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
          className='rounded-md bg-white/70 px-3 lg:w-[70%] dark:bg-white/20'
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
          className='rounded-md bg-white/70 px-3 lg:w-[70%]  dark:bg-white/20'
        />
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <label className='font-semibold' htmlFor='file_input'>
          ProjPic
        </label>
        <input
          className='block cursor-pointer rounded-lg bg-white/70 text-sm text-gray-900 focus:outline-none lg:w-[70%] dark:bg-black/30 dark:text-white dark:placeholder:text-white'
          id='file_input'
          type='file'
          aria-label='file_input'
        />
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <label htmlFor='' className='font-semibold'>
          Skills
        </label>
        <div className='text-sm text-gray-900 focus:outline-none lg:w-[70%]  dark:text-black dark:placeholder:text-black'>
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
        <div className='text-sm text-gray-900 focus:outline-none lg:w-[70%] dark:text-black dark:placeholder:text-black'>
          <TagsInput
            value={project.tools}
            onChange={(tags) => handleToolsChange(index, tags)}
            aria-label='tools_input'
            name='tools'
            placeHolder='Enter tools used'
          />
        </div>
      </div>
    </div>
  )
}
