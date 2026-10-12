import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'theme'

/** 初始主题：localStorage 优先，否则跟随系统（与 index.html 里的防闪烁脚本保持一致） */
function getInitial(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* localStorage 不可用时忽略 */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial)

  // 主题同步到 <html> 的 dark class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // 用户没有手动选择过时，跟随系统变化
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      let hasChoice = false
      try {
        hasChoice = localStorage.getItem(KEY) !== null
      } catch {
        hasChoice = false
      }
      if (!hasChoice) setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* 忽略存储失败 */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
