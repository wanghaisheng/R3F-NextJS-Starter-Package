'use client'

import { cn } from '@/utils'
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'

export const FloatingDockConsole = ({
  items,
  desktopClassName,
  onIconSelect,
}: {
  items: {
    title: string
    icon: React.ReactNode
    href: string
    bgColor: string
  }[]
  desktopClassName?: string
  onIconSelect: (bgColor: string) => void
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} onIconSelect={onIconSelect} />
    </>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
  onIconSelect,
}: {
  items: {
    title: string
    icon: React.ReactNode
    href: string
    bgColor: string
  }[]
  className?: string
  onIconSelect: (bgColor: string) => void
}) => {
  let mouseX = useMotionValue(Infinity)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn('mx-auto hidden md:flex h-20 gap-2 items-end rounded-2xl transparent dark:transparent', className)}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
          isSelected={selectedItem === item.title}
          onSelect={() => {
            setSelectedItem(item.title)
            onIconSelect(item.bgColor)
          }}
        />
      ))}
    </motion.div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  bgColor,
  isSelected,
  onSelect,
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  href: string
  bgColor: string
  isSelected: boolean
  onSelect: () => void
}) {
  let ref = useRef<HTMLDivElement>(null)

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

  let width = useSpring(isSelected ? 80 : widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  let height = useSpring(isSelected ? 80 : heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const [hovered, setHovered] = useState(false)

  return (
    <Link href={href} onClick={onSelect}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'aspect-square rounded-xl flex items-center justify-center relative transition-colors duration-300',
          isSelected ? 'bg-white/40' : `bg-white ${hovered ? bgColor : ''} dark:bg-neutral-800`,
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className='absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white'
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={`flex items-center justify-center ${hovered ? 'text-white' : 'text-black'}`}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  )
}
