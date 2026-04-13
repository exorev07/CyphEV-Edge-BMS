import * as React from 'react'
import { Tooltip as TooltipPrimitive } from 'radix-ui'

function TooltipProvider(props: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={0} {...props} />
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger(props: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />
}

function TooltipContent({
  sideOffset = 8,
  children,
  style,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        style={{
          zIndex: 9999,
          maxWidth: '240px',
          borderRadius: '10px',
          background: 'rgba(10,8,16,0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,255,255,0.28)',
          padding: '10px 12px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          color: '#9ca3af',
          lineHeight: 1.5,
          textAlign: 'justify',
          pointerEvents: 'none',
          ...style,
        }}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          style={{
            fill: 'rgba(10,8,16,0.94)',
            width: 10,
            height: 5,
          }}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
