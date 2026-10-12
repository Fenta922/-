import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navSections, profile } from '../data/profile'
import type { Theme } from '../hooks/useTheme'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  theme: Theme
  onToggleTheme: () => void
  /** 当前滚动到的区块 id（用于高亮） */
  active: string
}

export default function Navbar({ theme, onToggleTheme, active }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // 滚动后导航栏出现背景模糊与描边
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc 关闭移动端菜单
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ease-out ${
        scrolled || open
          ? 'border-line bg-nav backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="主导航"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="font-serif text-lg font-semibold tracking-wide transition-colors duration-200 hover:text-primary"
        >
          {profile.name}
        </a>

        {/* 桌面端 */}
        <div className="hidden items-center gap-1 md:flex">
          {navSections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                active === s.id
                  ? 'bg-primary-soft font-medium text-primary'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {s.label}
            </a>
          ))}
          <span className="ml-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </span>
        </div>

        {/* 移动端 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            className="rounded-full p-2 text-ink transition-colors duration-200 hover:bg-primary-soft"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单（平滑展开/收起） */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-1 px-5 pb-4 pt-1">
          {navSections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === s.id ? 'true' : undefined}
              className={`block rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 ${
                active === s.id
                  ? 'bg-primary-soft font-medium text-primary'
                  : 'text-muted hover:bg-primary-soft hover:text-ink'
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
