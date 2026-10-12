import About from './components/About'
import BackToTop from './components/BackToTop'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { navSections } from './data/profile'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useScrollSpy(navSections.map(s => s.id))

  return (
    <>
      {/* 键盘用户跳过导航 */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:shadow-soft"
      >
        跳到主要内容
      </a>

      <Navbar theme={theme} onToggleTheme={toggle} active={active} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
