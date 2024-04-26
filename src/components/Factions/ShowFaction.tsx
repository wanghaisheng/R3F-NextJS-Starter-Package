import Image from 'next/image'

export default function ShowFaction({ filter }: { filter: string }) {
  const factions = [
    {
      name: 'Rohit Shrestha',
      description: 'description',
      faction: 'KARUNA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      faction: 'KARMA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Satkar Niraula',
      description: 'description',
      faction: 'BODHI',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description',
      faction: 'VAJRA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Hari Bahadur',
      description: 'description',
      faction: 'SHANTI',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Rohit Shrestha',
      description: 'description',
      faction: 'KARUNA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      faction: 'KARMA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Satkar Niraula',
      description: 'description',
      faction: 'BODHI',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description',
      faction: 'VAJRA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Hari Bahadur',
      description: 'description',
      faction: 'KARUNA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
  ]

  const filteredFactions = filter ? factions.filter((faction) => faction.faction === filter) : factions

  return (
    <div className='flex justify-center'>
      <div className='mx-10 mt-6 grid w-[70%] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {filteredFactions.map((faction, index) => (
          <div className='flex min-w-0 flex-col items-center justify-center' key={index}>
            <div
              style={{
                backgroundImage: `url(${faction.avatarimg})`,
              }}
              className='h-48 w-full rounded-lg bg-black bg-cover bg-center shadow-md md:h-56'
            >
              <div className='flex h-full flex-col justify-between'>
                <div className='h-full rounded-t-lg bg-black/0 px-3 py-2 text-center font-bold uppercase tracking-wide text-white transition duration-300 ease-out hover:bg-black/70'>
                  <div className='flex h-full items-center justify-center opacity-0 transition duration-500 ease-out hover:opacity-100'>
                    <p>{faction.description}</p>
                  </div>
                </div>
                <div className='relative flex flex-col items-center rounded-b-lg bg-purple-950 px-3 py-2'>
                  <h1 className='font-bold text-white transition duration-300 ease-in-out '>{faction.name}</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
