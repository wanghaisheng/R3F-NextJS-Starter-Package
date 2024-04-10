import styles from './createavatar.module.css'

// async function getSkills() {
//   try {
//     const res = await fetch('http://localhost:3000/api/skills')
//     if (!res.ok) {
//       throw new Error('failed to fetch the skills')
//     }
//     return res.json()
//   } catch (error) {
//     console.error(error)
//   }
// }

const CreateAvatar = async () => {
  // const skills = await getSkills()
  // console.log(skills)
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <p className='text-white text-5xl mb-8'>Create Your Avatar</p>
      <div className='flex'>
        <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4'>
          <a href='/avatar'>Create Avatar</a>
        </button>
        <button className='inline-block bg-[#E5FF25] text-black font-bold rounded-lg px-6 py-2'>
          <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
        </button>
      </div>
    </div>
  )
}
export default CreateAvatar
