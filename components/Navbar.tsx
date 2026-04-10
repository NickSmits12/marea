'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Galerij', href: '#galerij' },
  { label: 'Reserveren', href: '#reserveren' },
  { label: 'Over Ons', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled ? 'navbar-frosted' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-display text-2xl font-bold tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-espresso' : 'text-cream'
            }`}
          >
            Marea
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => handleLink(l.href)}
                  className={`font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                    scrolled
                      ? 'text-espresso/70 hover:text-olive'
                      : 'text-cream/80 hover:text-cream'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleLink('#reserveren')}
                className={`font-body text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm border transition-all duration-300 ${
                  scrolled
                    ? 'border-olive text-olive hover:bg-olive hover:text-cream'
                    : 'border-cream/60 text-cream hover:border-cream hover:bg-cream/10'
                }`}
              >
                Tafel Reserveren
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled ? 'bg-espresso' : 'bg-cream'
              } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled ? 'bg-espresso' : 'bg-cream'
              } ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled ? 'bg-espresso' : 'bg-cream'
              } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu panel */}
      <div
        className={`mobile-menu fixed top-20 left-0 right-0 z-40 bg-cream/97 backdrop-blur-md border-b border-olive/15 ${
          menuOpen ? 'open' : 'closed'
        }`}
      >
        <ul className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => handleLink(l.href)}
                className="font-body text-base tracking-widest uppercase text-espresso/70 hover:text-olive transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => handleLink('#reserveren')}
              className="w-full font-body text-sm tracking-widest uppercase px-5 py-3 border border-olive text-olive hover:bg-olive hover:text-cream transition-all"
            >
              Tafel Reserveren
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
