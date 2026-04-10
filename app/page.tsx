import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Menu from '@/components/Menu'
import Gallery from '@/components/Gallery'
import Reservation from '@/components/Reservation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Menu />
      <Gallery />
      <Reservation />
      <Footer />
    </main>
  )
}
