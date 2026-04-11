import { useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { Features } from '../components/landing/Features'
import { TechStack } from '../components/landing/TechStack'
import { About } from '../components/landing/About'
import { Contact } from '../components/landing/Contact'
import { Footer } from '../components/landing/Footer'
import ClickSpark from '../components/landing/ClickSpark'
export function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <ClickSpark sparkColor="#baa4d4" sparkSize={10} sparkRadius={30} sparkCount={8} duration={400}>
        <Hero />
        <Features />
        <TechStack />
        <About />
        <Contact />
        <Footer />
      </ClickSpark>
      <Navbar />
    </>
  )
}
