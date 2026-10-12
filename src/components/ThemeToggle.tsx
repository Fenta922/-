import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  const label = isDark ? '切换到浅色模式' : '切换到深色模式'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className="rounded-full border border-line bg-card p-2 text-muted transition-all duration-300 ease-out hover:border-primary hover:text-primary"
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  )
}
