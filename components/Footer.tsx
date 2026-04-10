'use client'

export default function Footer() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="bg-espresso text-cream">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1 — Logo + tagline */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl font-bold text-cream mb-4">Marea</h3>
            <p className="font-body text-cream/50 text-sm leading-relaxed mb-6 max-w-[200px]">
              Mediterraanse smaken, eerlijke ingrediënten, hart voor gastvrijheid.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-cream/40 hover:text-sienna transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-cream/40 hover:text-sienna transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="text-cream/40 hover:text-sienna transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.12 8.12 0 004.76 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-cream/30 mb-6">
              Navigatie
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Menu', href: '#menu' },
                { label: 'Galerij', href: '#galerij' },
                { label: 'Reserveren', href: '#reserveren' },
                { label: 'Contact', href: '#footer' },
                { label: 'Privé Dining', href: '#footer' },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleScroll(l.href)}
                    className="font-body text-sm text-cream/55 hover:text-sienna transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Opening hours */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-cream/30 mb-6">
              Openingstijden
            </p>
            <ul className="space-y-2.5">
              {[
                { day: 'Maandag', hours: 'Gesloten', closed: true },
                { day: 'Dinsdag – Vrijdag', hours: '17:00 – 22:00' },
                { day: 'Zaterdag – Zondag', hours: '12:00 – 22:00' },
              ].map((item) => (
                <li key={item.day} className="flex justify-between items-baseline gap-4">
                  <span className="font-body text-sm text-cream/50">{item.day}</span>
                  <span
                    className={`font-body text-sm flex-shrink-0 ${
                      item.closed ? 'text-cream/25' : 'text-cream/80'
                    }`}
                  >
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-cream/10">
              <p className="font-body text-xs text-cream/35 leading-relaxed">
                Op feestdagen gelden aangepaste tijden. Kijk voor actuele informatie op onze socials.
              </p>
            </div>
          </div>

          {/* Column 4 — Address + contact */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-cream/30 mb-6">
              Bezoek ons
            </p>

            <div className="flex gap-3 mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(250,247,242,0.4)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <address className="font-body text-sm text-cream/55 not-italic leading-relaxed">
                Kustweg 14<br />
                4818 AV Breda<br />
                Nederland
              </address>
            </div>

            <div className="flex gap-3 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(250,247,242,0.4)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
              </svg>
              <a href="tel:+31765123456" className="font-body text-sm text-cream/55 hover:text-sienna transition-colors">
                076 512 3456
              </a>
            </div>

            <div className="flex gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(250,247,242,0.4)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:info@marea-breda.nl" className="font-body text-sm text-cream/55 hover:text-sienna transition-colors">
                info@marea-breda.nl
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs text-cream/25">
          &copy; {new Date().getFullYear()} Marea Restaurant. Alle rechten voorbehouden.
        </p>
        <div className="flex gap-6">
          <a href="#" className="font-body text-xs text-cream/25 hover:text-cream/50 transition-colors">
            Privacybeleid
          </a>
          <a href="#" className="font-body text-xs text-cream/25 hover:text-cream/50 transition-colors">
            Algemene voorwaarden
          </a>
        </div>
      </div>
    </footer>
  )
}
