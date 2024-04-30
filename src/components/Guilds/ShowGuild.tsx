import Image from 'next/image'

export default function ShowGuild({ filter, searchTerm }: { filter: string; searchTerm: string }) {
  const guilds = [
    {
      name: 'Rohit Shrestha',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/65ef1f0dda9d855fa6c65f91.png',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      guild: 'KARMA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
    },
    {
      name: 'Siri',
      description: 'description',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
    },
    {
      name: 'Alexa',
      description: 'description',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
    },
    {
      name: 'Hari Bahadur',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
    },
    {
      name: 'Rohit Shrestha',
      description: 'description',
      guild: 'BUDDHA',
      avatarimg: 'https://models.readyplayer.me/66038d9e2aa392635c277ea9.png',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      guild: 'KARMA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
    },
    {
      name: 'Satkar Niraula',
      description: 'description',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
    },
    {
      name: 'John Doe',
      description: 'description',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
    },
  ]

  const filteredFactions = filter ? guilds.filter((guild) => guild.guild === filter) : guilds

  const filteredAndSearchedFactions = filteredFactions.filter((guild) =>
    guild.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className='flex justify-center'>
        <div className='mx-10 my-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {filteredAndSearchedFactions.map((guild, index) => (
            <a
              href='#'
              key={index}
              className='relative flex h-[300px] w-[240px] min-w-0 flex-col items-center justify-center rounded-bl-lg rounded-tr-lg bg-purple-900/30 transition duration-500 ease-out hover:scale-105'
            >
              <span className='absolute top-0 flex size-full rounded-bl-lg rounded-tr-lg '>
                <Image src={guild.avatarimg} alt='' layout='fill' objectFit='cover' unoptimized loading='lazy' />
              </span>
              <span className='absolute top-0 flex size-full items-center justify-center opacity-0 transition duration-500 ease-out hover:bg-black/80 hover:opacity-100'>
                <p>{guild.description}</p>
              </span>
              <span className='absolute bottom-0 flex w-full flex-col items-center rounded-bl-md bg-purple-950 px-3 py-2'>
                <h1
                  className={`font-bold transition duration-300 ease-in-out ${guild.guild === 'PADMA' ? 'text-red-300' : guild.guild === 'VAJRA' ? 'text-blue-300' : guild.guild === 'RATNA' ? 'text-yellow-300' : guild.guild === 'KARMA' ? 'text-green-300' : guild.guild === 'BUDDHA' ? 'text-gray-300' : 'text-white'}`}
                >
                  {guild.name}
                </h1>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
