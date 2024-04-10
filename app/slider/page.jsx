import WelcomeComponent from '@/components/Slider/WelcomeComponent'
import SkillsComponent from '@/components/Slider/SkillsComponent'
import AvatarComponent from '@/components/Slider/AvatarComponent'
import ExperienceComponent from '@/components/Slider/ExperienceComponent'
import CardComponent from '@/components/Slider/CardComponent'
import ChipTabs from '@/components/Slider/Footer'

const Slider = () => {
  return (
    <>
      <div className='flex w-full flex-col'>
        <WelcomeComponent />
        <AvatarComponent />
        <CardComponent />
        <ExperienceComponent />
        <SkillsComponent />
        <ChipTabs />
      </div>
    </>
  )
}

export default Slider
