import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { Features } from '../components/landing/Features'
import { TechStack } from '../components/landing/TechStack'
import { About } from '../components/landing/About'
import { Contact } from '../components/landing/Contact'
import { Footer } from '../components/landing/Footer'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
