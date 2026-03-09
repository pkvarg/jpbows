import Hero from '../components/Hero'
import Intro from '../components/Intro'
import NewItemsSlider from '../components/NewItemsSlider'

export default function Home() {
  return (
    <div className="bg-[#0f0b06]">
      <Hero />
      <Intro />
      <NewItemsSlider />
    </div>
  )
}
