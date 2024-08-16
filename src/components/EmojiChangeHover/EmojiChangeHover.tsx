'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// Array of emoji characters
const emojis = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😊',
  '😉',
  '😋',
  '😎',
  '😍',
  '🥰',
  '😘',
  '🤩',
  '🥳',
  '🤗',
  '😇',
  '😈',
  '🤡',
  '🤪',
  '😜',
  '🤨',
  '🧐',
  '🙄',
  '😩',
  '😔',
  '😠',
  '😡',
  '🥶',
  '🥵',
  '😥',
  '😨',
  '😱',
  '🤯',
  '😩',
  '😫',
  '🥱',
  '😴',
  '😭',
]

const EmojiChangeHover = () => {
  // State variables
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0])
  const [showEmojiCard, setShowEmojiCard] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [cardPosition, setCardPosition] = useState('left') // New state for card position
  const cardRef = useRef(null) // Ref for the emoji card

  // Function to change the emoji randomly
  const changeEmoji = useCallback(() => {
    let newEmoji
    do {
      newEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    } while (newEmoji === currentEmoji)
    setCurrentEmoji(newEmoji)
  }, [currentEmoji])

  // Effect to change emoji every 2 seconds
  useEffect(() => {
    const interval = setInterval(changeEmoji, 2000)
    return () => clearInterval(interval)
  }, [changeEmoji])

  // Effect to handle clicking outside the card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowEmojiCard(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Function to toggle card position
  const toggleCardPosition = () => {
    setCardPosition((prevPosition) => (prevPosition === 'left' ? 'right' : 'left'))
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-br from-violet-800 to-black'>
      <div className='relative'>
        <button
          className={`text-5xl transition-all duration-0 ease-in-out hover:scale-105 ${isHovered ? '' : 'grayscale'}`}
          onMouseEnter={() => {
            changeEmoji()
            setIsHovered(true)
          }}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setShowEmojiCard(!showEmojiCard)
            toggleCardPosition() // Toggle card position on click
          }}
        >
          <span className='transition-all duration-0 ease-in-out'>{currentEmoji}</span>
        </button>

        {showEmojiCard && (
          <div
            ref={cardRef}
            className={`absolute ${cardPosition === 'left' ? 'right-full mr-4' : 'left-full ml-4'} -top-56 w-96 rounded-xl bg-white/20 p-4 backdrop-blur-lg`}
          >
            <div className='grid grid-cols-5 gap-3'>
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className='rounded-lg bg-white/30 p-2 text-2xl transition-all duration-75 hover:scale-110 hover:bg-white/50'
                  onClick={() => {
                    setCurrentEmoji(emoji)
                    setShowEmojiCard(false)
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmojiChangeHover
