import { useEffect, useRef, useState, useCallback } from "react"

const TAIL_LENGTH = 8
const TAIL_FADE_STEP = 1 / (TAIL_LENGTH + 1)

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const tailRefs = useRef<(HTMLDivElement | null)[]>([])
  const pos = useRef({ x: -100, y: -100 })
  const tailPositions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  )
  const raf = useRef<number>(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const animate = useCallback(() => {
    const dot = dotRef.current
    if (dot) {
      const size = isHovering ? 40 : 8
      const offset = size / 2
      dot.style.transform = `translate(${pos.current.x - offset}px, ${pos.current.y - offset}px)`
      dot.style.width = `${size}px`
      dot.style.height = `${size}px`
      dot.style.backgroundColor = isHovering ? "transparent" : "#8B5E3C"
      dot.style.borderWidth = isHovering ? "1px" : "0"
      dot.style.opacity = isVisible ? "1" : "0"
    }

    for (let i = TAIL_LENGTH - 1; i > 0; i--) {
      tailPositions.current[i] = { ...tailPositions.current[i - 1] }
    }
    tailPositions.current[0] = { ...pos.current }

    tailRefs.current.forEach((el, i) => {
      if (!el) return
      const tp = tailPositions.current[i]
      const scale = 1 - (i + 1) * 0.08
      const opacity = isVisible && !isHovering ? (1 - (i + 1) * TAIL_FADE_STEP) * 0.5 : 0
      el.style.transform = `translate(${tp.x - 3}px, ${tp.y - 3}px) scale(${scale})`
      el.style.opacity = `${opacity}`
    })

    raf.current = requestAnimationFrame(animate)
  }, [isHovering, isVisible])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }
    const onEnter = () => setIsVisible(true)
    const onLeave = () => setIsVisible(false)
    const onHoverIn = () => setIsHovering(true)
    const onHoverOut = () => setIsHovering(false)

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-clickable]").forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn)
        el.removeEventListener("mouseleave", onHoverOut)
        el.addEventListener("mouseenter", onHoverIn)
        el.addEventListener("mouseleave", onHoverOut)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    document.querySelectorAll("a, button, [data-clickable]").forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn)
      el.addEventListener("mouseleave", onHoverOut)
    })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [animate])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {Array.from({ length: TAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { tailRefs.current[i] = el }}
          className="absolute left-0 top-0 w-[6px] h-[6px] rounded-full bg-[#8B5E3C]"
          style={{ opacity: 0 }}
        />
      ))}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full border-[#8B5E3C]"
        style={{ borderStyle: "solid", borderWidth: 0, transition: "width 0.2s, height 0.2s, background-color 0.2s, border-width 0.2s" }}
      />
    </div>
  )
}

export default CustomCursor
