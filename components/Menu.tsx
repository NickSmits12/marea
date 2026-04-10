'use client'

import { useState, useEffect, useRef } from 'react'

interface Dish {
  name: string
  desc: string
  ingredients: string[]
  price: number
  photo: string
}

const menu: Record<string, Dish[]> = {
  Voorgerechten: [
    {
      name: 'Octopussalade',
      desc: 'Gegrilld op houtskool, afgemaakt met kappertjes en citroenvinaigrette',
      ingredients: ['Octopus', 'Kappertjes', 'Olijven', 'Citroen', 'Peterselie'],
      price: 18,
      photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    },
    {
      name: 'Burrata',
      desc: 'Verse burrata met zongedroogde tomaten, basilicumolie en krokante grissini',
      ingredients: ['Burrata', 'Tomaat', 'Basilicum', 'Grissini', 'Olijfolie'],
      price: 14,
      photo: 'https://images.unsplash.com/photo-1551183053-bf91798d9738?w=800&q=80',
    },
    {
      name: 'Garnalenkroketten',
      desc: 'Huisgemaakte kroketten gevuld met Noord-Zeegarnalen, geserveerd met tzatziki',
      ingredients: ['Garnalen', 'Tzatziki', 'Knoflook', 'Citroen', 'Dille'],
      price: 12,
      photo: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=800&q=80',
    },
    {
      name: 'Gegrilde Paprika',
      desc: 'Antipasto van seizoensgroenten met groene pesto, feta en pistache',
      ingredients: ['Paprika', 'Courgette', 'Feta', 'Pesto', 'Pistache'],
      price: 11,
      photo: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800&q=80',
    },
  ],
  Hoofdgerechten: [
    {
      name: 'Lamsrack',
      desc: 'Gekruide lamsrack uit de Provence, met auberginepuree en granaatappeljus',
      ingredients: ['Lamsvlees', 'Rozemarijn', 'Aubergine', 'Granaatappel', 'Lavendel'],
      price: 34,
      photo: 'https://images.unsplash.com/photo-1544025162-d76538b7e9e9?w=800&q=80',
    },
    {
      name: 'Gegrilde Zeebaars',
      desc: 'Hele verse zeebaars van de dag, langzaam geroosterd met tijm en kappertjesjus',
      ingredients: ['Zeebaars', 'Tijm', 'Kappertjes', 'Citroen', 'Aardappelen'],
      price: 28,
      photo: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
    },
    {
      name: 'Kabeljauw',
      desc: 'In de oven gebakken kabeljauw met saffraan-beurre blanc, geroosterde seizoensgroenten',
      ingredients: ['Kabeljauw', 'Saffraan', 'Groenten', 'Beurre blanc', 'Kappertjes'],
      price: 24,
      photo: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80',
    },
    {
      name: 'Risotto ai Frutti',
      desc: 'Romige safraan-risotto met verse zeevruchten, witte wijn en grana padano',
      ingredients: ['Risottorijst', 'Garnalen', 'Mosselen', 'Saffraan', 'Witte wijn'],
      price: 26,
      photo: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    },
  ],
  Desserts: [
    {
      name: 'Citroensorbet',
      desc: 'Handgemaakt in de keuken, met limoncello, verse munt en amandelkoekje',
      ingredients: ['Citroen', 'Limoncello', 'Munt', 'Amandel'],
      price: 8,
      photo: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&q=80',
    },
    {
      name: 'Tiramisu',
      desc: 'Huisgemaakte tiramisu met Siciliaanse marsala, mascarpone en espresso van de dag',
      ingredients: ['Mascarpone', 'Marsala', 'Espresso', 'Bitterkoekjes', 'Cacao'],
      price: 9,
      photo: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    },
    {
      name: 'Panna Cotta',
      desc: 'Klassieke vanille-panna cotta met vijgenconfiture, walnoten en oranjebloesemsiroop',
      ingredients: ['Vanille', 'Vijgen', 'Walnoten', 'Sinaasappel'],
      price: 9,
      photo: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    },
    {
      name: 'Baklava',
      desc: 'Traditioneel recept met filodeeg, verse honing, rozenwater en pistache',
      ingredients: ['Filodeeg', 'Honing', 'Pistache', 'Rozenwater'],
      price: 9,
      photo: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80',
    },
  ],
}

const tabs = Object.keys(menu)

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden h-80 skeleton" />
  )
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="group rounded-2xl overflow-hidden relative h-80 cursor-default shadow-md hover:shadow-2xl hover:shadow-espresso/50 transition-shadow duration-500">
      {/* Photo — zooms on hover */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 bg-espresso"
        style={{
          backgroundImage: `url("${dish.photo}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay — readable at all image brightness levels */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(26,15,6,0.15) 0%, rgba(26,15,6,0.35) 40%, rgba(26,15,6,0.88) 75%, rgba(26,15,6,0.97) 100%)',
        }}
      />

      {/* Price badge — top right */}
      <div className="absolute top-5 right-5 z-10">
        <span className="font-body text-xs font-semibold text-cream/90 tracking-wider bg-espresso/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-cream/10">
          &euro; {dish.price}
        </span>
      </div>

      {/* Content — pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3
          className="font-display text-cream font-bold leading-none mb-2 transition-transform duration-500 group-hover:-translate-y-1"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          {dish.name}
        </h3>
        <p className="font-body text-cream/60 text-sm leading-snug mb-4 line-clamp-2">
          {dish.desc}
        </p>

        {/* Ingredient tags */}
        <div className="flex flex-wrap gap-1.5">
          {dish.ingredients.map((ing) => (
            <span
              key={ing}
              className="ingredient-tag bg-espresso/55 text-cream/80 border border-cream/15 backdrop-blur-sm"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState(tabs[0])
  const [loading, setLoading] = useState(false)
  const [displayed, setDisplayed] = useState(tabs[0])
  const sectionRef = useRef<HTMLElement>(null)

  const switchTab = (tab: string) => {
    if (tab === active) return
    setLoading(true)
    setTimeout(() => {
      setDisplayed(tab)
      setActive(tab)
      setLoading(false)
    }, 900)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal') ?? []
    reveals.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 80}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="menu" ref={sectionRef} className="py-24 px-6 bg-espresso">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-14 reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-olive-muted mb-4">
            Onze kaart
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl text-cream font-bold max-w-sm leading-tight">
              Wat de zee geeft, zetten wij op tafel
            </h2>
            <p className="font-body text-cream/45 text-sm max-w-xs leading-relaxed">
              Elk gerecht vertelt een verhaal — van de markt naar uw bord,
              met respect voor seizoen en herkomst.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-5 sm:gap-8 mb-12 border-b border-cream/10 reveal overflow-x-auto pb-px scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`tab-btn font-body text-xs sm:text-sm tracking-widest uppercase pb-4 transition-colors duration-300 whitespace-nowrap flex-shrink-0 ${
                active === tab ? 'text-sienna active' : 'text-cream/45 hover:text-cream/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : menu[displayed].map((dish, i) => (
                <div
                  key={dish.name}
                  className="card-appear"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <DishCard dish={dish} />
                </div>
              ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-10 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-6 reveal">
          <p className="font-body text-cream/45 text-sm text-center md:text-left">
            De volledige menukaart is ook beschikbaar bij het restaurant.
            <br className="hidden md:block" /> Seizoenswijzigingen voorbehouden.
          </p>
          <button
            onClick={() => {
              const el = document.querySelector('#reserveren')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="font-body text-sm tracking-widest uppercase px-8 py-4 bg-sienna text-cream hover:bg-sienna-light transition-all duration-300 flex-shrink-0 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sienna/30"
          >
            Reserveer nu
          </button>
        </div>
      </div>
    </section>
  )
}
