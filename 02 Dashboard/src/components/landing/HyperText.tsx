import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
} from 'react'
import {
  AnimatePresence,
  motion,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from 'motion/react'

type CharacterSet = string[] | readonly string[]

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>
type HyperTextMotionComponent = ComponentType<
  Omit<HTMLMotionProps<'div'>, 'ref'> & RefAttributes<HTMLElement>
>

interface HyperTextProps extends Omit<MotionProps, 'children'> {
  children: string
  className?: string
  style?: React.CSSProperties
  duration?: number
  delay?: number
  as?: MotionElementType
  startOnView?: boolean
  animateOnHover?: boolean
  characterSet?: CharacterSet
  /** Index in the string where accent color begins (inclusive) */
  accentStart?: number
  /** Color for accented characters */
  accentColor?: string
}

const UPPER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const LOWER_SET = 'abcdefghijklmnopqrstuvwxyz'.split('')

const DEFAULT_CHARACTER_SET = Object.freeze(UPPER_SET) as readonly string[]

const getRandomInt = (max: number): number => Math.floor(Math.random() * max)

const getScrambleChar = (
  original: string,
  characterSet: CharacterSet
): string => {
  // Match case of original so width stays stable
  const isUpper = original === original.toUpperCase() && original !== original.toLowerCase()
  const isLower = original === original.toLowerCase() && original !== original.toUpperCase()
  if (isUpper) return UPPER_SET[getRandomInt(UPPER_SET.length)]
  if (isLower) return LOWER_SET[getRandomInt(LOWER_SET.length)]
  return characterSet[getRandomInt(characterSet.length)]
}

export function HyperText({
  children,
  className,
  style,
  duration = 800,
  delay = 0,
  as: Component = 'div',
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  accentStart,
  accentColor = '#b18ddd',
  ...props
}: HyperTextProps) {
  const MotionComponent = motionElements[Component] as HyperTextMotionComponent

  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split('')
  )
  const [resolvedCount, setResolvedCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [charWidths, setCharWidths] = useState<number[]>([])
  const iterationCount = useRef(0)
  const elementRef = useRef<HTMLElement | null>(null)

  // Measure each character's natural width so scramble spans can be locked to it
  useEffect(() => {
    if (!elementRef.current) return
    const el = elementRef.current
    const computed = window.getComputedStyle(el)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`
    const widths = children.split('').map((ch) =>
      ch === ' ' ? ctx.measureText(' ').width : ctx.measureText(ch).width
    )
    setCharWidths(widths)
  }, [children, style])

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0
      setResolvedCount(0)
      setIsAnimating(true)
    }
  }

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true)
      }, delay)
      return () => clearTimeout(startTimeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            iterationCount.current = 0
            setResolvedCount(0)
            setDisplayText(children.split(''))
            setIsAnimating(true)
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, startOnView])

  useEffect(() => {
    let animationFrameId: number | null = null

    if (isAnimating) {
      const maxIterations = children.length
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        iterationCount.current = progress * maxIterations
        setResolvedCount(Math.floor(iterationCount.current))

        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === ' '
              ? letter
              : index <= iterationCount.current
                ? children[index]
                : getScrambleChar(children[index], characterSet)
          )
        )

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setResolvedCount(children.length)
          setIsAnimating(false)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [children, duration, isAnimating, characterSet])

  return (
    <MotionComponent
      ref={elementRef}
      className={className}
      style={style}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => {
          const isResolved = index < resolvedCount || letter === ' '
          const isAccent =
            accentStart !== undefined && index >= accentStart && isResolved

          const w = charWidths[index]
          const locked = !isResolved && w !== undefined

          return (
            <motion.span
              key={index}
              style={{
                fontFamily: 'inherit',
                display: locked ? 'inline-block' : 'inline',
                width: locked ? `${w}px` : undefined,
                textAlign: locked ? 'center' : undefined,
                color: isAccent ? accentColor : 'inherit',
                transition: 'color 0.3s ease',
              }}
            >
              {letter}
            </motion.span>
          )
        })}
      </AnimatePresence>
    </MotionComponent>
  )
}
