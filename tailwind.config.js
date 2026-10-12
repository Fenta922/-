/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        content: '1120px',
      },
      colors: {
        // 颜色值定义在 src/styles/index.css 的 CSS 变量里，浅/深色自动切换
        bg: 'var(--c-bg)',
        card: 'var(--c-card)',
        ink: 'var(--c-ink)',
        muted: 'var(--c-muted)',
        primary: 'var(--c-primary)',
        'primary-soft': 'var(--c-primary-soft)',
        'primary-strong': 'var(--c-primary-strong)',
        'on-primary': 'var(--c-on-primary)',
        accent: 'var(--c-accent)',
        'accent-soft': 'var(--c-accent-soft)',
        line: 'var(--c-line)',
        nav: 'var(--c-nav)',
        overlay: 'var(--c-overlay)',
        error: 'var(--c-error)',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(38, 51, 44, 0.07)',
        lift: '0 14px 34px rgba(38, 51, 44, 0.12)',
      },
      fontFamily: {
        serif: ['Georgia', 'Songti SC', 'STSong', 'Noto Serif SC', 'SimSun', 'serif'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
