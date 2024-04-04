import TicketCard from '@/components/card/TicketCard'
import GitHubCard from '@/components/card/GitGubCard'

const Card2 = () => {
  // const githubToken = YOUR GITHUB TOKEN HERE
  return (
    <div>
      <TicketCard />
      <GitHubCard githubKey={githubToken} />
    </div>
  )
}

export default Card2
