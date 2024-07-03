import ExpProfileView from '@/components/card/ExpProfileView'

export default function ExpCardShowVertical({ experience, user }) {
  return (
    <>
      {user && experience.length !== 0 ? (
        <div className='flex size-full flex-wrap justify-center gap-4'>
          {experience.map((exp, index) => (
            <div className={`${index % 3 === 0 ? 'h-[300px] w-[500px]' : 'h-[200px] w-[250px]'}`} key={index}>
              <div className='size-full rounded-lg'>
                <ExpProfileView
                  type={exp.type}
                  projectName={exp.name}
                  skills={exp.project_skills.join(', ')}
                  toolsAndTech={exp.tools}
                  description={exp.description}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex w-full items-center justify-center'>{user.username} has no Exp to show</div>
      )}
    </>
  )
}
