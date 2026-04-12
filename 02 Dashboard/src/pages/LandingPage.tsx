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
import { Particles } from '../components/landing/Particles'
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
        <div style={{ position: 'relative', maskImage: 'linear-gradient(to right, transparent 0%, black 7.5%, black 92.5%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7.5%, black 92.5%, transparent 100%)' }}>
          <Particles
            quantity={180}
            staticity={15}
            ease={20}
            size={0.5}
            color="#b18ddd"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
          />
          <About />
          <Contact />
        </div>
        <Footer />
      </ClickSpark>
      <Navbar />
    </>
  )
}
