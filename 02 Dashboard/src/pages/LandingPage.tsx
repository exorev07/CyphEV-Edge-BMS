import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { Features } from '../components/landing/Features'
import { TechStack } from '../components/landing/TechStack'
import { About } from '../components/landing/About'
import { Contact } from '../components/landing/Contact'
import { Footer } from '../components/landing/Footer'
import ClickSpark from '../components/landing/ClickSpark'
export function LandingPage() {
  return (
    <>
      <ClickSpark sparkColor="#b18ddd" sparkSize={10} sparkRadius={30} sparkCount={8} duration={400}>
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
