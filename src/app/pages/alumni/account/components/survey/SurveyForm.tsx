import React, { useEffect, useState } from 'react'
import RangeSlider from './RangeSlider'
import CreatableSelect from 'react-select/creatable'
import { number } from 'yup'
import axios from 'axios'

interface Option {
  id: number
  text: string
}

const localid=localStorage.getItem('sub');

interface Question {
  id: number | string
  text: string
  options: Option[]
  isCreatableSelect?: boolean
  isGradeTrue?: boolean
  isNumberTrue?: boolean
  isSelectableTrue?: boolean
}

interface SurveyFormProps {
  onSubmit: (answers: Record<number | string, string>) => void
  setFormFilled: (filled: boolean) => void
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit, setFormFilled }) => {

 

  const postSurveyForm = async (data: any, userId: number) => {
    try {
      const response = await axios.post(`https://amsbackend-ghub.onrender.com/survey/${localid}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data); // This will log the response data from the server.
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request.
    }
  };

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,

      text: 'Please rate the improvement of your main skill acquired through this university after completing four years of learning. Kindly provide your assessment of your domain skill level now(Management ,Engineering,Math,IR,Other) \nA-F with A being best and F being poor',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 2,
      text: 'Rate your improvement in soft skills after completing four years of learning at this university. Please provide your assessment of your soft skills upon graduating, as part of this formal survey. \nProblem Identification ',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 3,
      text: 'Ability to Evaluate and Analyze Data ',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 4,
      text: 'Research Skills',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 5,
      text: 'Ability to link theory to practice',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 6,
      text: 'Ability to design a system component or process',
      options: [],
      isGradeTrue: true,
    },

    {
      id: 7,
      text: 'IT knowledge/Computer Skills',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 8,
      text: 'Oral Communication',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 9,
      text: 'Report Writing',
      options: [],
      isGradeTrue: true,
    },

    {
      id: 10,
      text: 'Ability to work in teams',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 11,
      text: 'Ability to work in challenging situations',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 12,
      text: 'Independant Thinking',
      options: [],
      isGradeTrue: true,
    },

    {
      id: 13,
      text: 'Research Skills',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 14,
      text: 'Appreciation of Ethical Values',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 15,
      text: 'Resource and Time Management Skills',
      options: [],
      isGradeTrue: true,
    },

    {
      id: 16,
      text: 'Judgement',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 17,
      text: 'Discipline ',
      options: [],
      isGradeTrue: true,
    },

    {
      id: 18,
      text: 'Did the curriculum at DSU teach you the skills most relevant to your field of specialization in the job market?',
      options: [
        { id: 1, text: 'Yes' },
        { id: 2, text: 'No' },
      ],
    },
    {
      id: 19,
      text: 'Which of the following activities appeal to you as a n oppurtunity to stay connected to DSU',
      options: [
        { id: 1, text: 'Program/Major Reunions' },
        { id: 2, text: 'Annual Campus Events/Festivals' },
        { id: 3, text: 'E-Newsletter' },
        { id: 4, text: 'Regional Activites' },
        { id: 5, text: 'Class Reunions' },
        { id: 6, text: 'Other' },
      ],
      isSelectableTrue: true,
    },
    {
      id: 20,
      text: 'Are You Employed in the field of your DSU degree?If not why(Choose 1 response)',
      options: [
        { id: 1, text: 'Yes, I am employed in my major field' },
        { id: 2, text: 'No, I developed new Career interests' },
        { id: 3, text: 'No, I could not find a job in my major' },
        { id: 4, text: 'No, I am not presently employed out of choice' },
        { id: 5, text: 'No, I am not presently employed due to unavailability of suitable job' },
        { id: 6, text: 'No, The jobs in my field did not pay me well' },
      ],
      isSelectableTrue: true,
    },
    {
      id: 21,
      text: 'Your overall experience with this university',
      options: [
        { id: 1, text: 'Poor' },
        { id: 2, text: 'Fair' },
        { id: 3, text: 'Good' },
        { id: 4, text: 'Excellent' },
      ],
    },
    {
      id: 22,
      text: 'Please type the skills that you acquired from our university that helped you in your professional life.',
      options: [],
      isCreatableSelect: true,
    },

    {
      id: 23,
      text: 'Rate Infrastructure (A-F)',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 24,
      text: 'Rate Faculty (A-F)',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 25,
      text: 'Rate Academics (A-F)',
      options: [],
      isGradeTrue: true,
    },
    {
      id: 26,
      text: 'Your First Drawn Salary',
      options: [],
      isNumberTrue: true,
    },
    {
      id: 27,
      text: 'Your Last Drawn Salary',
      options: [],
      isNumberTrue: true,
    },
  ])

  const [answers, setAnswers] = useState<Record<number | string, string>>({})

  const [tagsArr, setTagsArr] = useState<string[]>([])

  const handleOptionChange = (questionId: number | string, selectedOption: string) => {
    console.log(selectedOption)

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      ['q' + questionId]: selectedOption,
    }))
  }

  const handleSelectChange = (questionId: number | string, selectedOption: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      ['q' + questionId]: selectedOption,
    }))
  }

  useEffect(() => {
    console.log(tagsArr)
  }, [tagsArr])

  const handleTagsChange = (questionId: number | string, selectedOptions: any | Object) => {
    const updatedTags = selectedOptions.map((option: any) => ({
      label: option.label,
      value: option.value,
    }))

    setTagsArr(updatedTags)

    const strTags = updatedTags.map((item: any) => item.value).join(',')
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      ['q' + questionId]: strTags,
    }))
  }

  const [grade, setGrade] = useState('')
  const [inp, setInp] = useState<number>()
  const handleGradeChange = (questionId: number | string, grade: string) => {
    // Handle the grade value in the parent component

    console.log(questionId, grade)

    setGrade(grade)
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      ['q' + questionId]: grade,
    }))
  }

  const handleInp = (questionId: number | string, value: number) => {
    // Handle the grade value in the parent component
    console.log(value, questionId)

    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      ['q' + questionId]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(answers, grade)
    const isAnswersNotEmpty = Object.keys(answers).length > 0

    const isRangeSliderValid = Object.values(answers).every(
      (value) => value != undefined && value != ''
    )
    if (
      isRangeSliderValid &&
      isAnswersNotEmpty &&
      Object.keys(answers).length === questions.length
    ) {
      onSubmit(answers)
    
      postSurveyForm(answers, 4)
      setTimeout(() => setFormFilled(true), 3000)
    } else {
      alert('Please select a value for all questions before submitting.')
    }
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <>
            <label className='d-flex align-items-center fs-6 fw-semibold mb-3'>
              <p className='required fs-5'>
                {' '}
                {question.id} : {question.text}
              </p>
            </label>
            {question.isCreatableSelect ? (
              <CreatableSelect
                name={`question-${question.id}`}
                value={tagsArr}
                isMulti
                className='mb-2'
                onChange={(arr) => handleTagsChange(question.id, arr)}
                placeholder='Input additional info if required'
                required
              />
            ) : question.isGradeTrue ? (
              <>
                <div className='container mt-4 mb-4'>
                  <div className='progress' style={{ height: '40px' }}>
                    <div
                      className='progress-bar bg-danger'
                      style={{
                        width: '20%',
                        backgroundColor: 'red',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      Poor
                    </div>
                    <div
                      className='progress-bar bg-warning'
                      style={{
                        width: '20%',
                        backgroundColor: '#ff8c00',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      Fair
                    </div>

                    <div
                      className='progress-bar bg-secondary'
                      style={{ width: '20%', fontWeight: 'bold', color: '#fff' }}
                    >
                      Average
                    </div>

                    <div
                      className='progress-bar bg-info'
                      style={{
                        width: '20%',
                        backgroundColor: 'orange',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      Good
                    </div>

                    <div
                      className='progress-bar bg-primary'
                      style={{
                        width: '20%',
                        backgroundColor: 'blue',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      Very Good
                    </div>

                    <div
                      className='progress-bar bg-success'
                      style={{ width: '20%', fontWeight: 'bold', color: '#fff' }}
                    >
                      Excellent
                    </div>
                  </div>
                </div>
                <RangeSlider
                  name='Rating'
                  value={grade}
                  onGradeChange={(updatedGrade) => handleGradeChange(question.id, updatedGrade)}
                />
              </>
            ) : question.isNumberTrue ? (
              <>
                <div className='text-center mb-5'>
                  <input
                    className='form-control form-control-flush'
                    type='number'
                    style={{ width: '300px' }}
                    value={inp}
                    placeholder='Enter figure here'
                    required
                    onBlur={(inp: any) => handleInp(question.id, inp.target.value)}
                  />
                </div>
              </>
            ) : question.isSelectableTrue ? (
              <>
                <div className='text-center mb-5'>
                  <select
                    className='form-select'
                    name='select'
                    id=''
                    onChange={(e) => {
                      handleSelectChange(question.id, e.target.value)
                    }}
                  >
                    {question.options.map((option) => (
                      <>
                        <option value={option.text}>{option.text}</option>
                      </>
                    ))}
                  </select>
                  <div className='text-center mt-2 mb-2'>
                    {!answers['q' + question.id] && (
                      <div className='text-danger fs-5'>Please select a value.</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div key={question.id} className='d-flex flex-row justify-content-evenly'>
                  {question.options.map((option) => (
                    <button
                      type='button'
                      className={`btn btn-light-primary mb-2 ${answers['q' + question.id] === option.text ? 'active' : ''
                        }`}
                      style={{ flex: `0 0 ${100 / question.options.length}%` }}
                      data-kt-modal-bidding='option'
                      onClick={() => handleOptionChange(question.id, option.text)}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                <div className='text-center mt-2 mb-2'>
                  {!answers['q' + question.id] && (
                    <div className='text-danger fs-5'>Please select a value.</div>
                  )}
                </div>
              </>
            )}
          </>
        ))}
        <div className='text-center mt-5'>
          <button type='submit' className='btn btn-primary mt-3 '>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default SurveyForm
