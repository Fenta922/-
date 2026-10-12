import { Code2, Palette, Sparkles, Sprout, Wrench, type LucideIcon } from 'lucide-react'
import { profile, type SkillGroup } from '../data/profile'
import Reveal from './Reveal'

const GROUP_ICONS: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code2,
  palette: Palette,
  wrench: Wrench,
  sparkles: Sparkles,
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Skills</p>
        <h2 id="skills-title" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
          技能
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          我更看重把合适的工具用在合适的地方，而不是追求最新的技术名词。
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {profile.skills.map((g, i) => {
          const Icon = GROUP_ICONS[g.icon]
          return (
            <Reveal key={g.group} delay={i * 80}>
              <div className="h-full rounded-2xl border border-line bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="font-medium">{g.group}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map(item => (
                    <li
                      key={item}
                      className="rounded-full bg-primary-soft px-2.5 py-1 text-xs text-primary-strong"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm text-muted">
          <Sprout size={15} aria-hidden="true" className="text-accent" />
          {profile.learning}
        </p>
      </Reveal>
    </section>
  )
}
