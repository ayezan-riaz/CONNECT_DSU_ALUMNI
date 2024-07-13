import React, {useRef, useState, useEffect} from 'react'
import './ourAlumni.css' // Ensure your CSS styles are correctly set up for dragging and transitions
import ayezan from '../../../alumni/assets/ayezan.jpg'
interface CardApp {
  imgSrc: string
  name: string
  role: string
}

const cardData: CardApp[] = [
  {imgSrc: ayezan, name: 'Blanche Pearson', role: 'Sales Manager'},
  {imgSrc: ayezan, name: 'Joenas Brauers', role: 'Web Developer'},
  {imgSrc: ayezan, name: 'Lariach French', role: 'Online Teacher'},
  {imgSrc: ayezan, name: 'James Khosravi', role: 'Freelancer'},
  {imgSrc: ayezan, name: 'Kristina Zasiadko', role: 'Bank Manager'},
  {imgSrc: ayezan, name: 'Donald Horton', role: 'App Designer'},
  // Add other cards similarly
]

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScrollLeft, setStartScrollLeft] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    const checkAutoPlay = () => {
      setIsAutoPlay(window.innerWidth > 800)
    }

    checkAutoPlay()
    window.addEventListener('resize', checkAutoPlay)

    return () => {
      window.removeEventListener('resize', checkAutoPlay)
    }
  }, [])

  useEffect(() => {
    const firstCardWidth = carouselRef.current?.firstElementChild?.clientWidth || 0
    const cardPerView = Math.round((carouselRef.current?.offsetWidth || 0) / firstCardWidth)

    // Your duplication logic for infinite scrolling

    const handleResize = () => {
      // Update any responsive logic here
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleArrowClick = (direction: 'left' | 'right') => {
    const firstCardWidth = carouselRef.current?.firstElementChild?.clientWidth || 0
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += direction === 'left' ? -firstCardWidth : firstCardWidth
    }
  }

  // Event handlers for drag
  const dragStart = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setStartScrollLeft(e.currentTarget.scrollLeft)
  }

  const dragging = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    carouselRef.current.scrollLeft = startScrollLeft - (e.pageX - startX)
  }

  const dragStop = () => {
    setIsDragging(false)
  }

  // AutoPlay and Infinite Scrolling Functions
  const autoPlay = () => {
    const firstCardWidth = carouselRef.current?.firstElementChild?.clientWidth || 0
    if (!isAutoPlay || window.innerWidth < 800) return
    timeoutIdRef.current = setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += firstCardWidth
      }
    }, 2500)
  }

  useEffect(() => {
    if (!wrapperRef.current?.matches(':hover')) {
      autoPlay()
    }
  }, [isAutoPlay])

  return (
    <div ref={wrapperRef} className='col-lg-12 col-md-12 col-sm-12 mt-15'>
      <div className='wrapper'>
        <i id='left' className='fa-solid fa-angle-left' onClick={() => handleArrowClick('left')} />
        <ul ref={carouselRef} className='carousel'>
          {cardData.map((card, index) => (
            <li className='card' key={index}>
              <div className='img'>
                <img src={card.imgSrc} alt='img' draggable='false' />
              </div>
              <h2>{card.name}</h2>
              <span>{card.role}</span>
            </li>
          ))}
        </ul>
        <i
          id='right'
          className='fa-solid fa-angle-right'
          onClick={() => handleArrowClick('right')}
        />
      </div>
    </div>
  )
}

export default Carousel
