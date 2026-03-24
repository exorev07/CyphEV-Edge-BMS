import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.06] py-10 px-6 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-amethyst-400" />
          <span className="text-sm font-bold tracking-wider text-gray-500">
            CYPH<span className="text-amethyst-400">EV</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-600">
          <a href="#features" className="hover:text-gray-300 transition-colors">Features</a>
          <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
        </div>
        <p className="text-xs text-gray-700">IIIT Naya Raipur &middot; Minor Project</p>
      </div>
    </footer>
  )
}
