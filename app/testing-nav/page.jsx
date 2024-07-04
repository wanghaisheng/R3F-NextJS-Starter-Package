'use client'

import { useRef, useState, useEffect } from 'react'

export default function Home() {
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const [visibleSection, setVisibleSection] = useState(null)
  const scrollOffset = 80 // Adjust this value to change the top offset

  const scrollToSection = (sectionRef) => {
    window.scrollTo({
      top: sectionRef.current.offsetTop - scrollOffset,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const sectionRefs = [section1Ref, section2Ref, section3Ref]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: `-${scrollOffset}px 0px 0px 0px`,
        threshold: 0.5,
      },
    )

    sectionRefs.forEach((sectionRef) => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current)
      }
    })

    return () => {
      sectionRefs.forEach((sectionRef) => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current)
        }
      })
    }
  }, [])

  return (
    <div>
      <div className='h-screen bg-pink-200'>
        <h1>Hello</h1>
      </div>
      <nav className='sticky top-20 flex justify-center bg-white font-bold text-black'>
        {visibleSection !== 'section1' && <button onClick={() => scrollToSection(section1Ref)}>Go to Section 1</button>}
        {visibleSection !== 'section2' && <button onClick={() => scrollToSection(section2Ref)}>Go to Section 2</button>}
        {visibleSection !== 'section3' && <button onClick={() => scrollToSection(section3Ref)}>Go to Section 3</button>}
      </nav>

      <div id='section1' ref={section1Ref} style={{ height: '100vh', background: 'lightblue' }}>
        <h2>Section 1</h2>
      </div>
      <div id='section2' ref={section2Ref} style={{ height: '100vh', background: 'lightgreen' }}>
        <h2>Section 2</h2>
      </div>
      <div id='section3' ref={section3Ref} style={{ height: '100vh', background: 'lightcoral' }}>
        <h2>Section 3</h2>
      </div>
    </div>
  )
}
