"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
  type SyntheticEvent,
  useRef,
  useState,
} from "react"
import { useReducedMotion } from "../../hooks/use-reduced-motion"
import { cn } from "../../lib/cn"

const originButtonVariants = cva(
  "relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-md px-8 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        filled: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  },
)

type OriginVariant = VariantProps<typeof originButtonVariants>["variant"]

type OriginButtonShared = {
  children?: ReactNode
  className?: string
  variant?: OriginVariant
}

export type OriginButtonAsButton = OriginButtonShared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined
  }

export type OriginButtonAsAnchor = OriginButtonShared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    href: string
  }

export type OriginButtonProps = OriginButtonAsButton | OriginButtonAsAnchor

function isAnchorProps(props: OriginButtonProps): props is OriginButtonAsAnchor {
  return typeof props.href === "string"
}

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value)
    return
  }
  if (ref) {
    ref.current = value
  }
}

export const OriginButton = ({
  ref,
  ...props
}: OriginButtonProps & { ref?: Ref<HTMLButtonElement | HTMLAnchorElement> }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)
  const scale = useMotionValue(0)
  const reducedMotion = useReducedMotion()
  const smoothScale = useSpring(scale, { stiffness: 85, damping: 18, restDelta: 0.001 })
  const easedScale = useTransform(smoothScale, [0, 1], [0, 1])
  const variant = props.variant ?? "filled"

  const setFromEvent = (event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>, next: number) => {
    const node = containerRef.current
    /* v8 ignore start */
    if (!node) return
    /* v8 ignore stop */
    const rect = node.getBoundingClientRect()
    if ("clientX" in event) {
      setCursorPos({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    } else {
      setCursorPos({ x: rect.width / 2, y: rect.height / 2 })
    }
    setHovered(next === 1)
    if (!reducedMotion) scale.set(next)
  }

  const classNames = cn(originButtonVariants({ variant }), props.className)
  const inner = (
    <>
      {!reducedMotion ? (
        <motion.div
          className={cn(
            "pointer-events-none absolute rounded-full",
            variant === "outline" ? "bg-primary" : "bg-primary-foreground/20",
          )}
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: 400,
            height: 400,
            scale: easedScale,
            x: "-50%",
            y: "-50%",
          }}
        />
      ) : null}
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 whitespace-nowrap transition-colors duration-200",
          variant === "outline" && hovered && "text-primary-foreground",
        )}
      >
        {props.children}
      </span>
    </>
  )

  const caller = props as Partial<
    Record<"onMouseEnter" | "onMouseLeave" | "onFocus" | "onBlur", (event: SyntheticEvent) => void>
  >
  const pointerHandlers = {
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      caller.onMouseEnter?.(event)
      setFromEvent(event, 1)
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      caller.onMouseLeave?.(event)
      setFromEvent(event, 0)
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      caller.onFocus?.(event)
      setFromEvent(event, 1)
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      caller.onBlur?.(event)
      setFromEvent(event, 0)
    },
  }

  if (isAnchorProps(props)) {
    const { href, className, variant: _variant, children, ...anchorProps } = props
    return (
      <a
        {...anchorProps}
        {...pointerHandlers}
        ref={(node) => {
          containerRef.current = node
          setRef(ref, node)
        }}
        href={href}
        className={classNames}
      >
        {inner}
      </a>
    )
  }

  const { className, variant: _variant, children, type = "button", ...buttonProps } = props
  return (
    <button
      {...buttonProps}
      {...pointerHandlers}
      ref={(node) => {
        containerRef.current = node
        setRef(ref, node)
      }}
      type={type}
      className={classNames}
    >
      {inner}
    </button>
  )
}

OriginButton.displayName = "OriginButton"

export function OriginButtonOutline(props: OriginButtonProps) {
  if (isAnchorProps(props)) {
    return <OriginButton {...props} href={props.href} variant="outline" />
  }
  return <OriginButton {...props} href={undefined} variant="outline" />
}

OriginButtonOutline.displayName = "OriginButtonOutline"
