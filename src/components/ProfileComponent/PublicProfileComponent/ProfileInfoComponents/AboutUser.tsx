export default function AboutUser({ userData }) {
  return (
    <div>
      {userData.first_name} {userData.age}
    </div>
  )
}
