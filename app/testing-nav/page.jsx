'use client'

import { useRef } from 'react'

export default function Home() {
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const scrollOffset = 80 // Adjust this value to change the top offset

  const scrollToSection = (sectionRef) => {
    window.scrollTo({
      top: sectionRef.current.offsetTop - scrollOffset,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <nav className='fixed top-20'>
        <button onClick={() => scrollToSection(section1Ref)}>Go to Section 1</button>
        <button onClick={() => scrollToSection(section2Ref)}>Go to Section 2</button>
        <button onClick={() => scrollToSection(section3Ref)}>Go to Section 3</button>
      </nav>

      <div ref={section1Ref} style={{ height: '100vh', background: 'lightblue' }}>
        <h2>Section 1</h2>
      </div>
      <div ref={section2Ref} style={{ height: '100vh', background: 'lightgreen' }}>
        <h2>Section 2</h2>
      </div>
      <div ref={section3Ref} style={{ height: '100vh', background: 'lightcoral' }}>
        <h2>Section 3</h2>
      </div>
    </div>
  )
}
