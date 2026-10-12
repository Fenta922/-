import { profile } from '../data/profile'
import Reveal from './Reveal'

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">About</p>
        <h2 id="about-title" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
          关于我
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="space-y-5 lg:col-span-3">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="leading-loose text-muted">{para}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="lg:col-span-2">
          <div className="h-full rounded-2xl border border-line bg-card p-6 sm:p-7">
            <h3 className="text-sm font-medium text-ink">平常在做的事</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.aboutTags.map(tag => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              除了写代码，我也相信散步、睡觉和好好吃饭是生产力的一部分。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
