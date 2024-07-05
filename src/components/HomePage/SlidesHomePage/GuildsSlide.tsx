import Image from 'next/image'

export default function GuildsSlide({ guild, guilds }) {
  return (
    <>
      {/* Div for each guild where the opacity of the div is based on the guild color and reduced to 20% */}
      {guild.guild_name === 'VAJRA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#0C2E5C]/20'></div>
      ) : guild.guild_name === 'BUDDHA' ? (
        <div className='absolute z-20 h-screen w-full bg-white/20'></div>
      ) : guild.guild_name === 'KARMA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#007F13]/20'></div>
      ) : guild.guild_name === 'RATNA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#F8BF43]/20'></div>
      ) : guild.guild_name === 'PADMA' ? (
        <div className='absolute z-20 h-screen w-full bg-[#9E021E]/20'></div>
      ) : null}

      <div
        className={`absolute top-20 z-20 flex w-full items-center justify-center overflow-hidden text-6xl font-extrabold md:text-9xl lg:hidden  ${
          guild.guild_name === 'VAJRA'
            ? 'text-[#498cff]'
            : guild.guild_name === 'BUDDHA'
              ? 'text-white'
              : guild.guild_name === 'KARMA'
                ? 'text-[#51fd6b]'
                : guild.guild_name === 'RATNA'
                  ? 'text-[#ffd372]'
                  : 'text-[#ff627f]'
        }`}
      >
        {guild.guild_name.toUpperCase()}
      </div>
      <div className='absolute left-36 z-20 hidden h-full items-center justify-center lg:flex lg:flex-col'>
        <div
          className={`flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8  ${
            guild.guild_name === 'VAJRA'
              ? 'text-[#498cff]'
              : guild.guild_name === 'BUDDHA'
                ? 'text-white'
                : guild.guild_name === 'KARMA'
                  ? 'text-[#51fd6b]'
                  : guild.guild_name === 'RATNA'
                    ? 'text-[#ffd372]'
                    : 'text-[#ff627f]'
          }`}
        >
          {guild.guild_name.split('').map((letter, index) => (
            <span key={index}>{letter.toUpperCase()}</span>
          ))}
        </div>
      </div>
      <div className='absolute top-36 z-30 mt-20 flex w-full flex-col justify-center lg:mt-0'>
        <div className='flex size-full justify-center'>
          <p className={`text-2xl font-bold lg:text-4xl`}>{guild.description}</p>
        </div>
        <div className='mt-10 flex size-full w-full flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold'>Skills</h1>
          <p className='text-lg font-semibold'>{guild.skills.join(', ')}</p>
        </div>

        {/* Guild Members */}
        <div className='flex w-full items-center justify-center'>
          <div className='w-[90%] max-w-[550px] rounded-xl bg-black/20 p-4'>
            <h2 className='mb-4 text-center text-2xl font-bold'>Guild Members</h2>
            <div className='grid grid-cols-2 gap-4'>
              {guilds
                .filter((user) => user.guild === guild.guild_name)
                .slice(0, 4)
                .map((user, userIndex) => (
                  <div key={userIndex} className='flex flex-col items-center'>
                    <Image src={user.avatarimg} alt={user.username} width={80} height={80} className='rounded-full' />
                    <p className='mt-2 text-center text-sm font-medium'>{user.username}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
        <source src={guild.guild_video} type='video/mp4' />
      </video>
      <div className='absolute z-30 hidden h-full lg:right-20 lg:flex lg:items-center'>
        <Image src={guild.symbol} height={250} width={250} alt='guild symbol' />
      </div>
      <div className='absolute bottom-0 z-30 flex justify-center lg:hidden'>
        <Image src={guild.symbol} height={80} width={80} alt='guild symbol' />
      </div>
    </>
  )
}
