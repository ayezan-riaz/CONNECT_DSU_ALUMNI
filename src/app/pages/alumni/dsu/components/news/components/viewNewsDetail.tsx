import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {News} from './newsTypes'

const ViewNewsDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [event, setEvent] = useState<News | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get<News>(`http://13.200.151.68:3000/api/news/${id}`)
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

  return (
    <div className='card' style={{borderRadius: '10px', overflow: 'hidden'}}>
      <div className='card-body'>
        <h1 className='card-title'>{event.name}</h1>
        <p className='card-text'>{event.description}</p>
      </div>
      <div className='card-footer container'>
        <div className='row'>
          <div className='col'>
            <img
              src={`http://13.200.151.68:3000/news/${event.news_image}`}
              alt='News'
              className='w-100 shadow-1-strong rounded mb-4'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewNewsDetail
