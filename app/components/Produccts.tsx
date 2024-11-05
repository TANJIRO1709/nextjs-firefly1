'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  image: string
  title: string
  subtitle?: string
  cta: string
}

interface SliderProps {
  slides: Slide[]
  autoSlideInterval?: number
}

const Slider: React.FC<SliderProps> = ({ slides, autoSlideInterval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, autoSlideInterval)
    return () => clearInterval(timer)
  }, [nextSlide, autoSlideInterval])

  return (
    <div className="relative overflow-hidden rounded-lg bg-white w-full h-full">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <SlideItem key={index} slide={slide} isFirst={index === 0} />
        ))}
      </div>

      <SliderButton direction="left" onClick={prevSlide} />
      <SliderButton direction="right" onClick={nextSlide} />
    </div>
  )
}

const SlideItem: React.FC<{ slide: Slide; isFirst: boolean }> = ({ slide, isFirst }) => (
  <div className="w-full flex-shrink-0 relative h-full">
    <Image
      src={slide.image}
      alt={slide.title}
      fill
      className="object-cover"
      priority={isFirst}
    />
    <div className="absolute inset-0 flex flex-col items-start justify-center p-6 bg-gradient-to-r from-black/20">
      <h2 className="text-lg md:text-2xl font-bold text-white mb-2">{slide.title}</h2>
      {slide.subtitle && <p className="text-sm md:text-lg text-white mb-4">{slide.subtitle}</p>}
      <button className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors text-xs md:text-sm">
        {slide.cta}
      </button>
    </div>
  </div>
)

const SliderButton: React.FC<{ direction: 'left' | 'right'; onClick: () => void }> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors ${direction === 'left' ? 'left-2' : 'right-2'}`}
    aria-label={`${direction === 'left' ? 'Previous' : 'Next'} slide`}
  >
    {direction === 'left' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </button>
)

export default function Products() {
  const slides: Slide[] = [
    {
      image: 'https://plchldr.co/i/500x250?bg=111111',
      title: 'FullHouse Fiesta',
      subtitle: 'up to 70% off',
      cta: 'SHOP NOW'
    },
    {
      image: 'https://res.cloudinary.com/dk6m1qejk/image/upload/v1730746586/firefly/pbmx2su3vlxkyrhdbd1g.png',
      title: 'Catch the Sunset in comfort!',
      subtitle: '',
      cta: 'SHOP NOW'
    },
    {
      image: 'https://res.cloudinary.com/dk6m1qejk/image/upload/v1730747105/firefly/ami9detwditcq5ozmwqp.png',
      title: 'Catch the Sunset in comfort!',
      subtitle: '',
      cta: 'SHOP NOW'
    },

  ]

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-4 h-screen md:h-[50vh]">
          {/* Video Component */}
          <div className="bg-white p-6 rounded-lg md:row-span-2 h-full md:h-full">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              className="w-full h-full rounded-lg"
            />
          </div>

          {/* Top Image */}
          <div className="relative overflow-hidden rounded-lg bg-white w-full h-full">
            <Image
              src="https://res.cloudinary.com/dk6m1qejk/image/upload/v1730746586/firefly/pbmx2su3vlxkyrhdbd1g.png"
              alt="Sunny Image"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-6 bg-gradient-to-r from-black/20">
              <h2 className="text-lg md:text-2xl font-bold text-white mb-2">Catch the Sunset in comfort!</h2>
              <button className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors text-xs md:text-sm">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Bottom Slider */}
          <Slider slides={slides} autoSlideInterval={5000} />
        </div>
      </div>
    </div>
  )
}
