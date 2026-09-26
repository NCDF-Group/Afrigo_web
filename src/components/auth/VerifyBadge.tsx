import Icon from '@/components/ui/Icon'

function Envelope({ check = false }: { check?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="envelope-float h-11 w-11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="38" height="27" rx="5" />
      <path d="m6 14 18 12 18-12" />
      {check && (
        <g>
          <circle cx="36" cy="35" r="9" className="fill-accent-500 stroke-surface" strokeWidth="3" />
          <path d="m32 35 3 3 5-6" className="draw-check stroke-brand-950" strokeWidth="2.6" />
        </g>
      )}
    </svg>
  )
}

export function WaitingBadge() {
  return (
    <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-50 text-brand-600 dark:text-accent-400">
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-brand-100 opacity-40 [animation-duration:2.4s]" />
      <span className="relative"><Envelope /></span>
    </div>
  )
}

export function VerifyingBadge() {
  return (
    <div className="relative mx-auto h-28 w-28">
      <span aria-hidden="true" className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgb(124_176_65)_120deg,transparent_240deg)] [animation-duration:1.3s]" />
      <span aria-hidden="true" className="absolute inset-[5px] rounded-full bg-surface" />
      <span className="absolute inset-[9px] grid place-items-center rounded-full bg-brand-50 text-brand-600 dark:text-accent-400">
        <Envelope check />
      </span>
    </div>
  )
}

export function SuccessBadge() {
  return (
    <div className="relative mx-auto grid h-28 w-28 place-items-center">
      <span aria-hidden="true" className="ring-burst absolute inset-0 rounded-full bg-success/30" />
      <span className="pop-in relative grid h-24 w-24 place-items-center rounded-full bg-success text-white shadow-lg dark:text-brand-950">
        <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" className="draw-check" />
        </svg>
      </span>
    </div>
  )
}

export function FailedBadge() {
  return (
    <div className="pop-in mx-auto grid h-24 w-24 place-items-center rounded-full bg-danger-soft text-danger">
      <Icon name="mail" className="h-10 w-10" />
    </div>
  )
}

export function LoadingDots() {
  return (
    <span aria-hidden="true" className="ml-0.5 inline-flex gap-0.5">
      <span className="dot-bounce">.</span>
      <span className="dot-bounce [animation-delay:.15s]">.</span>
      <span className="dot-bounce [animation-delay:.3s]">.</span>
    </span>
  )
}
