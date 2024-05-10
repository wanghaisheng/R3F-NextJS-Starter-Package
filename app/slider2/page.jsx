import EmblaCarousel from '@/components/Slider2/EmblaCarousel'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Slider2 = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </>
)

export default Slider2
