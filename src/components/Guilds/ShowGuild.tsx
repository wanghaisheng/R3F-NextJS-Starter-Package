import Image from 'next/image'

export default function ShowGuild({ users, filter, searchTerm }: { users: any; filter: string; searchTerm: string }) {
  const filteredFactions = filter ? users.filter((user) => user.guild === filter) : users

  const filteredAndSearchedFactions = filteredFactions.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className='flex justify-start'>
        <div className='mx-10 my-6 flex flex-wrap justify-center gap-5 lg:justify-start'>
          {filteredAndSearchedFactions.map((user, index) => (
            <a
              href={`/regions/${user.name.toLowerCase().replace(' ', '-')}`}
              key={index}
              className='relative flex h-[280px] w-[240px] flex-col items-center justify-center rounded-bl-lg rounded-tr-lg  transition duration-500 ease-out hover:scale-105'
            >
              <Image
                className='absolute top-0 w-[240px] rounded-tr-md'
                src={user.avatarimg}
                alt=''
                width={240}
                height={280}
                style={{
                  objectFit: 'cover',
                  filter: `drop-shadow(-4px -2px 3px rgba(${
                    user.guild === 'PADMA'
                      ? '255, 0, 0, 0.5'
                      : user.guild === 'VAJRA'
                        ? '0, 0, 255, 0.5'
                        : user.guild === 'RATNA'
                          ? '255, 255, 0, 0.5'
                          : user.guild === 'KARMA'
                            ? '0, 255, 0, 0.5'
                            : '255, 255, 255, 0.5'
                  }))`,
                }}
              />
              {/* <span className='absolute right-2 top-2'>
                {user.guild === 'PADMA' ? (
                  <div className='size-5 rounded-full bg-red-500'></div>
                ) : user.guild === 'VAJRA' ? (
                  ''
                ) : user.guild === 'RATNA' ? (
                  <div className='size-5 rounded-full bg-yellow-500'></div>
                ) : user.guild === 'KARMA' ? (
                  ''
                ) : user.guild === 'BUDDHA' ? (
                  ''
                ) : (
                  ''
                )}
              </span> */}
              <span className='absolute top-0 flex size-full items-center justify-center opacity-0 transition duration-500 ease-out hover:bg-black/80 hover:opacity-100'>
                <p>{user.description}</p>
              </span>
              <span
                className={`absolute bottom-0 flex w-full flex-col items-center rounded-bl-md bg-purple-950 px-3 py-2 ${user.guild === 'PADMA' ? '' : user.guild === 'VAJRA' ? ' text-blue-300 shadow-blue-700 [text-shadow:1px_1px_2px_var(--tw-shadow-color)]' : user.guild === 'RATNA' ? 'text-yellow-300' : user.guild === 'KARMA' ? 'text-green-300' : user.guild === 'BUDDHA' ? 'text-gray-300' : 'text-white'}`}
              >
                <h1 className='font-bold transition duration-300 ease-in-out '>{user.name}</h1>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
