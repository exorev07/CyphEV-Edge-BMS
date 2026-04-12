import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { motion, type MotionProps } from 'motion/react'

// ── Sequence context ──────────────────────────────────────────────────────────

interface SequenceContextValue {
  completeItem: (index: number) => void
  activeIndex: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)
const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

// ── AnimatedSpan ──────────────────────────────────────────────────────────────

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode
  delay?: number
  color?: string
}

export function AnimatedSpan({ children, delay = 0, color, ...props }: AnimatedSpanProps) {
  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!sequence || itemIndex === null || !sequence.sequenceStarted || hasStarted) return
    if (sequence.activeIndex === itemIndex) setHasStarted(true)
  }, [sequence, hasStarted, itemIndex])

  const shouldAnimate = sequence ? hasStarted : true

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      style={{ display: 'grid', fontSize: '13px', fontWeight: 400, letterSpacing: '-0.01em', color: color ?? '#e5e7eb', lineHeight: 1.5 }}
      onAnimationComplete={() => {
        if (sequence && itemIndex !== null) sequence.completeItem(itemIndex)
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ── TypingAnimation ───────────────────────────────────────────────────────────

interface TypingAnimationProps extends Omit<MotionProps, 'children'> {
  children: string
  duration?: number
  delay?: number
  color?: string
  started?: boolean
}

export function TypingAnimation({
  children,
  duration = 40,
  delay = 0,
  color,
  started: externalStarted,
  ...props
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const completeRef = useRef<SequenceContextValue['completeItem'] | null>(null)
  const indexRef = useRef<number | null>(null)

  useEffect(() => {
    completeRef.current = sequence?.completeItem ?? null
    indexRef.current = itemIndex
  }, [sequence?.completeItem, itemIndex])

  // Start trigger
  useEffect(() => {
    if (sequence && itemIndex !== null) {
      if (sequence.sequenceStarted && !started && sequence.activeIndex === itemIndex) {
        setStarted(true)
      }
    } else if (externalStarted !== undefined) {
      if (externalStarted) setStarted(true)
    } else {
      const t = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(t)
    }
  }, [delay, started, sequence, itemIndex, externalStarted])

  // Typing effect
  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        const complete = completeRef.current
        const idx = indexRef.current
        if (complete && idx !== null) complete(idx)
      }
    }, duration)
    return () => clearInterval(interval)
  }, [children, duration, started])

  return (
    <motion.span
      style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '-0.01em', color: color ?? '#e5e7eb', lineHeight: 1.5 }}
      {...props}
    >
      {displayedText}
    </motion.span>
  )
}

// ── Terminal ──────────────────────────────────────────────────────────────────

interface TerminalProps {
  children: React.ReactNode
  sequence?: boolean
  started?: boolean
  style?: React.CSSProperties
  onDone?: () => void
}

export function Terminal({ children, sequence = true, started = true, style, onDone }: TerminalProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const childCount = Children.toArray(children).length
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null
    return {
      completeItem: (index) => {
        setActiveIndex((cur) => {
          const next = index === cur ? cur + 1 : cur
          if (next >= childCount) onDoneRef.current?.()
          return next
        })
      },
      activeIndex,
      sequenceStarted: started,
    }
  }, [sequence, activeIndex, started, childCount])

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as React.ReactNode}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence])

  const content = (
    <div style={{
      width: '420px',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(12,10,18,0.92)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', monospace",
      ...style,
    }}>
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
      </div>
      {/* Content */}
      <pre style={{ margin: 0, padding: '14px 16px', height: '160px', overflow: 'hidden' }}>
        <code style={{ display: 'grid', gap: '3px' }}>
          {wrappedChildren}
        </code>
      </pre>
    </div>
  )

  if (!sequence) return content

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  )
}
