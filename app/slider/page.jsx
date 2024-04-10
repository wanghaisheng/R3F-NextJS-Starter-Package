import WelcomeComponent from '@/components/Slider/WelcomeComponent'
import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import ExperienceComponent from '@/components/Slider/ExperienceComponent'
import CardComponent from '@/components/Slider/CardComponent'

const Slider = () => {
  return (
    <>
      <div className='flex items-start justify-start'>
        {/* <WelcomeComponent />
        <AvatarComponent /> */}
        {/* <CardComponent /> */}
        <ExperienceComponent />
        {/* <SkillsComponent /> */}
      </div>
    </>
  )
}

export default Slider
