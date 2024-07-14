import React, { useRef, useState, useEffect } from 'react'
import './ourAlumni.css' // Ensure your CSS styles are correctly set up for dragging and transitions
import axios from 'axios'

interface CardApp {
  imgSrc: string
  name: string
  role: string
}

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScrollLeft, setStartScrollLeft] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)
  const [cardData, setCardData] = useState<CardApp[]>([])

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
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://ams-backend-gkxg.onrender.com/api/users')
        const filteredUsers = response.data.filter((user: any) => user.role === 2)
        const formattedUsers = filteredUsers.map((user: any) => ({
          imgSrc: `https://ams-backend-gkxg.onrender.com/alumni/${user.avatar || 'default-avatar.png'}`,
          name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
          role: user.role === 2 ? 'User' : 'Admin' // Adjust role text as needed
        }))
        setCardData(formattedUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const firstCardWidth = carouselRef.current?.firstElementChild?.clientWidth || 0
    const cardPerView = Math.round((carouselRef.current?.offsetWidth || 0) / firstCardWidth)

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
        <ul
          ref={carouselRef}
          className='carousel'
          onMouseDown={dragStart}
          onMouseMove={dragging}
          onMouseUp={dragStop}
          onMouseLeave={dragStop}
        >
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
