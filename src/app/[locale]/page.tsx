import AboutMe from '../components/AboutMe'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Hero />
      <AboutMe />
    </div>
  )
}
