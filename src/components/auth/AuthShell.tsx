import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/brand/Logo'

type Props = {
  image: string
  caption: string
  captionDetail?: string
  children: React.ReactNode
}

// Split auth layout: image on the left, form on the right from 1024px up (form stays first in the DOM for keyboard and screen-reader order).
// The brand gradient shows while the photo loads.
export default function AuthShell({ image, caption, captionDetail, children }: Props) {
  return (
    <div className="flex min-h-[100svh] bg-white lg:flex-row-reverse">
      <div className="flex w-full flex-col px-4 py-6 sm:px-8 lg:w-1/2 lg:px-12 xl:px-20">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex flex-1 items-start justify-center pb-10 pt-12 sm:pt-16 lg:items-center lg:py-10">
          <div className="w-full max-w-[440px]">{children}</div>
        </div>
        <p className="text-center text-xs text-ink-500 lg:text-left">
          <Link href="/privacy" className="hover:text-brand-600">Privacy</Link>
          <span aria-hidden="true" className="mx-2">·</span>
          <Link href="/terms" className="hover:text-brand-600">Terms</Link>
          <span aria-hidden="true" className="mx-2">·</span>
          <Link href="/contact" className="hover:text-brand-600">Help</Link>
        </p>
      </div>

      <div className="hidden p-4 lg:block lg:w-1/2">
        <div className="relative h-full min-h-[600px] overflow-hidden rounded-sheet bg-[radial-gradient(circle_at_75%_20%,rgba(201,151,26,.35),transparent_45%),linear-gradient(160deg,#0B5634_0%,#072E1D_60%,#041C12_100%)]">
          {/* Lazy by default, so the photo is never fetched on phones where this panel is hidden */}
          <Image src={image} alt="" fill sizes="50vw" quality={75} className="object-cover object-[center_75%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,28,18,.82)_0%,rgba(4,28,18,.35)_32%,transparent_55%)]" />
          <div className="absolute inset-x-0 top-0 p-10 xl:p-12">
            <p className="max-w-md font-display text-2xl font-bold leading-snug text-white xl:text-3xl">{caption}</p>
            {captionDetail && <p className="mt-3 max-w-md text-[15px] leading-6 text-white/80">{captionDetail}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
