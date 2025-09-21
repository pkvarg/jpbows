import AboutMe from '../components/AboutMe'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import NewItemsSlider from '../components/NewItemsSlider'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Hero />
      <Intro />
      <NewItemsSlider />
      <AboutMe />
    </div>
  )
}
