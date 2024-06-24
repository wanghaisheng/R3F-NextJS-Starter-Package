export default function SearchComponent() {
  // const { user } = useUser()

  return (
    <div className='mb-12 flex h-full flex-col'>
      <div className='flex-1 px-4'>
        <div className='mb-4 flex items-center gap-2'>
          <input
            type='text'
            placeholder='Search ...'
            // onChange={}
            className='-mt-4 w-full rounded-md border border-purple-700 bg-purple-950/20 px-3 py-2 text-purple-200 focus:outline-none'
          />
        </div>
      </div>
    </div>
  )
}
