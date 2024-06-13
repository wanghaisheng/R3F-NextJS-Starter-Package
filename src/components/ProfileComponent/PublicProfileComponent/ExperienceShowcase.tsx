import DrawOutlineButton from '@/components/AnimatedButton/DrawOutlineButton'
import ExpProfileView from '@/components/card/ExpProfileView'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'

export default function ExperienceShowcase({ experience, user }) {
  return (
    <>
      <div className='mb-24 flex size-full flex-row overflow-hidden px-4'>
        {user && experience.length != 0 ? (
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className='flex size-72 h-[550px] w-[800px] items-center justify-center rounded-lg'
          >
            {experience.map((exp, index) => (
              <SwiperSlide key={index}>
                <div className='flex justify-center'>
                  <ExpProfileView
                    type={exp.type}
                    projectName={exp.name}
                    skills={exp.project_skills.join(', ')}
                    toolsAndTech={exp.tools}
                    description={exp.description}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>No Exp to show</div>
        )}
      </div>
    </>
  )
}

// ;<div className='z-20 mt-4 flex items-center justify-center'>
//   {/* https://r3-f-next-js-starter-package.vercel.app/ */}
//   {user && (
//     <a
//       // href={`http://localhost:3001//api/public/users/${user.gg_id}`}
//       // target='_blank'
//       aria-label='Booking button'
//     >
//       <DrawOutlineButton>Booking Comming Soon!!</DrawOutlineButton>
//     </a>
//   )}
// </div>
