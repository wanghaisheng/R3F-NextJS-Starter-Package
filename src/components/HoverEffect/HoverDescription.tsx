import Image from 'next/image'

// NOTE:: Make sure to add group in the className of the parent element

export default function HoverDescription({ top, left, translateY, children }) {
  return (
    <div
      className='invisible absolute
          z-40 rounded-md px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100'
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  )
}
