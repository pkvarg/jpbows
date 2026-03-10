import Hero from '../components/Hero'
import Intro from '../components/Intro'
import NewItemsSlider from '../components/NewItemsSlider'

export default function Home() {
  return (
    <div className="bg-[#faf8f5]">
      <Hero />
      <Intro />
      <NewItemsSlider />
    </div>
  )
}
