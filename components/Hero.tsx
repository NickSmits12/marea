'use client'

export default function Hero() {
  const scrollToMenu = () => {
    const el = document.querySelector('#menu')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToReservatie = () => {
    const el = document.querySelector('#reserveren')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-espresso"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Primary dark overlay — ensures readability */}
      <div className="absolute inset-0 bg-espresso/72" />

      {/* Warm tone gradient on top of photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(44,26,14,0.55) 0%, rgba(44,26,14,0.2) 50%, rgba(26,15,6,0.65) 100%)',
        }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(26,15,6,0.7) 100%)',
        }}
      />

      {/* Subtle olive glow accent */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(92,107,58,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Decorative vertical rule */}
      <div className="absolute top-36 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-cream/20 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-olive-muted mb-7 opacity-90">
          Mediterraans Restaurant — Breda
        </p>

        <h1 className="font-display text-cream leading-[0.9] mb-8">
          <span
            className="block text-[clamp(3.2rem,8.5vw,7.5rem)] font-bold"
            style={{ textShadow: '0 2px 30px rgba(44,26,14,0.8)' }}
          >
            Smaken van
          </span>
          <span
            className="block text-[clamp(3.2rem,8.5vw,7.5rem)] font-bold text-sienna"
            style={{ textShadow: '0 4px 50px rgba(224,123,57,0.45)' }}
          >
            de Middellandse
          </span>
          <span
            className="block text-[clamp(3.2rem,8.5vw,7.5rem)] font-bold text-cream/90"
            style={{ textShadow: '0 2px 30px rgba(44,26,14,0.8)' }}
          >
            Zee
          </span>
        </h1>

        <p className="font-body text-cream/65 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-light">
          Verse vis, seizoensgroenten en olijfolie van het beste dat de kust te
          bieden heeft — elke dag op tafel.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToReservatie}
            className="font-body text-sm tracking-widest uppercase px-8 py-4 bg-sienna text-cream hover:bg-sienna-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sienna/30"
          >
            Reserveer een Tafel
          </button>
          <button
            onClick={scrollToMenu}
            className="font-body text-sm tracking-widest uppercase px-8 py-4 border border-cream/40 text-cream hover:border-cream hover:bg-cream/10 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Bekijk het Menu
          </button>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-cream/20" />
        <span className="font-body text-xs tracking-[0.4em] uppercase text-cream/30">
          Sinds 2009
        </span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-cream/20" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-cream/25">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="text-cream/30"
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2.5" fill="currentColor" className="scroll-dot" />
        </svg>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>
    </section>
  )
}
