import React, { PropsWithChildren, useRef } from 'react'
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import type { MotionProps } from 'motion/react'

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

export interface DockProps {
  className?: string
  iconSize?: number
  iconMagnification?: number
  iconDistance?: number
  direction?: 'top' | 'middle' | 'bottom'
  children: React.ReactNode
  style?: React.CSSProperties
}

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  size?: number
  magnification?: number
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

export function Dock({
  className,
  children,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  iconDistance = DEFAULT_DISTANCE,
  direction = 'middle',
  style,
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity)

  const rendered = React.Children.map(children, (child) => {
    if (React.isValidElement<DockIconProps>(child) && child.type === DockIcon) {
      return React.cloneElement(child, {
        ...child.props,
        mouseX,
        size: iconSize,
        magnification: iconMagnification,
        distance: iconDistance,
      })
    }
    return child
  })

  const alignItems =
    direction === 'top' ? 'flex-start' : direction === 'bottom' ? 'flex-end' : 'center'

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{
        display: 'flex',
        alignItems,
        justifyContent: 'center',
        gap: '6px',
        height: '58px',
        padding: '6px 10px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        ...style,
      }}
      className={className}
      {...(props as object)}
    >
      {rendered}
    </motion.div>
  )
}

export function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  children,
  style,
  ...props
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)
  const defaultMouseX = useMotionValue(Infinity)

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style }}
      {...(props as object)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  )
}
