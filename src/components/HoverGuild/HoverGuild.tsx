import Image from 'next/image'

const guildData = [
  {
    guild_name: 'BUDDHA',
    symbol: '/homepage/Buddha.svg',
    color: 'white',
    element: 'Space',
    guild_video: '/livewallpapers/buddha.mp4',
    description: 'Research, Development, Philosophy',
    skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
    alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
    additionalSkills: ['Innovation', 'data analysis', 'research'],
  },
  {
    guild_name: 'VAJRA',
    symbol: '/homepage/Vajra.svg',
    color: 'blue',
    element: 'Water',
    guild_video: '/livewallpapers/vajra.mp4',
    description: 'Arts, Education , Law, Teaching',
    skills: ['Wisdom', 'clarity', 'calmness', 'emotional intelligence'],
    alignment: ['Leadership across departments', 'conflict resolution', 'team building'],
    additionalSkills: ['Active listening', 'problem-solving from multiple perspectives'],
  },
  {
    guild_name: 'KARMA',
    symbol: '/homepage/Karma.svg',
    color: 'green',
    element: 'Wind',
    guild_video: '/livewallpapers/karma.mp4',
    description: 'IT, Engineering, Computer, Gamer',
    skills: ['Action-oriented', 'perseverance', 'resourcefulness', 'decisiveness'],
    alignment: ['Sales strategy', 'negotiation', 'marketing campaigns', 'lead generation'],
    additionalSkills: ['Public speaking', 'persuasion', 'social media expertise'],
  },
  {
    guild_name: 'RATNA',
    symbol: '/homepage/Ratna.svg',
    color: 'yellow',
    element: 'Earth',
    guild_video: '/livewallpapers/earth.mp4',
    description: 'Management, Finance, Health',
    skills: ['Stability', 'reliability', 'patience', 'empathy'],
    alignment: ['Operations management', 'customer service', 'finance', 'human resources'],
    additionalSkills: ['Organization', 'detail-orientation', 'conflict resolution'],
  },
  {
    guild_name: 'PADMA',
    symbol: '/homepage/Padma.svg',
    color: 'red',
    element: 'Fire',
    guild_video: '/livewallpapers/padma.mp4',
    description: 'Marketing, Designer, Content Creator',
    skills: ['Creativity', 'passion', 'discernment', 'inspiration'],
    alignment: ['Product design', 'brand development', 'content creation', 'innovation'],
    additionalSkills: ['Storytelling', 'user experience (UX) design', 'trend analysis'],
  },
]

export default function HoverGuild({ hoveredGuild, top, left, translateY }) {
  const guild = guildData.find((g) => g.guild_name === hoveredGuild.toUpperCase())

  if (!guild) {
    return null
  }

  return (
    <div
      className='invisible absolute
          rounded-md px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100'
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        className={`h-80 w-[288px] rounded-lg border-2 ${guild.guild_name !== 'BUDDHA' ? 'text-gray-300' : 'text-black'}`}
        style={{ backgroundColor: guild.color }}
      >
        <div className='absolute -right-3 -top-3 scale-125'>
          <h2 className='font-bold'>
            <Image src={guild.symbol} alt={guild.guild_name} height={36} width={36} />
          </h2>
        </div>
        <div className='p-2'>
          <h3 className='absolute -top-7 text-xl font-bold' style={{ color: guild.color }}>
            {guild.guild_name}
          </h3>
          <p className={`mt-3 text-xl font-bold ${guild.guild_name !== 'BUDDHA' ? 'text-white' : 'text-black'}`}>
            {guild.description}
          </p>
        </div>
        <div className='absolute -right-14 top-20 z-0 hidden w-1/4 items-start justify-center lg:flex lg:flex-col'>
          <div className=' flex flex-col items-center justify-center p-4 text-lg font-extrabold'>
            {guild.element.split('').map((letter, index) => (
              <span key={index} style={{ color: guild.color }}>
                {letter.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div className='flex justify-between p-2'>
          <div>
            <h3 className='text-lg font-semibold'>Skills</h3>
            <p className='text-sm '>{guild.skills.join(', ')}</p>
          </div>
          <div>
            <h3 className='text-sm font-semibold'>Additional Skills</h3>
            <p className='text-sm '>{guild.additionalSkills.join(', ')}</p>
          </div>
        </div>
        <div className='p-2'>
          <h3 className='text-lg font-semibold'>Alignment</h3>
          <p className='text-sm '>{guild.alignment.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
