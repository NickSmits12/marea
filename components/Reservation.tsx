'use client'

import { useState } from 'react'

const MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
]

const DAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30',
]

// Slots unavailable (purely visual)
const UNAVAILABLE = ['17:00', '19:00', '20:30']

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // getDay: 0=Sun..6=Sat → convert to Mon-first
  const startOffset = (firstDay + 6) % 7
  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

interface StepIndicatorProps {
  step: number
}

function StepIndicator({ step }: StepIndicatorProps) {
  const steps = [
    { n: 1, label: 'Datum & tijd' },
    { n: 2, label: 'Gezelschap' },
    { n: 3, label: 'Bevestiging' },
  ]
  return (
    <div className="flex items-center gap-0 mb-12">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-semibold border-2 transition-all duration-300 ${
                step >= s.n
                  ? 'bg-olive border-olive text-cream'
                  : 'border-espresso/20 text-espresso/30'
              }`}
            >
              {step > s.n ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                s.n
              )}
            </div>
            <span
              className={`mt-2 font-body text-xs tracking-wider whitespace-nowrap hidden sm:block transition-colors duration-300 ${
                step >= s.n ? 'text-olive' : 'text-espresso/30'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-3 mb-5 sm:mb-0 transition-all duration-500 ${
                step > s.n ? 'bg-olive' : 'bg-espresso/15'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Reservation() {
  const now = new Date()
  const [step, setStep] = useState(1)
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [guests, setGuests] = useState(2)
  const [occasion, setOccasion] = useState('')
  const [requests, setRequests] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const calendar = buildCalendar(year, month)
  const today = now.getDate()
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear()

  const isPastDay = (day: number) => isCurrentMonth && day < today

  const prevMonth = () => {
    if (isCurrentMonth) return
    if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  const canGoStep2 = selectedDay !== null && selectedTime !== null
  const canGoStep3 = guests > 0

  if (confirmed) {
    return (
      <section id="reserveren" className="py-24 px-6 bg-cream">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-olive/15 flex items-center justify-center mx-auto mb-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#5C6B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-olive mb-4">Reservering ontvangen</p>
          <h2 className="font-display text-4xl font-bold text-espresso mb-4">Tot ziens bij Marea</h2>
          <p className="font-body text-espresso/60 text-base leading-relaxed mb-8">
            Uw reservering voor {guests} {guests === 1 ? 'persoon' : 'personen'} op{' '}
            {selectedDay} {MONTHS[month]} om {selectedTime} is in goede orde ontvangen.<br />
            U ontvangt spoedig een bevestiging per e-mail.
          </p>
          <button
            onClick={() => { setStep(1); setConfirmed(false); setSelectedDay(null); setSelectedTime(null); setGuests(2) }}
            className="font-body text-sm tracking-widest uppercase px-8 py-4 border border-olive text-olive hover:bg-olive hover:text-cream transition-all"
          >
            Nieuwe reservering
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="reserveren" className="py-24 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-olive mb-4">
            Reserveren
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-espresso font-bold max-w-sm leading-tight">
            Uw tafel reserveren
          </h2>
        </div>

        <StepIndicator step={step} />

        {/* ─── STEP 1: Date & Time ─────────────────────────── */}
        {step === 1 && (
          <div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-espresso/50 mb-5">
                  Kies een datum
                </p>
                {/* Month nav */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={prevMonth}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border border-espresso/15 transition-colors ${isCurrentMonth ? 'opacity-25 cursor-default' : 'hover:border-olive hover:text-olive'}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                  <p className="font-body text-sm font-medium text-espresso capitalize">
                    {MONTHS[month]} {year}
                  </p>
                  <button
                    onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-espresso/15 hover:border-olive hover:text-olive transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAYS.map((d) => (
                    <div key={d} className="text-center font-body text-[10px] tracking-wider uppercase text-espresso/35 py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendar.map((day, idx) => (
                    <div key={idx} className="aspect-square">
                      {day !== null ? (
                        <button
                          onClick={() => !isPastDay(day) && setSelectedDay(day)}
                          className={`cal-day w-full h-full rounded-lg font-body text-sm flex items-center justify-center transition-all ${
                            isPastDay(day)
                              ? 'disabled text-espresso/25 cursor-default'
                              : selectedDay === day
                              ? 'selected text-cream bg-olive'
                              : 'text-espresso hover:bg-olive/10 hover:text-olive cursor-pointer'
                          }`}
                        >
                          {day}
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-espresso/50 mb-5">
                  Kies een tijdstip
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const unavail = UNAVAILABLE.includes(slot)
                    return (
                      <button
                        key={slot}
                        disabled={unavail}
                        onClick={() => !unavail && setSelectedTime(slot)}
                        className={`time-slot font-body text-sm py-3 px-4 border rounded-lg transition-all ${
                          unavail
                            ? 'border-espresso/10 text-espresso/25 cursor-default bg-espresso/3'
                            : selectedTime === slot
                            ? 'selected bg-olive border-olive text-cream'
                            : 'border-espresso/20 text-espresso hover:border-olive hover:text-olive'
                        }`}
                      >
                        {slot}
                        {unavail && (
                          <span className="ml-1.5 text-[10px] text-espresso/25">vol</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={() => canGoStep2 && setStep(2)}
                className={`font-body text-sm tracking-widest uppercase px-8 py-4 transition-all ${
                  canGoStep2
                    ? 'bg-olive text-cream hover:bg-olive-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-olive/25'
                    : 'bg-espresso/10 text-espresso/30 cursor-default'
                }`}
              >
                Volgende stap
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Guests ──────────────────────────────── */}
        {step === 2 && (
          <div>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Guest count */}
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-espresso/50 mb-5">
                  Aantal personen
                </p>
                <div className="flex items-center gap-5 mb-8">
                  <button
                    onClick={() => setGuests(g => Math.max(1, g - 1))}
                    className="w-12 h-12 rounded-full border border-espresso/20 flex items-center justify-center hover:border-olive hover:text-olive transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <span className="font-display text-5xl font-bold text-espresso w-16 text-center">
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests(g => Math.min(12, g + 1))}
                    className="w-12 h-12 rounded-full border border-espresso/20 flex items-center justify-center hover:border-olive hover:text-olive transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <p className="font-body text-xs text-espresso/40 leading-relaxed">
                  Voor gezelschappen groter dan 12 personen kunt u contact opnemen via{' '}
                  <span className="text-olive">076 512 3456</span>
                </p>
              </div>

              {/* Occasion & requests */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-espresso/50 mb-3">
                    Bijzondere gelegenheid
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Verjaardag', 'Jubileum', 'Zakelijk diner', 'Overig'].map((o) => (
                      <button
                        key={o}
                        onClick={() => setOccasion(oc => oc === o ? '' : o)}
                        className={`font-body text-sm py-2.5 px-4 border rounded-lg text-left transition-all ${
                          occasion === o
                            ? 'border-olive text-olive bg-olive/8'
                            : 'border-espresso/15 text-espresso/60 hover:border-olive/40'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-espresso/50 mb-3">
                    Bijzondere wensen
                  </p>
                  <textarea
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="Allergieën, dieetwensen, voorkeur voor tafel..."
                    rows={4}
                    className="w-full font-body text-sm text-espresso border border-espresso/15 rounded-lg p-4 bg-transparent placeholder-espresso/30 focus:outline-none focus:border-olive resize-none transition-colors leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="font-body text-sm tracking-widest uppercase px-6 py-4 border border-espresso/20 text-espresso/60 hover:border-olive hover:text-olive transition-all"
              >
                Terug
              </button>
              <button
                onClick={() => canGoStep3 && setStep(3)}
                className="font-body text-sm tracking-widest uppercase px-8 py-4 bg-olive text-cream hover:bg-olive-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-olive/25 transition-all"
              >
                Overzicht
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Confirmation ────────────────────────── */}
        {step === 3 && (
          <div>
            <div className="bg-espresso rounded-2xl p-8 md:p-10 mb-8">
              <p className="font-body text-xs tracking-[0.35em] uppercase text-olive-muted mb-6">
                Overzicht reservering
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider text-cream/35 mb-1">
                      Datum
                    </p>
                    <p className="font-display text-cream text-xl font-medium">
                      {selectedDay} {MONTHS[month]} {year}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider text-cream/35 mb-1">
                      Tijdstip
                    </p>
                    <p className="font-display text-cream text-xl font-medium">
                      {selectedTime}
                    </p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider text-cream/35 mb-1">
                      Aantal personen
                    </p>
                    <p className="font-display text-cream text-xl font-medium">
                      {guests} {guests === 1 ? 'persoon' : 'personen'}
                    </p>
                  </div>
                  {occasion && (
                    <div>
                      <p className="font-body text-xs uppercase tracking-wider text-cream/35 mb-1">
                        Gelegenheid
                      </p>
                      <p className="font-display text-cream text-xl font-medium">{occasion}</p>
                    </div>
                  )}
                  {requests && (
                    <div>
                      <p className="font-body text-xs uppercase tracking-wider text-cream/35 mb-1">
                        Wensen
                      </p>
                      <p className="font-body text-cream/70 text-sm leading-relaxed">{requests}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-cream/10">
                <p className="font-body text-cream/45 text-xs leading-relaxed">
                  Door te bevestigen gaat u akkoord met ons reserveringsbeleid. Bij verhindering
                  verzoeken wij u uiterlijk 24 uur van tevoren te annuleren via{' '}
                  <span className="text-olive-muted">076 512 3456</span>.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="font-body text-sm tracking-widest uppercase px-6 py-4 border border-espresso/20 text-espresso/60 hover:border-olive hover:text-olive transition-all"
              >
                Terug
              </button>
              <button
                onClick={() => setConfirmed(true)}
                className="font-body text-sm tracking-widest uppercase px-10 py-4 bg-sienna text-cream hover:bg-sienna-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sienna/30 transition-all"
              >
                Reservering bevestigen
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
