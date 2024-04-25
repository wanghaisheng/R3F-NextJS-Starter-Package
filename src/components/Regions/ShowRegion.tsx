import Image from 'next/image'

export default function ShowRegion() {
  const regions = [
    {
      name: 'East Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/15865/15865373.png',
      image:
        'https://imgs.search.brave.com/aSDKpjkUcexmRKTgD4x46WheLrZPpHQzTNQ5uuFYx5k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlnbG9iYWx2aWV3/cG9pbnQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA4/L1BhbGF3YW4tMS5q/cGc',
    },
    {
      name: 'South Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/356/356749.png',
      image:
        'https://imgs.search.brave.com/CHR1lb38tg1-9E8kcVdsTqaK2sEmUZCZo7PSvKWy3tM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXdt/YWxyb2Ftcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDgvMjVEQzg5RTEt/MDA2Mi00NDNFLUFG/MUQtQ0Y1ODAxMzcy/RjI4LTEwMjR4Njg0/LmpwZWc',
    },
    {
      name: 'Meso America',
      icon: 'https://cdn-icons-png.flaticon.com/128/2492/2492046.png',
      image:
        'https://imgs.search.brave.com/t4ZToHbheBsGuZBsU4WvRJd7VQmyNn0xtgOon50vsSA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbnRyYXZlbGVy/LmNvbS9waG90b3Mv/NjU0ODVlNTk1M2My/NTc2YTRlMjBmODkz/L21hc3Rlci93XzMy/MCxjX2xpbWl0L0Jp/Zy1TdXItdGhvbWFz/LWNpc3pld3NraS1l/ckFwbWZSWDdlby11/bnNwbGFzaC5qcGc',
    },
    {
      name: 'North Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      image:
        'https://imgs.search.brave.com/sdPLZjS3Z9AOVh1q6THgtwaL4UU_ug4VwT_dkE3LZRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmFzc2V0cy50aGVk/aXNjb3ZlcmVyLmNv/bS8yMDE5LzA1L2Jl/YXV0aWZ1bC1hZnJp/Y2EuanBn',
    },
  ]

  return (
    <div className='mx-10 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {regions.map((region, index) => (
        <div className='flex min-w-0 flex-col items-center justify-center' key={index}>
          <div
            style={{
              backgroundImage: `url(${region.image})`,
            }}
            className='h-48 w-full rounded-lg bg-black bg-cover bg-center shadow-md md:h-56'
          >
            <div className='flex h-full flex-col justify-between'>
              <div className='h-full rounded-t-lg bg-black/70 px-3 py-2 text-center font-bold uppercase tracking-wide text-white transition duration-300 ease-out hover:bg-black/0'>
                <div className='flex h-full items-center justify-center transition duration-500 ease-out hover:opacity-0'>
                  <Image unoptimized src={region.icon} alt='region icon' height={60} width={60} />
                </div>
              </div>
              <div className='relative flex flex-col items-center rounded-b-lg bg-purple-950 px-3 py-2'>
                <h1 className='font-bold text-white transition duration-300 ease-in-out '>{region.name}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
