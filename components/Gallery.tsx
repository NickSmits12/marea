'use client'

import { useEffect, useRef } from 'react'

interface GalleryBlock {
  label: string
  bg: string
  className: string
}

const blocks: GalleryBlock[] = [
  {
    label: 'Vers',
    bg: 'linear-gradient(150deg, #2C1A0E 0%, #5C3A1A 45%, #8B5A2A 100%)',
    // tall on both mobile and desktop col 1
    className: 'col-span-1 row-span-2',
  },
  {
    label: 'Eerlijk',
    bg: 'linear-gradient(150deg, #1A2408 0%, #3A5C18 45%, #5C6B3A 100%)',
    className: 'col-span-1',
  },
  {
    label: 'Gezellig',
    bg: 'linear-gradient(150deg, #0A1628 0%, #1B3A5C 45%, #2E6B8A 100%)',
    // tall on desktop (col 3), not on mobile
    className: 'col-span-1 sm:row-span-2',
  },
  {
    label: 'Warm',
    bg: 'linear-gradient(150deg, #4A1800 0%, #8B3500 45%, #C45000 100%)',
    className: 'col-span-1',
  },
  {
    label: 'Puur',
    bg: 'linear-gradient(150deg, #1A1206 0%, #3D2810 45%, #6B4A26 100%)',
    // wide on desktop, full-width on mobile
    className: 'col-span-2 sm:col-span-2',
  },
  {
    label: 'Lokaal',
    bg: 'linear-gradient(150deg, #1A2408 0%, #2E4214 45%, #4A5C28 100%)',
    // full width on mobile to fill the row
    className: 'col-span-2 sm:col-span-1',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal') ?? []
    reveals.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="galerij" ref={sectionRef} className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-olive mb-4">
            Sfeer &amp; beleving
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl text-espresso font-bold max-w-xs leading-tight">
              Proef de stemming
            </h2>
            <p className="font-body text-espresso/50 text-sm max-w-sm leading-relaxed">
              Elke avond een andere sfeer — maar altijd die vertrouwde warmte
              die Marea tot thuis maakt.
            </p>
          </div>
        </div>

        {/* Asymmetric grid:
            mobile: 2 columns, 150px rows
            sm+:    3 columns, 200px rows (desktop: 240px)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-[150px] sm:auto-rows-[200px] lg:auto-rows-[240px]">
          {blocks.map((block, i) => (
            <div
              key={block.label}
              className={`gallery-item rounded-2xl overflow-hidden ${block.className} reveal`}
            >
              {/* Gradient background */}
              <div
                className="gallery-bg absolute inset-0 w-full h-full"
                style={{ backgroundImage: block.bg }}
              />

              {/* Subtle diagonal stripe texture */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(250,247,242,0.08) 40px, rgba(250,247,242,0.08) 80px)',
                }}
              />

              {/* Hover overlay */}
              <div className="gallery-overlay">
                <span className="font-display text-cream font-bold tracking-wide"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                >
                  {block.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="mt-14 flex items-center gap-6 reveal">
          <div className="flex-1 h-px bg-gradient-to-r from-olive/20 to-transparent" />
          <p className="font-body text-xs tracking-[0.35em] uppercase text-espresso/30 whitespace-nowrap">
            Kustweg 14 — Breda
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-olive/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
