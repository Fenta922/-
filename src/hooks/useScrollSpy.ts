import { useEffect, useState } from 'react'

/**
 * 滚动监听：返回当前滚动到的区块 id（最后一个顶部越过 offset 的区块）
 */
export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}
