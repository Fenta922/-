import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section
      id="home"
      className="paper-grain relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* 柔光色斑（纯装饰） */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-140px] left-[-8%] h-[360px] w-[360px] rounded-full bg-accent-soft blur-3xl"
      />

      {/* 抽象自然图形：有机曲线与远山（纯装饰） */}
      <svg
        aria-hidden="true"
        viewBox="0 0 220 200"
        className="absolute right-8 top-28 hidden w-72 opacity-80 lg:block"
      >
        <path
          d="M48 124c-14-27 3-60 32-68 27-8 60 2 72 27 12 26-3 56-30 66-28 11-60 2-74-25Z"
          fill="var(--c-primary-soft)"
        />
        <path
          d="M42 148c30-10 62-8 92 6 22 10 44 12 62 4"
          stroke="var(--c-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M56 162c26-8 54-6 80 6 16 7 32 9 46 4"
          stroke="var(--c-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <circle cx="146" cy="84" r="5" fill="var(--c-accent)" opacity="0.7" />
        <circle cx="120" cy="62" r="3.5" fill="var(--c-primary)" opacity="0.55" />
      </svg>

      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs text-muted">
            <MapPin size={13} aria-hidden="true" /> {profile.city} · 目前有空接自由项目
          </p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            你好，我是
            <span className="text-primary">{profile.name}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {profile.role}。
            <br />
            {profile.slogan}
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-6 py-3 text-sm font-medium text-on-primary transition-all duration-300 ease-out hover:shadow-soft hover:opacity-90"
            >
              查看项目 <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-out hover:border-primary hover:text-primary"
            >
              <Mail size={16} aria-hidden="true" /> 联系我
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
