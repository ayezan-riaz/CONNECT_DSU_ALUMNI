import React, {useEffect, useState} from 'react'
import axios from 'axios'
import eventBackground from '../../../../pages/alumni/assets/eventBackground.jpg'
import {News} from '../../../../pages/alumni/dsu/components/news/components/newsTypes' // Import the common Event type
import './homeNews.css'
import {Link} from 'react-router-dom'

const HomeNews: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const Imageurl = 'http://13.200.151.68:3000/api/news/'
  const fetchNews = () => {
    axios
      .get<News[]>('http://13.200.151.68:3000/api/news')
      .then((response) => {
        debugger
        setNews(response.data)
        console.log('News', response.data)
        console.log('News', response.data[0].news_image[0])
      })
      .catch((error) => {
        console.error('There was a problem fetching the events data:', error)
      })
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const truncateDescription = (description: string, length: number) => {
    if (description.length <= length) {
      return description
    }
    return description.slice(0, length) + '...'
  }

  return (
    <div className='container'>
      <div className='row mb-5'>
        <div className='col-12'>
          <div
            className='position-relative'
            style={{
              backgroundImage: `url(${eventBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '250px',
              borderRadius: '10px',
            }}
          >
            <div
              className='overlay-layer rounded bg-black'
              style={{
                opacity: '0.4',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '10px',
              }}
            />
            <div className='position-absolute text-white mb-8 ms-10 bottom-0'>
              <h3 className='text-white fs-2qx fw-bold mb-3'>DSU NEWS</h3>
              <div className='fs-5 fw-semibold'>
                You sit down. You stare at your screen. The cursor blinks.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        {news.map((newss) => (
          <div key={newss.id} className='col-md-4 mb-4'>
            <div className='card h-100 shadow-sm'>
              <Link to={`/alumni/dsu/newsDetail/${newss.id}`} className='d-block overlay mb-4'>
                <div
                  className='card-img-top'
                  style={{
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage:
                      newss.news_image.length > 0
                        ? `url(${Imageurl}${newss.news_image[0]})`
                        : 'url(/path/to/placeholder-image.jpg)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                />
              </Link>
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{newss.name}</h5>
                <p className='card-text'>{truncateDescription(newss.description, 100)}</p>
                <p className='card-text'>
                  <small className='text-muted'>{new Date(newss.date).toDateString()}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeNews
