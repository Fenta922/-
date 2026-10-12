import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Leaf,
  MessageCircle,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { profile, type Project } from '../data/profile'
import Reveal from './Reveal'

const PROJECT_ICONS: Record<Project['icon'], LucideIcon> = {
  leaf: Leaf,
  book: BookOpen,
  chat: MessageCircle,
  camera: Camera,
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openProject = profile.projects.find(p => p.id === openId) ?? null
  const OpenIcon = openProject ? PROJECT_ICONS[openProject.icon] : null

  // 弹窗打开时：锁定背景滚动、支持 Esc 关闭、焦点移到关闭按钮
  useEffect(() => {
    if (!openProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openProject])

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Projects</p>
        <h2 id="projects-title" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
          项目
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          一些我认真做过、并且仍然在意的东西。点击卡片可以看更完整的介绍。
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {profile.projects.map((p, i) => {
          const Icon = PROJECT_ICONS[p.icon]
          return (
            <Reveal key={p.id} delay={(i % 2) * 90}>
              <article
                onClick={() => setOpenId(p.id)}
                className="group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-7"
              >
                <div className="mb-5 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      aria-label={`${p.name} 源码（新窗口打开）`}
                      className="text-muted transition-colors duration-200 hover:text-primary"
                    >
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <h3 className="font-serif text-lg font-semibold">
                  <button
                    type="button"
                    onClick={() => setOpenId(p.id)}
                    className="text-left transition-colors duration-200 hover:text-primary"
                  >
                    {p.name}
                  </button>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.tagline}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <li
                      key={t}
                      className="rounded-full bg-primary-soft px-2.5 py-1 text-xs text-primary-strong"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenId(p.id)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-opacity duration-200 hover:opacity-75"
                  >
                    了解详情 <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-xs text-muted transition-colors duration-200 hover:text-primary"
                    >
                      在线访问 →
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* 项目详情弹窗 */}
      {openProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
        >
          <div
            className="absolute inset-0 bg-overlay"
            onClick={() => setOpenId(null)}
            aria-hidden="true"
          />
          <div className="animate-modal relative w-full max-w-lg rounded-2xl border border-line bg-card p-6 shadow-lift sm:p-8">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="关闭项目详情"
              className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors duration-200 hover:bg-primary-soft hover:text-primary"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {OpenIcon && (
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <OpenIcon size={20} aria-hidden="true" />
              </span>
            )}
            <h3 id="project-dialog-title" className="pr-8 font-serif text-2xl font-semibold">
              {openProject.name}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{openProject.description}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {openProject.tags.map(t => (
                <li
                  key={t}
                  className="rounded-full bg-primary-soft px-2.5 py-1 text-xs text-primary-strong"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              {openProject.link && (
                <a
                  href={openProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-strong px-5 py-2.5 text-sm font-medium text-on-primary transition-opacity duration-200 hover:opacity-90"
                >
                  访问项目 <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {openProject.repo && (
                <a
                  href={openProject.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  查看源码
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
