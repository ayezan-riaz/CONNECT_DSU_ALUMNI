import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {News} from '../../../../pages/alumni/dsu/components/news/components/newsTypes'

const Imageurl = 'https://ams-backend-gkxg.onrender.com/news/'

const HomeNewsDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [event, setEvent] = useState<News | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get<News>(`https://ams-backend-gkxg.onrender.com/api/news/${id}`)
        .then((response) => {
          setEvent(response.data)
          console.log('response.data', response.data)
        })
        .catch((error) => {
          console.error('There was a problem fetching the event data:', error)
        })
    }
  }, [id])

  if (!event) {
    return <div>Loading...</div>
  }

  const renderImages = () => {
    debugger
    if (typeof event.news_image === 'string') {
      // If news_image is a single string, display it
      return (
        <div className='col-md-4'>
          <img src={`${Imageurl}${event.news_image}`} alt='News' className='img-fluid' />
        </div>
      )
    } else if (Array.isArray(event.news_image)) {
      // If news_image is an array, map through and display each image
      return event.news_image.map((image, index) => (
        <div key={index} className='col-md-4'>
          <img src={`${Imageurl}${image}`} alt={`News ${index + 1}`} className='img-fluid' />
        </div>
      ))
    }
    return null
  }

  return (
    <div className='container mt-20'>
      <div className='row'>
        <h1>{event.name}</h1>
        <p>{event.description}</p>
        <div className='row'>{renderImages()}</div>
      </div>
    </div>
  )
}

export default HomeNewsDetail
