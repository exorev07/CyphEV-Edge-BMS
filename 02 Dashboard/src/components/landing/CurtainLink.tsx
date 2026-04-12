import React, { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import { animate } from 'motion/react'
import { Terminal, TypingAnimation } from './Terminal'

interface CurtainLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  children: React.ReactNode
}

// Singleton curtain + terminal overlay
let curtainEl: HTMLDivElement | null = null
let terminalEl: HTMLDivElement | null = null
let terminalRoot: ReturnType<typeof createRoot> | null = null

function getElements() {
  if (!curtainEl) {
    curtainEl = document.createElement('div')
    Object.assign(curtainEl.style, {
      position: 'fixed',
      inset: '0',
      background: '#1a1a1a',
      zIndex: '99999',
      transform: 'translateX(-100%)',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })
    document.body.appendChild(curtainEl)
  }

  if (!terminalEl) {
    terminalEl = document.createElement('div')
    Object.assign(terminalEl.style, {
      opacity: '0',
      transition: 'opacity 0.25s ease',
      pointerEvents: 'none',
    })
    curtainEl.appendChild(terminalEl)
    terminalRoot = createRoot(terminalEl)
  }

  return { curtain: curtainEl, terminal: terminalEl, root: terminalRoot! }
}

function BootSequence({ onDone }: { onDone: () => void }) {
  return (
    <Terminal sequence started onDone={onDone}>
      <TypingAnimation color="#b18ddd" duration={30}>&gt; Launching CyphEV Dashboard</TypingAnimation>
      <TypingAnimation color="#34d399" duration={10}>   ✔ Initialising edge telemetry.</TypingAnimation>
      <TypingAnimation color="#34d399" duration={10}>   ✔ Loading BMS data streams.</TypingAnimation>
      <TypingAnimation color="#34d399" duration={10}>   ✔ Connecting to Firebase RTDB.</TypingAnimation>
      <TypingAnimation color="#34d399" duration={10}>   ✔ Loading Authentication page.</TypingAnimation>
      <TypingAnimation color="#9ca3af" duration={25}>All systems go. Redirecting...</TypingAnimation>
    </Terminal>
  )
}

export function CurtainLink({ href, children, style, className, ...rest }: CurtainLinkProps) {
  const navigate = useNavigate()
  const busy = useRef(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (busy.current) return
    busy.current = true

    const { curtain, terminal, root } = getElements()
    curtain.style.transform = 'translateX(-100%)'
    terminal.style.opacity = '0'

    // Unmount then remount to reset sequence state
    root.render(null)
    setTimeout(() => {
      root.render(<BootSequence onDone={() => {}} />)
    }, 0)

    // 1. Sweep curtain in
    animate(
      curtain,
      { transform: ['translateX(-100%)', 'translateX(0%)'] },
      { duration: 0.45, easing: [0.76, 0, 0.24, 1] }
    ).then(() => {
      // 2. Fade terminal in
      terminal.style.opacity = '1'

      // 3. Navigate immediately (page loads behind curtain)
      navigate(href)

      // 4. After 2s, fade terminal out then sweep curtain out
      setTimeout(() => {
        terminal.style.opacity = '0'
        setTimeout(() => {
          animate(
            curtain,
            { transform: ['translateX(0%)', 'translateX(100%)'] },
            { duration: 0.45, easing: [0.76, 0, 0.24, 1] }
          ).then(() => {
            curtain.style.transform = 'translateX(-100%)'
            root.render(null)
            busy.current = false
          })
        }, 250) // wait for terminal fade
      }, 3500)
    })
  }

  return (
    <a href={href} onClick={handleClick} style={style} className={className} {...rest}>
      {children}
    </a>
  )
}
