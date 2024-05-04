import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import CreatableSelect from 'react-select/creatable'
import {ActionMeta} from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'

import {ErrorMessage, Formik} from 'formik'
import * as Yup from 'yup'

type OptionType = {
  label: string
  value: string
}

interface Option {
  category: string[]
  sub_category: string[]
}
interface YourFormValuesType {
  category: string
  sub_category: string | string[]
  tags: string[] | string
  level: number
  has_certificate: boolean | string
  certificate: File | null | string | Blob | MediaSource
  certificate_link: string
  // Add more sub_categorys as needed
}

// enum Certification {
//   Yes = 'Yes',
//   No = 'No',
// }

interface TargetModalProps {
  closeModal: () => void
  addUser: (newUser: any, crt: any) => void
  editUser: any
  setEditUser: (user: any) => void
  updateExistingUser: (user: any, crt?: any) => void
}

const SkillsModal: React.FC<TargetModalProps> = ({
  closeModal,
  addUser,
  editUser,
  setEditUser,
  updateExistingUser,
}) => {
  const [formData, setFormData] = useState({...editUser})

  const [haveFile, setHaveFile] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [Category, setCategory] = useState('Management')

  const [tagsArr, setTagsArr] = useState<{label: string; value: string}[]>([])

  const validationSchema = Yup.object().shape({
    category: Yup.string().required('Skill category is required'),
    sub_category: Yup.string().optional().nullable(),
    level: Yup.number()
      .typeError('Proficiency level must be a number')
      .required('Proficiency level is required')
      .min(0, 'Proficiency level must be at least 0')
      .max(100, 'Proficiency level cannot exceed 100'),
    // has_certificate: Yup.mixed().required('Has certificate is required'),
    // image: Yup.mixed().when('has_certificate', (has_certificate: any, schema) => {
    //   return has_certificate === Certification.Yes
    //     ? schema.required('Image is required')
    //     : schema.nullable()
    // }),
  })

  const initialValues: YourFormValuesType = {
    ...editUser,
    category: Category || '',
    sub_category: formData.sub_category || '',
    tags: tagsArr || [],
    level: formData.level || null,
    has_certificate: formData.has_certificate || false,
    certificate: null,
    certificate_link: selectedFile?.name || '',
    // Initialize additional sub_categorys
  }

  const handleTagsChange = (selectedOptions: any) => {
    const updatedTags = selectedOptions.map((option: any) => ({
      label: option.label,
      value: option.value,
    }))
    setTagsArr(updatedTags)
  }

  useEffect(() => console.log(tagsArr), [tagsArr])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setSelectedFile(file)
      const fileUrl = URL.createObjectURL(file)

      console.log(file.name, fileUrl)
      // setFormData((prevFormData: any) => ({
      //   ...prevFormData,
      //   certificate: file.name,
      //   certificate_link: fileUrl.toString(),
      // }))
    } else {
      return
    }
  }

  const GradingCriteria: Option[] = [
    {
      category: ['Management'],
      sub_category: [
        // 'Select a Field',
        'Operations management',
        'Business',
        'Marketing',
        'HR',
        'Accounting',
        'Finance',
        'Business Analyst',
        'Project Manager',
        'Logistics',
        'Other',
      ],
    },
    {
      category: ['Electrical'],
      sub_category: [
        'Electronic engineering',
        'Computer Engineering',
        'Power engineering',
        'Control engineering',
        'Systems engineering',
        'Telecommunications engineering',
        'Microelectronics',
        'Design Engineer',
        'Test engineer',
        'Other',
      ],
    },
    {
      category: ['Mechanical'],
      sub_category: [
        'Aerospace engineering',
        'Automobile Engineering',
        'Biomedical engineering',
        'Electrical engineer',
        'Manufacturing engineering',
        'Robotics',
        'Mechatronics',
        'Chemical Engineering',
        'Process engineering',
      ],
    },
    {
      category: ['Software'],
      sub_category: [
        'Software Developer',
        'Data science',
        'Quality Assurance',
        'Web Developer',
        'Data Engineer',
        'Information security',
        'Software Architect',
        'Cloud engineering',
        'Systems analyst',
        'Machine learning',
        'Full stack developer',
        'Other',
      ],
    },
    {
      category: ['SoftSkills'],
      sub_category: [
        'Communication',
        'Teamwork',
        'Problem-solving',
        'Time management',
        'Critical thinking',
        'Decision-making',
        'Organizational',
        'Stress management',
        'Research',
        'Evaluate & Analyse',
        'Other',
      ],
    },
  ]

  const handleSubmit = (values: YourFormValuesType) => {
    if (editUser.id) {
      console.log(selectedFile, formData.certificate)
      let certificateObj = {
        certificate: selectedFile ,
      }

    
      const updatedUser = {
        ...editUser,
        category: Category,
        sub_category: formData.sub_category,
        tags: tagsArr,
        level: formData.level,
        has_certificate: Boolean(formData.has_certificate),
        certificate: null,
        certificate_link: formData.certificate_link || '',
      }
      if (selectedFile == formData.certificate) {
        console.log('kjajs')
        certificateObj.certificate = null;
        updatedUser.certificate=selectedFile
        
        console.log(certificateObj.certificate)
      }

      console.log(updatedUser, certificateObj)
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
        category: Category,
        sub_category: formData.sub_category,
        tags: tagsArr.map((item) => item.value).join(' '),
        level: formData.level,
        has_certificate: Boolean(formData.has_certificate),
        certificate: null,
        certificate_link: formData.certificate_link,
      }
      console.log(newUser)

      addUser(newUser, certificateObj)
    }

    // Reset the form data and close the modal
    setFormData({
      id: 0,
      category: '',
      sub_category: '',
      tags: [],
      level: null,
      has_certificate: false,
      certificate: null,
      certificate_link: '',
    })
    closeModal()
  }

  function getAnyOptions(x: string): string | string[] {
    // Get options based on academic selection
    const findcategory = GradingCriteria.find((item) =>
      item.category.some((it) => {
        return it == Category
      })
    )
    if (findcategory) {
      return findcategory[x as keyof Option]
    }
    return []
  }

  useEffect(() => {
    const defaultQualific = editUser.category || 'Management'
    const defaultArea = editUser.sub_category || getAnyOptions('sub_category')[0] || ''
    const tags = editUser.tags
    const defaultImage = editUser.certificate || null
    setTagsArr(tags)
    setCategory(defaultQualific)
    setSelectedFile(defaultImage)

    // console.log(defaultArea)
    // setFormData((prevFormData: any) => ({
    //   ...prevFormData,
    //   category: defaultQualific,
    //   sub_category: defaultArea,
    //   //certificate: selectedFile,
    //   //tags: tagsArr,
    // }))
  }, [editUser])

  useEffect(() => {
    const defaultField = getAnyOptions('sub_category')[0] || formData.sub_category || ''
    const fieldSelect = document.querySelector('#sub_category') as HTMLSelectElement
    let selectedValue = fieldSelect?.value
    if (Category != editUser.category && selectedValue != formData.sub_category) {
      selectedValue = defaultField
    }

    console.log(defaultField, formData.sub_category, editUser.sub_category)
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      sub_category: defaultField,
    }))
  }, [Category])

  return (
    <>
      <Modal show={true}>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className='mb-2'>
                  <Form.Label>Skill Category</Form.Label>
                  <Form.Select
                    name='category'
                    key='category'
                    value={Category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                    }}
                  >
                    {GradingCriteria.map((x) =>
                      x.category.flat().map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))
                    )}
                  </Form.Select>
                  <ErrorMessage name='category' component='div' className='text-danger' />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Skill Name</Form.Label>
                  <Form.Select
                    name='sub_category'
                    key='sub_category'
                    id='sub_category'
                    value={formik.values.sub_category}
                    onChange={(e) => {
                      handleChange(e)
                      formik.handleChange(e)
                    }}
                  >
                    {(getAnyOptions('sub_category') as string[]).map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </Form.Select>
                  <ErrorMessage name='sub_category' component='div' className='text-danger' />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Additional Info</Form.Label>
                  <CreatableSelect
                    name='tags'
                    value={tagsArr}
                    required={true}
                    isMulti
                    onChange={(e) => {
                      handleTagsChange(e)
                    }}
                    placeholder='Input additional info if required'
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='level'>
                  <Form.Label>Proficiency Level(out of 100)</Form.Label>
                  <Form.Control
                    type='number'
                    name='level'
                    value={formik.values.level}
                    onChange={(e) => {
                      handleChange(e)
                      formik.handleChange(e)
                    }}
                  />
                  <ErrorMessage name='level' component='div' className='text-danger' />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Certified</Form.Label>
                  <Form.Select
                    className='form-select form-select-solid mb-3'
                    value={formData.has_certificate}
                    name='has_certificate'
                    onChange={(e) => {
                      handleChange(e)
                      const selectedValue = e.target.value
                      if (selectedValue === 'false') {
                        setHaveFile(false)
                      } else if (selectedValue === 'true') {
                        setHaveFile(true)
                      }
                    }}
                  >
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                  </Form.Select>
                </Form.Group>

                {(haveFile || formik.values.has_certificate) && (
                  <React.Fragment>
                    <Form.Group className='mb-3'>
                      <Form.Label>Certification Image</Form.Label>
                      <Form.Control
                        type='file'
                        name='certificate'
                        accept='image/*'
                        onChange={(e: any) => {
                          handleFileChange(e)
                        }}
                      />
                    </Form.Group>
                    <button  className='btn btn-primary btn-sm me-2' onClick={()=>{setSelectedFile(null)
                    formik.values.has_certificate=false
                    formData.has_certificate=false
                  }}>
                    Clear File
                  </button>
   
                    <Form.Group className='mb-3'>
                      <Form.Label>Certification Link</Form.Label>
                      <Form.Control
                        type='text'
                        name='certificate_link'
                        value={formData.certificate_link}
                        onChange={(e: any) => {
                          handleChange(e)
                        }}
                      />
                    </Form.Group>
                    {formData.certificate ? (
                      <span>{formData.certificate}</span>
                    ) : selectedFile ? (
                      <span>{selectedFile.name}</span>
                    ) : (
                      <span className='text-danger'>Please choose a file.</span>
                    )}
                  </React.Fragment>
                )}

                <div className='d-flex justify-content-end'>
                  <Button variant='secondary' className='me-2' onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button id='sub' type='submit'>
                    {editUser.id ? 'Save Changes' : 'Add Skill'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SkillsModal
