import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

/** 回到顶部：滚动超过一屏后出现 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="回到顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 rounded-full border border-line bg-card p-3 text-muted shadow-soft transition-all duration-300 ease-out hover:border-primary hover:text-primary ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}
