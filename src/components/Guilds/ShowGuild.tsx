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
              className='relative flex h-[280px] w-[240px] flex-col items-center justify-center rounded-bl-lg rounded-tr-lg bg-purple-950/20 transition duration-500 ease-out'
            >
              <Image
                className='absolute top-0 w-[240px] rounded-tr-md transition duration-500 ease-out hover:-translate-y-3 hover:scale-110'
                src={user.avatarimg}
                alt=''
                width={240}
                height={280}
                style={{
                  objectFit: 'cover',
                  filter: `drop-shadow(-1px -2px 4px rgba(${
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
                //On hover remove the drop shadow
                onMouseOver={(e) => {
                  e.currentTarget.style.filter = 'none'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.filter = `drop-shadow(-1px -2px 4px rgba(${
                    user.guild === 'PADMA'
                      ? '255, 0, 0, 0.5'
                      : user.guild === 'VAJRA'
                        ? '0, 0, 255, 0.5'
                        : user.guild === 'RATNA'
                          ? '255, 255, 0, 0.5'
                          : user.guild === 'KARMA'
                            ? '0, 255, 0, 0.5'
                            : '255, 255, 255, 0.5'
                  }))`
                }}
              />
              {/* <span className='absolute top-0 flex size-full items-center justify-center opacity-0 transition duration-500 ease-out hover:bg-black/80 hover:opacity-100'>
                <p>{user.description}</p>
              </span> */}
              <span className={`absolute bottom-0 flex w-full items-center rounded-bl-md bg-purple-950 px-3 py-2`}>
                <h1 className='flex w-full items-center justify-between gap-x-4 font-bold transition duration-300 ease-in-out'>
                  {user.name.toUpperCase()}
                  {user.continent.toUpperCase() === 'EAST-ASIA' ? (
                    <p className='size-2 rounded-full bg-green-500'></p>
                  ) : user.continent.toUpperCase() === 'SOUTH-ASIA' ? (
                    <p className='size-2 rounded-full bg-blue-500'></p>
                  ) : user.continent.toUpperCase() === 'MESO-AMERICA' ? (
                    <p className='size-2 rounded-full bg-yellow-500'></p>
                  ) : user.continent.toUpperCase() === 'SUB-SAHARAN-AFRICA' ? (
                    <p className='size-2 rounded-full bg-pink-500'></p>
                  ) : (
                    <p className='size-2 rounded-full bg-white'></p>
                  )}
                </h1>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
