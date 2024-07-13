import {useEffect, useRef, useState} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import { KTIcon } from '../../../../../../../_metronic/helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'
import {Step5} from './steps/Step5'
import {StepperComponent} from '../../../../../../../_metronic/assets/ts/components'
import {Form, Formik, FormikValues, useFormikContext} from 'formik'
import {createAccountSchemas, inits} from './CreateAccountWizardHelper'
import {ICreateAccount} from './CreateAccountWizardHelper'
import {useFormik} from 'formik' // Corrected import statement
import React, {createContext} from 'react'
import axios from 'axios'
// Assuming dotenv is configured to load environment variables
// const API = process.env.API_PATH;

const API = 'https://ams-backend-gkxg.onrender.com/api/'

// Load environment variables
// require('dotenv').config();
// const CGPAContext = createContext<number | null>(null);
interface CGPAContextData {
  step2Cgpa: number | null
  step2First_name: string | null
  step2Middle_name: string | null
  step2Last_name: string | null
  step2Uni_email: string | null
  step2Qulification: string | null
  step2Area: string | null
}

const CGPAContext = createContext<CGPAContextData>({
  step2Cgpa: null,
  step2First_name: null,
  step2Middle_name: null,
  step2Last_name: null,
  step2Uni_email: null,
  step2Qulification: null,
  step2Area: null,
})

const Vertical = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [step2Data, setStep2Data] = useState<any>(null)
  const [step2Token, setStep2Token] = useState<string>('')
  const [Id, setId] = useState<number | undefined>(undefined) // State to store the token from Step 2 API response
  const [userData, setUserData] = useState<any>({}) // State to store the user data from Step 2 API response
  const [step2Id, setStep2Id] = useState<number | undefined>(undefined)
  // const [step2Cgpa, setStep2Cgpa] = useState<number | undefined>(undefined); // State to store the token from Step 2 API response
  const [step2Cgpa, setStep2Cgpa] = useState<number | null>(null)
  const [step2First_name, setstep2First_name] = useState<string | null>(null)
  const [step2Middle_name, setstep2Middle_name] = useState<string | null>(null)
  const [step2Last_name, setstep2Last_name] = useState<string | null>(null)
  const [step2Uni_email, setstep2Uni_email] = useState<string | null>(null)
  const [step2Qulification, setstep2Qualification] = useState<string | null>(null)
  const [step2Area, setstep2Area] = useState<string | null>(null)

  const MyContext = createContext(1)
  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    if (!stepper.current) {
      return
    }
    stepper.current.goto(1)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = async (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    try {
      if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
        // Go to the next step
        stepper.current.goNext()

        // Call the corresponding API based on the current step index
        switch (stepper.current.currentStepIndex) {
          case 2:
            try {
              const responseStep1 = await axios.post(`${API}registrations/verifyUniversityEmail`, {
                uni_reg_id: values.uni_reg_id,
              })

              if (
                !responseStep1 ||
                (responseStep1.status !== 200 && responseStep1.status !== 201)
              ) {
                throw new Error(responseStep1?.data?.message?.[0] || 'Unexpected error occurred')
              }

              const {token} = responseStep1.data
              setStep2Token(token)
            } catch (err: any) {
              const errorMessage =
                err.response?.data?.message?.[0] || 'An error occurred while fetching data'
              toast.error(errorMessage)
              stepper.current.goPrev()
            }
            break

          case 3:
            try {
              if (!step2Token) {
                // If 'step2Token' is not available, show an error toast
                toast.error('Clicked Visit Email & Verified Your Email')
                stepper.current.goPrev()
              } else {
                const responseStep2 = await axios.post(
                  `${API}registrations/getUniversityEmailTokenData`,
                  // 'https://ams-backend-gkxg.onrender.com/api/registrations/getUniversityEmailTokenData',
                  {token: step2Token} // Pass the token as part of the request body
                )

                // Assuming the responseStep2.data is an object containing the required data
                const {
                  id,
                  cgpa,
                  first_name,
                  middle_name,
                  last_name,
                  uni_email,
                  qualification,
                  area,
                } = responseStep2.data

                // Set the state with the response data
                setStep2Id(id)
                setStep2Cgpa(cgpa)
                setstep2First_name(first_name)
                setstep2Middle_name(middle_name)
                setstep2Last_name(last_name)
                setstep2Uni_email(uni_email)
                setstep2Qualification(qualification)
                setstep2Area(area)

                // Proceed to the next step or do any further processing
                // ...
              }
            } catch (err: any) {
              const errorMessage =
                err.response?.data?.message?.[0] || 'An error occurred while fetching data'
              toast.error(errorMessage)
              stepper.current.goPrev()
            }
            break

          case 4:
            // Step 3 API Call
            try {
              const responseStep4 = await axios.post(`${API}registrations/registerAccount`, {
                email: values.email,
                phone: values.phone,
                password: values.password,
                reg_id: step2Id, // Use the 'id' from Step 2 API response here
              })

              if (responseStep4.status !== 200 && responseStep4.status !== 201) {
                throw new Error(responseStep4.data.message || 'Unexpected error occurred')
              }

              // Proceed to the next step if the response is successful
              // stepper.current.goNext(); // Uncomment this line if you want to proceed to the next step on success
            } catch (err: any) {
              const errorMessage =
                err.response?.data?.message || 'An error occurred while fetching data'
              if (Array.isArray(errorMessage)) {
                errorMessage.forEach((msg) => toast.error(msg))
              } else {
                toast.error(errorMessage)
              }
              stepper.current.goPrev()
            }
            break

          case 5:
            // Step 4 API Call (same as Step 2)
            if (!step2Token) {
              // If 'step2Token' is not available, show an error toast
              toast.error('Clicked Visit Email & Verified Your Email')
              stepper.current.goPrev()
            } else {
              try {
                const responseStep5 = await axios.post(
                  `${API}registrations/getUniversityEmailTokenData`,
                  // 'https://ams-backend-gkxg.onrender.com/api/registrations/getUniversityEmailTokenData',
                  {token: step2Token} // Pass the token as part of the request body
                )
              } catch (error) {
                // Handle any errors that might occur during the API call
                console.error('Error occurred:', error)
                // Optionally, show an error toast to the user
                toast.error('An error occurred while fetching data')
              }
            }
            break
          // Add more cases for additional steps if needed
          default:
            break
        }
      } else {
        // If the last step is reached, reset the form and go to the first step
        stepper.current.goto(1)
        actions.resetForm()
      }
    } catch (error) {
      // Handle error
    }

    // Update the current schema after the API call
    setCurrentSchema(createAccountSchemas[stepper.current?.currentStepIndex - 1])
  }

  useEffect(() => {
    if (!stepper.current) {
      return
    }
    stepper.current.goto(1)
  }, [])

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div
      ref={stepperRef}
      className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
      id='kt_create_account_stepper'
    >
      {/* begin::Aside*/}
      <div className='card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
        {/* begin::Wrapper*/}
        <div className='card-body px-6 px-lg-10 px-xxl-15 py-20'>
          {/* begin::Nav*/}
          <div className='stepper-nav'>
            {/* begin::Step 1*/}
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div
                  className='stepper-icon w-40px h-40px'
                  style={{backgroundColor: '#80171D', color: 'white'}}
                >
                  <i className='stepper-check fas fa-check' style={{color: 'white'}}></i>
                  <span
                    className='stepper-number'
                    style={{backgroundColor: '#80171D', color: 'white'}}
                  >
                    1
                  </span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Registration </h3>

                  <div className='stepper-desc fw-semibold'>Enter Registration Number</div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}

              {/* begin::Line*/}
              <div className='stepper-line h-40px'></div>
              {/* end::Line*/}
            </div>
            {/* end::Step 1*/}

            {/* begin::Step 2*/}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div
                  className='stepper-icon w-40px h-40px'
                  style={{backgroundColor: '#80171D', color: 'white'}}
                >
                  <i className='stepper-check fas fa-check' style={{color: 'white'}}></i>
                  <span
                    className='stepper-number'
                    style={{backgroundColor: '#80171D', color: 'white'}}
                  >
                    2
                  </span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Verify Email</h3>
                  <div className='stepper-desc fw-semibold'>Verify email on DSU mailbox</div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}

              {/* begin::Line*/}
              <div className='stepper-line h-40px'></div>
              {/* end::Line*/}
            </div>
            {/* end::Step 2*/}

            {/* begin::Step 3*/}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div
                  className='stepper-icon w-40px h-40px'
                  style={{backgroundColor: '#80171D', color: 'white'}}
                >
                  <i className='stepper-check fas fa-check' style={{color: 'white'}}></i>
                  <span
                    className='stepper-number'
                    style={{backgroundColor: '#80171D', color: 'white'}}
                  >
                    3
                  </span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Create Account</h3>
                  <div className='stepper-desc fw-semibold'>Enter account details</div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}

              {/* begin::Line*/}
              <div className='stepper-line h-40px'></div>
              {/* end::Line*/}
            </div>
            {/* end::Step 3*/}

            {/* begin::Step 4*/}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div
                  className='stepper-icon w-40px h-40px'
                  style={{backgroundColor: '#80171D', color: 'white'}}
                >
                  <i className='stepper-check fas fa-check' style={{color: 'white'}}></i>
                  <span
                    className='stepper-number'
                    style={{backgroundColor: '#80171D', color: 'white'}}
                  >
                    4
                  </span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Verify Email</h3>
                  <div className='stepper-desc fw-semibold'>Verify on your current email</div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}

              {/* begin::Line*/}
              <div className='stepper-line h-40px'></div>
              {/* end::Line*/}
            </div>
            {/* end::Step 4*/}

            {/* begin::Step 5*/}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              {/* begin::Wrapper*/}
              <div className='stepper-wrapper'>
                {/* begin::Icon*/}
                <div
                  className='stepper-icon w-40px h-40px'
                  style={{backgroundColor: '#80171D', color: 'white'}}
                >
                  <i className='stepper-check fas fa-check'></i>
                  <span
                    className='stepper-number'
                    style={{backgroundColor: '#80171D', color: 'white'}}
                  >
                    5
                  </span>
                </div>
                {/* end::Icon*/}

                {/* begin::Label*/}
                <div className='stepper-label'>
                  <h3 className='stepper-title'>Completed</h3>
                  <div className='stepper-desc fw-semibold'>Review</div>
                </div>
                {/* end::Label*/}
              </div>
              {/* end::Wrapper*/}
            </div>
            {/* end::Step 5*/}
          </div>
          {/* end::Nav*/}
        </div>
        {/* end::Wrapper*/}
      </div>
      {/* begin::Aside*/}
      {/* <div className="vr vr-blurry text-body my-auto" style={{ height: '400px' }}></div> */}
      <div className='d-flex flex-row-fluid flex-center bg-body rounded'>
        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
          {() => (
            <Form className='w-100 w-xl-700px px-9' noValidate id='kt_create_account_form'>
              <div className='current' data-kt-stepper-element='content'>
                <Step1 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step2 />
              </div>

              <div data-kt-stepper-element='content'>
                <CGPAContext.Provider
                  value={{
                    step2Cgpa,
                    step2First_name,
                    step2Middle_name,
                    step2Last_name,
                    step2Uni_email,
                    step2Qulification,
                    step2Area,
                  }}
                >
                  <Step3 />
                </CGPAContext.Provider>
              </div>

              <div data-kt-stepper-element='content'>
                <Step4 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step5 />
              </div>

              <div className='d-flex flex-stack pt-10'>
                <div className='mr-2'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-lg but_yellow me-3'
                    style={{backgroundColor: 'white', color: '#80171D'}}
                    data-kt-stepper-action='previous'
                  >
                    <KTIcon iconName='arrow-left' className='fs-4 me-1 text-white' />
                    previous
                  </button>
                </div>

                <div>
                  <button type='submit' className='btn btn-lg  me-3 but_brown'>
                    <span className='indicator-label'>
                      {stepper.current?.currentStepIndex !==
                        stepper.current?.totalStepsNumber! - 1 && 'Next'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totalStepsNumber! - 1 && 'Next'}

                      <KTIcon iconName='arrow-right' className='fs-4 px-1 me-1 text-white' />
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export {Vertical, CGPAContext}
