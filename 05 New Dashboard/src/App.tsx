import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen w-full bg-[#08080a] text-gray-100">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default App
