import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { profile } from '../data/profile'
import Reveal from './Reveal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = '请填写你的称呼'
  if (!values.email.trim()) errors.email = '请填写邮箱地址'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = '邮箱格式看起来不太对'
  if (!values.message.trim()) errors.message = '写点什么吧，一句"你好"也很好'
  return errors
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-soft ${
    hasError ? 'border-error' : 'border-line'
  }`

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const copyTimer = useRef<number | undefined>(undefined)

  /** 复制邮箱（clipboard 不可用时降级为 execCommand） */
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = profile.email
      ta.setAttribute('style', 'position:fixed;opacity:0')
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  function update(field: keyof FormState, value: string) {
    setForm(v => ({ ...v, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate(form)
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    setSending(true)
    // 演示：模拟发送，并不真正提交。
    // 接入真实服务时，把这里替换为 fetch('你的API')，或改为
    // window.location.href = `mailto:${profile.email}?subject=来自个人主页的留言`
    await new Promise(resolve => setTimeout(resolve, 700))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    window.setTimeout(() => setSent(false), 4500)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Contact</p>
        <h2 id="contact-title" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
          联系我
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          有想做的项目、想聊的话题，或者只是想打个招呼——邮箱永远向我敞开。
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* 左：邮箱 + 社交链接 */}
        <Reveal delay={80}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Mail size={17} aria-hidden="true" />
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="min-w-0 flex-1 truncate text-sm font-medium transition-colors duration-200 hover:text-primary"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? '邮箱地址已复制' : '复制邮箱地址'}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-200 ${
                  copied
                    ? 'border-primary bg-primary-soft text-primary'
                    : 'border-line text-muted hover:border-primary hover:text-primary'
                }`}
              >
                {copied ? (
                  <Check size={13} aria-hidden="true" />
                ) : (
                  <Copy size={13} aria-hidden="true" />
                )}
                {copied ? '已复制' : '复制'}
              </button>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {profile.socials.map(s => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-4 py-2 text-xs text-muted transition-all duration-200 hover:border-primary hover:text-primary"
                  >
                    {s.label} <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="pt-2 text-xs leading-relaxed text-muted">
              通常在 48 小时内回复。如果是工作机会，直接发邮件是最快的方式。
            </p>
          </div>
        </Reveal>

        {/* 右：留言表单 */}
        <Reveal delay={140}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-line bg-card p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-ink">
                  称呼
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="怎么称呼你"
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-medium text-ink"
                >
                  邮箱
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  placeholder="you@example.com"
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-medium text-ink"
              >
                留言
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={e => update('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                placeholder="想聊点什么？"
                className={`${inputClass(Boolean(errors.message))} resize-none`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-6 py-2.5 text-sm font-medium text-on-primary transition-all duration-300 ease-out hover:shadow-soft hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={14} aria-hidden="true" />
                {sending ? '发送中…' : '发送留言'}
              </button>
              <p
                role="status"
                className={`text-xs text-primary transition-opacity duration-300 ${
                  sent ? 'opacity-100' : 'opacity-0'
                }`}
              >
                已发送，谢谢你！我会在两天内回复。
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
