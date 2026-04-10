'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

function useCountUp(target: number, suffix: string = '', decimals: number = 0) {
  const [display, setDisplay] = useState('0')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (started) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
          const duration = 1800
          const start = performance.now()
          const step = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const value = eased * target
            setDisplay(
              decimals > 0
                ? value.toFixed(decimals) + suffix
                : Math.floor(value).toString() + suffix
            )
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, suffix, decimals, started])

  return { display, ref }
}

interface StatBlockProps {
  value: number
  suffix?: string
  decimals?: number
  label: string
  sub?: string
  className?: string
  bg?: string
  accent?: string
  children?: ReactNode
}

function StatBlock({
  value,
  suffix = '',
  decimals = 0,
  label,
  sub,
  className = '',
  bg = 'bg-espresso',
  accent = 'text-sienna',
  children,
}: StatBlockProps) {
  const { display, ref } = useCountUp(value, suffix, decimals)

  return (
    <div
      ref={ref}
      className={`${bg} rounded-2xl p-8 flex flex-col justify-between ${className} reveal`}
    >
      {children}
      <div>
        <p className={`font-display text-5xl lg:text-6xl font-bold ${accent} leading-none mb-3`}>
          {display}
        </p>
        <p className="font-display text-cream/90 text-xl font-medium leading-tight">
          {label}
        </p>
        {sub && (
          <p className="font-body text-cream/45 text-sm mt-2 leading-snug">{sub}</p>
        )}
      </div>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const { display: yearDisplay, ref: yearRef } = useCountUp(2009)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal') ?? []
    reveals.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 80}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="mb-12 reveal">
        <p className="font-body text-xs tracking-[0.35em] uppercase text-olive mb-3">
          Wie wij zijn
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-espresso font-bold max-w-md leading-tight">
          Meer dan een maaltijd
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

        {/* ── Block 1 — Photo background (Unsplash), year counter ── */}
        <div
          ref={yearRef}
          className="col-span-2 lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-[420px] rounded-2xl overflow-hidden relative flex flex-col justify-between p-8 reveal bg-espresso"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark gradient overlay — strong at bottom for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(44,26,14,0.35) 0%, rgba(44,26,14,0.55) 50%, rgba(44,26,14,0.92) 100%)',
            }}
          />

          {/* Top badge */}
          <div className="relative z-10 mb-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-sienna/20 border border-sienna/35 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-sienna" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-sienna">
                Opgericht in Breda
              </span>
            </span>
          </div>

          {/* Year counter + label */}
          <div className="relative z-10">
            <p
              className="font-display font-bold text-sienna leading-none mb-3"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)' }}
            >
              {yearDisplay}
            </p>
            <p className="font-display text-cream/95 text-xl font-medium leading-tight mb-2">
              Jaar na jaar, tafel na tafel
            </p>
            <p className="font-body text-cream/50 text-sm leading-snug max-w-xs">
              Al meer dan vijftien jaar serveren we de eerlijkste smaken van de Middellandse Zee.
            </p>
          </div>
        </div>

        {/* ── Block 2 — Google rating ── */}
        <StatBlock
          value={4.9}
          decimals={1}
          label="op Google"
          sub="Meer dan 800 beoordelingen"
          className="col-span-1"
          bg="bg-olive-dark"
          accent="text-cream"
        >
          <div className="mb-auto flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FAF7F2" opacity="0.85">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </StatBlock>

        {/* ── Block 3 — Open days ── */}
        <StatBlock
          value={6}
          suffix=" dagen"
          label="per week open"
          sub="Di t/m zo — maandag gesloten"
          className="col-span-1"
          bg="bg-espresso-light"
          accent="text-olive-muted"
        >
          <div className="mb-auto">
            <div className="flex gap-1 flex-wrap">
              {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((d, i) => (
                <div
                  key={d}
                  className={`w-7 h-7 rounded-full text-[10px] flex items-center justify-center font-body font-medium ${
                    i === 0
                      ? 'bg-cream/8 text-cream/25'
                      : 'bg-sienna/20 text-sienna'
                  }`}
                >
                  {d[0]}
                </div>
              ))}
            </div>
          </div>
        </StatBlock>

        {/* ── Block 4 — Dagvers (sienna, full-width on both mobile and desktop) ── */}
        <div className="col-span-2 lg:col-span-2 reveal bg-sienna rounded-2xl p-8 flex flex-col justify-between min-h-[180px]">
          <div className="mb-auto">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mb-4 opacity-70">
              <path
                d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-11 7-.12.38-.19.77-.21 1.16a4 4 0 10-2.32 5.72 6.25 6.25 0 012.86-3"
                stroke="rgba(250,247,242,0.8)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="font-display text-5xl lg:text-6xl font-bold text-cream leading-none mb-2">
              Dagvers
            </p>
            <p className="font-display text-cream/90 text-lg font-medium">
              Elke ochtend ingekocht
            </p>
            <p className="font-body text-cream/60 text-sm mt-2 leading-snug max-w-xs">
              Onze chef haalt elke ochtend verse ingrediënten op bij lokale leveranciers en vishandelaren.
            </p>
          </div>
        </div>

        {/* ── Block 5 — Full width: Seating ── */}
        <div className="col-span-2 lg:col-span-4 reveal bg-cream border border-olive/15 rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-body text-xs tracking-[0.35em] uppercase text-olive mb-2">
              Sfeer &amp; Ruimte
            </p>
            <p className="font-display text-4xl font-bold text-espresso leading-none">
              Groot sfeervlak
            </p>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            {[
              { n: '80', label: 'couverts binnen' },
              { n: '40', label: 'couverts terras' },
              { n: '1', label: 'private dining zaal' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display text-3xl font-bold text-sienna">{item.n}</p>
                <p className="font-body text-sm text-espresso/55">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex gap-2 flex-shrink-0">
            {['Intiem', 'Gezellig', 'Sfeervol'].map((tag) => (
              <span
                key={tag}
                className="font-body text-xs tracking-wider uppercase px-4 py-2 border border-olive/30 text-olive rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
