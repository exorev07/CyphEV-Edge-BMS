import * as React from 'react';
import { motion, type Transition } from 'motion/react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

export type CarouselSlide = {
  icon: React.ElementType
  title: string
  desc: string
  color: string
}

type PropType = {
  slides: CarouselSlide[]
  active?: boolean
}

type EmblaControls = {
  selectedIndex: number
  scrollSnaps: number[]
  prevDisabled: boolean
  nextDisabled: boolean
  onDotClick: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

type DotButtonProps = {
  selected?: boolean
  index: number
  onClick: () => void
}

const transition: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 1,
}

const useEmblaControls = (emblaApi: EmblaCarouselType | undefined): EmblaControls => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const [prevDisabled, setPrevDisabled] = React.useState(true)
  const [nextDisabled, setNextDisabled] = React.useState(true)

  const onDotClick = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )
  const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const updateSelectionState = (api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
    setPrevDisabled(!api.canScrollPrev())
    setNextDisabled(!api.canScrollNext())
  }

  const onInit = React.useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList())
    updateSelectionState(api)
  }, [])

  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    updateSelectionState(api)
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    emblaApi.on('reInit', onInit).on('select', onSelect)
    return () => { emblaApi.off('reInit', onInit).off('select', onSelect) }
  }, [emblaApi, onInit, onSelect])

  return { selectedIndex, scrollSnaps, prevDisabled, nextDisabled, onDotClick, onPrev, onNext }
}

export function MotionCarousel({ slides, active = true }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', containScroll: false, slidesToScroll: 1 })
  const { selectedIndex, scrollSnaps, onDotClick } = useEmblaControls(emblaApi)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  // Auto-scroll only while section is visible; reset to slide 0 when leaving
  // Pauses when pointer is over the active card
  React.useEffect(() => {
    if (!emblaApi) return
    if (!active) {
      emblaApi.scrollTo(0)
      return
    }
    const interval = setInterval(() => {
      const current = emblaApi.selectedScrollSnap()
      if (hoveredIndex === current) return
      const total = emblaApi.scrollSnapList().length
      emblaApi.scrollTo(current < total - 1 ? current + 1 : 0)
    }, 10000)
    return () => clearInterval(interval)
  }, [emblaApi, active, hoveredIndex])

  React.useEffect(() => {
    const el = viewportRef.current
    if (!el || !emblaApi) return

    let cooldown = false

    const onWheel = (e: WheelEvent) => {
      const inside = el.contains(e.target as Node)

      // Block vertical scroll while Shift is held inside carousel
      if (inside && e.shiftKey) {
        e.preventDefault()
        e.stopPropagation()
      }

      // Block horizontal scroll inside carousel to prevent browser back/forward
      if (inside && Math.abs(e.deltaX) > 2) {
        e.preventDefault()
        e.stopPropagation()
      }

      const isTrackpadH = Math.abs(e.deltaX) > Math.abs(e.deltaY) && !e.shiftKey && Math.abs(e.deltaX) > 10
      const isMouseShift = e.shiftKey && Math.abs(e.deltaY) > 0

      if (!inside || (!isTrackpadH && !isMouseShift)) return

      if (cooldown) return
      cooldown = true
      setTimeout(() => { cooldown = false }, 500)

      const delta = isTrackpadH ? e.deltaX : e.deltaY
      if (delta > 0) emblaApi.scrollNext()
      else emblaApi.scrollPrev()
    }

    document.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => document.removeEventListener('wheel', onWheel, { capture: true })
  }, [emblaApi])

  return (
    <div ref={viewportRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '20px' }}>
      {/* Slide height matches original: 9rem → 13rem → 18rem (we use 18rem = 288px at desktop) */}
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)' }} ref={emblaRef}>
        <div style={{ display: 'flex', touchAction: 'pan-y pinch-zoom', marginLeft: '-24px' }}>
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex
            const Icon = slide.icon
            return (
              <motion.div
                key={slide.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  height: '288px',           /* md:[--slide-height:18rem] */
                  paddingLeft: '24px',       /* [--slide-spacing:1.5rem] */
                  flex: '0 0 55%',           /* [--slide-size:55%] */
                  minWidth: 0,
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ scale: isActive ? 1 : 0.9 }}
                  transition={transition}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '14px',
                    borderRadius: '12px',
                    border: `4px solid ${isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    boxShadow: isActive ? '0 0 18px rgba(121,71,189,0.18), 0 0 40px rgba(121,71,189,0.08)' : 'none',
                    userSelect: 'none',
                  }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={24} style={{ color: '#9ca3af' }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '18px', fontWeight: 400,
                    letterSpacing: '0.04em',
                    color: '#ffffff', margin: 0, textAlign: 'center', lineHeight: 1.6,
                    padding: '0 16px',
                  }}>
                    {slide.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '16px', color: '#c1c4cac5',
                    letterSpacing: '0.02em',
                    margin: 0, textAlign: 'justify', lineHeight: 1.4,
                    padding: '0 60px',
                  }}>
                    {slide.desc}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Controls row: dots only */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', height: '28px', marginTop: '12px' }}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            index={index}
            selected={index === selectedIndex}
            onClick={() => onDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}


function DotButton({ selected = false, index, onClick }: DotButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={false}
      style={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        border: 'none',
        background: selected ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.18)',
        padding: 0,
        overflow: 'hidden',
      }}
      animate={{
        width: selected ? 44 : 12,
        height: selected ? 28 : 12,
      }}
      transition={transition}
    >
      <motion.span
        initial={false}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px', fontWeight: 700,
          color: '#08080a', whiteSpace: 'nowrap',
        }}
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0,
          filter: selected ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={transition}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
    </motion.button>
  )
}
