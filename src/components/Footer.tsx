import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col items-center gap-2.5 px-5 py-10 text-center sm:px-8">
        <p className="font-serif text-sm text-muted">{profile.signature}</p>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} · 用 React 与一杯热茶写成
        </p>
      </div>
    </footer>
  )
}
