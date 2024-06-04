import CardsFlipCard from '../../card/cardsFlipCard'

export default function WalletComponent() {
  return (
    <div>
      <div className='absolute right-80 top-0'>
        <CardsFlipCard
          type='Emergency'
          name='John Doe'
          blood_group='O+'
          emergency_contact='1234567890'
          emergency_address='Bangalore'
          emergency_details='Some details about the emergency'
          dateIn={undefined}
          dateOut={undefined}
          description={undefined}
        />
      </div>
      <h2>Showcase Cards</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    </div>
  )
}
