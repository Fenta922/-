import { useEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** 入场延迟（毫秒），用于同组元素错峰出现 */
  delay?: number
  className?: string
}

/** 滚动入场：进入视口后淡入上移，尊重 prefers-reduced-motion */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
