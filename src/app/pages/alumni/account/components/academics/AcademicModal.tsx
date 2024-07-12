import {useState, useEffect, ChangeEvent} from 'react'
import CreatableSelect from 'react-select/creatable'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import moment from 'moment'

import {ErrorMessage, Formik} from 'formik'
import * as Yup from 'yup'
import RangeSlider from './slider'

interface FormDataTypes {
  // Qualification: string
  qualification_type: string
  qualification: string
  area: string
  institute: string
  institute_address: string
  start_year: Date | string
  end_year: Date | string
  score: string
  score_unit: string
  status: string
  has_certificate: boolean
  certificate?: File | null
  certificate_link?: string
}

interface TargetModalProps {
  closeModal: () => void
  addUser: (newUser: any, crt: any) => void
  editUser: any
  heading: string
  setEditUser: (user: any) => void
  updateExistingUser: (user: any, crt?: any) => void
}

interface Option {
  qualification: string[]
  areas: string[]
  scoreType: string
  score: string | string[]
}

const AcademicModal: React.FC<TargetModalProps> = ({
  closeModal,
  addUser,
  editUser,
  heading,
  setEditUser,
  updateExistingUser,
}) => {
  const [formData, setFormData] = useState({...editUser})

  useEffect(() => {
    setFormData(editUser)
  }, [editUser])

  const [Qualific, setQualific] = useState('')
  const [score, setScore] = useState('')
  const gradeScale = ['A', 'B', 'C']
  const cgpaScale = ['2', '2.3', '2.7', '3', '3.3', '3.7', '4']

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  function getValidationSchema(heading: String) {
    return (schema: Yup.StringSchema<string, Yup.AnyObject, undefined, ''>) => {
      if (heading === 'Academic') {
        return schema.required('Title is required')
      } else {
        return schema
      }
    }
  }

  const validationSchema = (heading: string) =>
    Yup.object().shape({
      // Qualification: Yup.string().when('heading', (heading: any, schema: any) => {
      //   if (heading == 'Academic') {
      //     return schema.required('Qualification is required')
      //   } else {
      //     return schema.notRequired()
      //   }
      // }),

      area: Yup.string().optional().nullable(),
      // title: Yup.string().when('heading', (heading: any, schema: any) => {
      //   if (heading !== 'Academic') {
      //     return schema.required('Title is required')
      //   } else {
      //     return schema.notRequired()
      //   }
      // }),

      // title: Yup.string().required('Title is required'),

      // title: Yup.string().when('Qualification', (qualification: any, schema) => {
      //   return qualification !== 'Academic' ? schema.required('Title is required') : schema
      // }),
      // image: Yup.mixed().when('Qualification', (qualification: any, schema) => {
      //   return qualification !== 'Academic' ? schema.required('Image is required') : schema
      // }),
      institute: Yup.string().required('Institute is required'),
      institute_address: Yup.string().required('Location is required'),

      // score: Yup.string().when('ScoreMode', (scoreMode: any, schema) => {
      //   return scoreMode === 'Grades' ? schema.required('Score is required') : schema
      // }),
      status: Yup.string().optional().nullable(),
    })

  const initialValues: FormDataTypes = {
    ...editUser,
    qualification_type: '',
    qualification: Qualific || '',
    area: formData.area || '',
    institute: formData.institute || '',
    institute_address: formData.institute_address || '',
    start_year: formData.start_year || '',
    end_year: formData.end_year || '',
    score: formData.score || '',
    status: formData.status || '',
  }

  const GradingCriteria: Option[] = [
    {
      qualification: ['BS', 'MS'],

      areas: ['CS', 'DS', 'SE', 'AI', 'PY', 'EN', 'IR', 'Other'],

      scoreType: 'CGPA',

      score: score,
    },

    {
      qualification: ['BE'],

      areas: ['EE', 'ME', 'CE'],

      scoreType: 'CGPA',

      score: score,
    },

    {
      qualification: ['BBA'],

      areas: ['BBA'],

      scoreType: 'CGPA',

      score: score,
    },

    {
      qualification: ['MBA'],

      areas: [
        'Finance',
        'Accounting',
        'HR',
        'Management',
        'Marketing',
        'Entrepreneurship',
        'Other',
      ],

      scoreType: 'CGPA',

      score: score,
    },

    {
      qualification: ['O-level'],

      areas: ['Biology', 'Maths'],

      scoreType: 'Division',

      score: ['1st', '2nd', '3rd', '4th'],
    },

    {
      qualification: ['A-level'],

      areas: ['Pre-Engineering', 'Computer Science'],

      scoreType: 'Division',

      score: ['1st', '2nd', '3rd', '4th'],
    },

    {
      qualification: ['Matriculation'],

      areas: ['Biology', 'Maths'],

      scoreType: 'Grades',

      score: gradeScale,
    },

    {
      qualification: ['College'],

      areas: ['Pre-Engineering', 'Computer Science'],

      scoreType: 'Grades',

      score: gradeScale,
    },
  ]

  function getAnyOptions(x: string): string | string[] {
    // Get options based on academic selecion

    const findQualification = GradingCriteria.find((item) =>
      item.qualification.some((it) => {
        return it == Qualific
      })
    )

    if (findQualification) {
      return findQualification[x as keyof Option]
    }
    return []
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    score_type?: string | string[]
  ) => {
    const {name, value} = e.target
    console.log(name, value)

    if (score_type) {
      console.log(score_type)
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
        score_unit: score_type,
      }))
    } else {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleScore = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    score_type?: string | string[]
  ) => {
    const {name, value} = e.target
    setScore(value)
    if (score_type) {
      console.log(score_type)
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
        score_unit: score_type,
      }))
    } else {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      setSelectedFile(file)
      console.log(file)
      console.log(file.name)
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        has_certificate: true,
      }))
    } else {
      return
    }
  }

  const handleSubmit = (values: FormDataTypes) => {
    // e.preventDefault()

    if (editUser.id) {
      console.log(score, formData.score)
      let certificateObj = {
        certificate: selectedFile,
      }

      // Perform update operation with the formData for the existing user
      const updatedUser = {
        ...editUser,
        qualification: Qualific,
        qualification_type: formData.qualification_type,
        area: formData.area,
        institute: formData.institute,
        institute_address: formData.institute_address,
        start_year: formData.start_year,
        end_year: formData.end_year,
        score: score || formData.score,
        score_unit: formData.score_unit,
        status: formData.status,
        has_certificate: formData.has_certificate || false,
        certificate: formData.certificate || null,
        certificate_link: formData.certificate_link || '',
      }
      if (selectedFile == formData.certificate) {
        console.log('kjajs')
        certificateObj.certificate = null
        updatedUser.certificate = selectedFile

        console.log(certificateObj.certificate)
      }
      console.log(updatedUser)
      setEditUser(updatedUser)
      updateExistingUser(updatedUser, certificateObj)
      // Example: updateExistingUser(updatedUser);

      // Reset the editUser state
    } else {
      const certificateObj = {
        certificate: selectedFile || formData.certificate,
      }
      // Perform add operation with the formData for the new user
      const newUser = {
        qualification: Qualific,
        qualification_type: formData.qualification_type,
        area: formData.area,
        institute: formData.institute,
        institute_address: formData.institute_address,
        start_year: formData.start_year,
        end_year: formData.end_year,
        score: score || formData.score,
        score_unit: formData.score_unit,
        status: formData.status || 'In-Progress',
        has_certificate: formData.has_certificate || false,
        certificate: formData.certificate || null,
        certificate_link: formData.certificate_link || '',
      }
      console.log(newUser)
      addUser(newUser, certificateObj)
    }

    // Reset the form data and close the modal
    setFormData({
      qualification: '',
      qualification_type: '',
      area: '',
      institute: '',
      institute_address: '',
      start_year: '',
      end_year: '',
      score: '',
      score_unit: '',
      status: '',
      has_certificate: false,
      certificate: null,
      certificate_link: '',
    })
    closeModal()
  }

  useEffect(() => {
    const defaultQualific = editUser.qualification || ''
    const defaultArea = editUser.area || getAnyOptions('areas')[0] || ''
    const defaultScoreType = getAnyOptions('scoreType')[0] || ''
    // const defaultScore = score || editUser.score || '';
    // const defaultImage = editUser.image || null

    setQualific(defaultQualific)
    // setSelectedFile(defaultImage)
  }, [editUser])

  useEffect(() => {
    const defaultArea = getAnyOptions('areas')[0] || formData.area || ''
    const areaSelect = document.querySelector('#area') as HTMLSelectElement
    let selectedValue = areaSelect?.value
    console.log(selectedValue)
    if (Qualific != editUser.level) {
      selectedValue = defaultArea
    }
    console.log(selectedValue)

    console.log(defaultArea)
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      area: selectedValue,
    }))
  }, [Qualific])

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          {heading == 'Academic' ? (
            <Modal.Title>Add Academic Experience</Modal.Title>
          ) : (
            <Modal.Title>Add Certification Experience</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(heading)}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                {heading == 'Academic' ? (
                  <>
                    <Form.Group>
                      <Form.Label>Qualification</Form.Label>
                      <Form.Select
                        className='mb-2'
                        name='qualification'
                        key='qualification'
                        value={Qualific}
                        required={true}
                        onChange={(e) => {
                          setQualific(e.target.value)
                          formData.qualification_type = 'Degree'
                        }}
                      >
                        {GradingCriteria.map((x) =>
                          x.qualification.flat().map((x) => <option value={x}>{x}</option>)
                        )}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Area</Form.Label>
                      <Form.Select
                        name='area'
                        key='area'
                        id='area'
                        required={true}
                        value={formik.values.area}
                        onChange={(e) => {
                          handleChange(e)
                          formik.handleChange(e)
                        }}
                      >
                        {(getAnyOptions('areas') as string[]).map((x) => (
                          <option value={x}>{x}</option>
                        ))}
                      </Form.Select>
                      <ErrorMessage name='area' component='div' className='text-danger' />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Form.Group controlId='title'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type='text'
                        name='qualification'
                        key='qualification'
                        value={Qualific}
                        required={true}
                        onChange={(e) => {
                          setQualific(e.target.value)
                          formData.qualification_type = 'Certificate'
                        }}
                      />
                      <ErrorMessage name='qualification' component='div' className='text-danger' />
                    </Form.Group>
                  </>
                )}

                <Form.Group controlId='institute'>
                  <Form.Label>Institute</Form.Label>
                  <Form.Control
                    type='text'
                    name='institute'
                    value={formik.values.institute}
                    onChange={(e) => {
                      handleChange(e)
                      formik.handleChange(e)
                    }}
                  />
                  <ErrorMessage name='institute' component='div' className='text-danger' />
                </Form.Group>

                <Form.Group controlId='institute_address'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type='text'
                    name='institute_address'
                    value={formik.values.institute_address}
                    onChange={(e) => {
                      handleChange(e)
                      formik.handleChange(e)
                    }}
                  />
                  <ErrorMessage name='institute_address' component='div' className='text-danger' />
                </Form.Group>

                <Form.Group controlId='start_year' className='mb-3'>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type='date'
                    name='start_year'
                    value={formData.start_year}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value)
                      formik.setFieldValue('start_year', selectedDate)
                      // formData.start_year = selectedDate
                      console.log(formData.start_year)
                      handleChange(e)
                    }}
                  />
                  {/* <ErrorMessage name='start_year' component='div' className='text-danger' /> */}
                </Form.Group>

                <Form.Group controlId='end_year' className='mb-3'>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type='date'
                    name='end_year'
                    value={formData.end_year}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                  {/* <ErrorMessage name='end_year' component='div' className='text-danger' /> */}
                </Form.Group>

                {heading == 'Academic' ? (
                  <>
                    <Form.Group>
                      <Form.Label>Score</Form.Label>
                      <Form.Select name='ScoreMode' key='ScoreMode'>
                        <option value={getAnyOptions('scoreType')}>
                          {getAnyOptions('scoreType')}
                        </option>
                      </Form.Select>
                    </Form.Group>

                    {getAnyOptions('scoreType') === 'CGPA' ? (
                      <Form.Group>
                        <RangeSlider
                          name='score'
                          value={score}
                          onChange={(e) => {
                            handleScore(e, getAnyOptions('scoreType'))
                          }}
                        />
                      </Form.Group>
                    ) : (
                      <Form.Group>
                        <Form.Select
                          name='score'
                          key='score'
                          required={true}
                          value={formik.values.score}
                          onChange={(e) => {
                            handleChange(e, getAnyOptions('scoreType'))
                            formik.handleChange(e)
                          }}
                        >
                          {(getAnyOptions('score') as string[]).map((x) => (
                            <option value={x}>{x}</option>
                          ))}
                        </Form.Select>
                        <ErrorMessage name='score' component='div' className='text-danger' />
                      </Form.Group>
                    )}
                  </>
                ) : null}

                <Form.Group controlId='status'>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    className='form-select form-select-solid mb-2'
                    name='status'
                    value={formik.values.status}
                    onChange={(e) => {
                      handleChange(e)
                      formik.handleChange(e)
                    }}
                  >
                    <option value={'In-Process'}>In-Process</option>
                    <option value={'Completed'}>Completed</option>
                    <option value={'Planned'}>Planned</option>
                  </Form.Select>
                  <ErrorMessage name='status' component='div' className='text-danger' />
                </Form.Group>

                <Form.Group controlId='image' className='mb-3'>
                  <Form.Label>Attach Image</Form.Label>
                  <Form.Control
                    type='file'
                    name='image'
                    key='image'
                    onChange={(e: any) => {
                      handleFileChange(e)
                    }}
                    className='form-control-file'
                  />

                  {formData.certificate ? (
                    <span>{formData.certificate}</span>
                  ) : selectedFile ? (
                    <span>{selectedFile.name}</span>
                  ) : (
                    <span className='text-danger'>Please choose a file.</span>
                  )}
                </Form.Group>

                <div className=' text-center'>
                  <Button type='submit' className='btn btn-primary me-2 mt-2'>
                    {editUser.id ? 'Update User' : 'Add User'}
                  </Button>
                  <Button className='btn btn-secondary mt-2 ' onClick={closeModal}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export {AcademicModal}
