import Image from 'next/image'

export default function ShowUsers({ users, filter, searchTerm }: { users: any; filter: string; searchTerm: string }) {
  const filteredFactions = filter ? users.filter((user) => user.guild === filter) : users

  const filteredAndSearchedFactions = filteredFactions.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className='flex justify-center'>
        <div className='mx-10 my-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {filteredAndSearchedFactions.map((user, index) => (
            <a
              href='#'
              key={index}
              className='relative flex h-[280px] w-[240px] flex-col items-center justify-center rounded-bl-lg rounded-tr-lg bg-purple-900/30 transition duration-500 ease-out hover:scale-105'
            >
              <Image
                className='absolute top-0 w-[240px] rounded-bl-lg rounded-tr-lg'
                src={user.avatarimg}
                alt=''
                width={240}
                height={280}
                style={{ objectFit: 'cover' }}
              />

              <span className='absolute top-0 flex size-full items-center justify-center opacity-0 transition duration-500 ease-out hover:bg-black/80 hover:opacity-100'>
                <p>{user.description}</p>
              </span>
              <span className='absolute bottom-0 flex w-full flex-col items-center rounded-bl-md bg-purple-950 px-3 py-2'>
                <h1
                  className={`font-bold transition duration-300 ease-in-out ${user.guild === 'PADMA' ? 'text-red-300' : user.guild === 'VAJRA' ? 'text-blue-300' : user.guild === 'RATNA' ? 'text-yellow-300' : user.guild === 'KARMA' ? 'text-green-300' : user.guild === 'BUDDHA' ? 'text-gray-300' : 'text-white'}`}
                >
                  {user.name}
                </h1>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
