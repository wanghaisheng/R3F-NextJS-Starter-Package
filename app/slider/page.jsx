import WelcomeComponent from '@/components/Slider/WelcomeComponent'
import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import WorksComponent from '@/components/Slider/WorksComponent'

const Slider = () => {
  return (
    <>
      <div className='flex items-start justify-start'>
        <WelcomeComponent />
        <AvatarComponent />
        <WorksComponent />
        <SkillsComponent />
      </div>
    </>
  )
}

export default Slider
