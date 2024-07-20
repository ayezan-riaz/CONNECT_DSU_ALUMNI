import SurveyForm from './SurveyForm'
import logo from '../../../assets/logo.png'
import React, {useEffect, useState} from 'react'
import SurveyFilled from './components/SurveyFilled'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import axios from 'axios'

const localid = localStorage.getItem('sub')
interface SurveyResponse {
  survey: any // You can replace 'any' with the actual type of the 'survey' property
  // Add other properties if the response contains more data
}

function Survey() {
  const handleSubmit = (answers: Record<number, string>) => {
    console.log(answers)
  }

  const [filled, setFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getSurveyForm = async (userId: number) => {
    try {
      const response = await axios.get(`http://13.200.151.68:3000/api/users/${localid}/survey`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data: SurveyResponse = response.data
      if (data) {
        setIsLoading(false) // Assuming you have defined and set the 'isLoading' state elsewhere.
      }
      console.log(data, data.survey)
      if (data.survey) {
        setTimeout(() => setFilled(true), 100) // Assuming you have defined and set the 'setFilled' state elsewhere.
      } else {
        return
      }
    } catch (error) {
      console.error(error) // Handle any errors that occur during the request.
    }
  }

  useEffect(() => {
    getSurveyForm(4)
  }, [])

  return (
    <>
      {!filled && !isLoading ? (
        <>
          <div className='container'>
            <div style={{textAlign: 'center'}}>
              <img className='middle' alt='DHA Suffa University' src={logo} style={{padding: 10}} />
            </div>
            <br />
            <div className='wrapper text-center'>
              <h3>Welcome to Alumni Survey DSU</h3>
              <br />
              <br />
            </div>
            <SurveyForm onSubmit={handleSubmit} setFormFilled={setFilled} />
          </div>
        </>
      ) : !isLoading ? (
        <SurveyFilled />
      ) : (
        <>
          <LoadingScreen />
        </>
      )}
    </>
  )
}

export default Survey
