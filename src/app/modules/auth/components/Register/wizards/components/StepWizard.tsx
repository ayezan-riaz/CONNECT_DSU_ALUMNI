import React, {FC, useState} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
// Load environment variables
// require('dotenv').config();
const API = process.env.API_PATH
const Step1Schema = Yup.object().shape({
  registrationId: Yup.string().required('Registration Id is required'),
})

const Step2Schema = Yup.object().shape({
  token: Yup.string().required('Token is required'),
})

const Step3Schema = Yup.object().shape({
  // Your validation rules for Step 3 fields go here
})

const StepWizard: FC = () => {
  const [step, setStep] = useState<number>(1)

  const handleNextStep = async (values: any, {setSubmitting}: any) => {
    setSubmitting(true)
    try {
      switch (step) {
        case 1:
          await verifyUniversityEmail(values.registrationId)
          break
        case 2:
          await validateAccountEmail(values.token)
          break
        case 3:
          await registerAccount(values)
          break
        default:
          break
      }
      setStep((prevStep) => prevStep + 1)
    } catch (error) {
      console.error(error)
    }
    setSubmitting(false)
  }

  const verifyUniversityEmail = async (registrationId: string) => {
    try {
      // Call the API to verify university email
      const response = await axios.post(
        `${API}/registrations/verifyUniversityEmail`,
        // 'http://13.200.151.68:3000/api/registrations/verifyUniversityEmail',
        {registrationId}
      )
      // Handle the API response as needed
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const validateAccountEmail = async (token: string) => {
    try {
      // Call the API to validate account email with the token
      const response = await axios.get(
        `${API}/registrations/validateAccountEmail?token=${token}`
        // `http://13.200.151.68:3000/api/registrations/validateAccountEmail?token=${token}`
      )
      // Handle the API response as needed
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const registerAccount = async (values: any) => {
    try {
      // Call the API to register the account
      const response = await axios.post(
        `${API}/registrations/registerAccount`,
        // 'http://13.200.151.68:3000/api/registrations/registerAccount',
        values
      )
      // Handle the API response as needed
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={{
        registrationId: '',
        token: '',
        // Add more fields for Step 3 as needed
      }}
      onSubmit={handleNextStep}
      validationSchema={step === 1 ? Step1Schema : step === 2 ? Step2Schema : Step3Schema}
    >
      {({isSubmitting}) => (
        <Form>
          {step === 1 && (
            <div>
              <h2>Step 1: Enter Registration Id</h2>
              <div>
                <label>Registration Id:</label>
                <Field type='text' name='registrationId' />
                <ErrorMessage name='registrationId' component='div' />
              </div>
              <button type='submit' disabled={isSubmitting}>
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Step 2: Verify Email with Token</h2>
              <div>
                <label>Token:</label>
                <Field type='text' name='token' />
                <ErrorMessage name='token' component='div' />
              </div>
              <button type='submit' disabled={isSubmitting}>
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Step 3: Register Account</h2>
              {/* Add fields for Step 3 here */}
              <div>
                <label>Field 1:</label>
                <Field type='text' name='field1' />
                <ErrorMessage name='field1' component='div' />
              </div>
              <div>
                <label>Field 2:</label>
                <Field type='text' name='field2' />
                <ErrorMessage name='field2' component='div' />
              </div>
              {/* Add more fields as needed */}
              <button type='submit' disabled={isSubmitting}>
                Next
              </button>
            </div>
          )}

          {/* Add more steps as needed */}

          {step === 4 && (
            <div>
              <h2>Step 4</h2>
              {/* Step 4 content goes here */}
              <button type='submit' disabled={isSubmitting}>
                Next
              </button>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2>Step 5</h2>
              {/* Step 5 content goes here */}
              <button type='submit' disabled={isSubmitting}>
                Next
              </button>
            </div>
          )}

          {/* Add more steps as needed */}
        </Form>
      )}
    </Formik>
  )
}

export default StepWizard
