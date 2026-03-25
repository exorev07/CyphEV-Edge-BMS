import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { TechStack } from './components/TechStack'
import { About } from './components/About'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen w-full bg-[#08080a] text-gray-100">
      <Navbar />
      <Hero />
      <Features />
      <TechStack />
      <About />
      <Footer />
    </div>
  )
}

export default App
