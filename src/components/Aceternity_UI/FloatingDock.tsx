import { IconCloverFilled, IconHome, IconLibraryPhoto, IconRadarFilled, IconSpadeFilled } from '@tabler/icons-react'
import { FloatingDockConsole } from '../ui/floating-dock/floating-dock-console'

export function FloatingDockDemo({ handleBgColor }: { handleBgColor: (color: string) => void }) {
  const links = [
    {
      title: 'Home',
      icon: <IconHome className='size-full' />,
      href: '/floating-dock/home',
      bgColor: 'bg-blue-500 dark:bg-blue-700',
    },
    {
      title: 'Gallery',
      icon: <IconLibraryPhoto className='size-full ' />,
      href: '/floating-dock/shop',
      bgColor: 'bg-green-500 dark:bg-green-700',
    },
    {
      title: 'Projects',
      icon: <IconCloverFilled className='size-full ' />,
      href: '#',
      bgColor: 'bg-yellow-500 dark:bg-yellow-700',
    },
    {
      title: 'Experience',
      icon: <IconSpadeFilled className='size-full ' />,
      href: '#',
      bgColor: 'bg-purple-500 dark:bg-purple-700',
    },
    {
      title: 'Skills',
      icon: <IconRadarFilled className='size-full ' />,
      href: '#',
      bgColor: 'bg-red-500 dark:bg-red-700',
    },
  ]

  return <FloatingDockConsole items={links} desktopClassName='bg-transparent' onIconSelect={handleBgColor} />
}
