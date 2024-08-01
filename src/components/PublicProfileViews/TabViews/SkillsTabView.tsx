import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'

const SkillsTabView = ({ skillsData }: { skillsData: any[] }) => {
  return (
    <div className='flex w-full justify-center'>
      <div className='w-[75%] justify-center text-xl font-semibold text-white'>
        {skillsData ? <SkillsChartComponent skills={skillsData} /> : 'No skills to show'}
      </div>
    </div>
  )
}

export default SkillsTabView
