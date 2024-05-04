import { useEffect, useRef, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { Step4 } from './steps/Step4'
import { Step5 } from './steps/Step5'
import { StepperComponent } from '../../../../_metronic/assets/ts/components'
import { Form, Formik, FormikValues } from 'formik'
import { createAccountSchemas, ICreateAccount, inits } from './CreateAccountWizardHelper'

const Vertical = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)

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

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
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
                  style={{ backgroundColor: '#80171D', color: 'white' }}
                >
                  <i className='stepper-check fas fa-check' style={{ color: 'white' }}></i>
                  <span
                    className='stepper-number'
                    style={{ backgroundColor: '#80171D', color: 'white' }}
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
                  style={{ backgroundColor: '#80171D', color: 'white' }}
                >
                  <i className='stepper-check fas fa-check' style={{ color: 'white' }}></i>
                  <span
                    className='stepper-number'
                    style={{ backgroundColor: '#80171D', color: 'white' }}
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
                  style={{ backgroundColor: '#80171D', color: 'white' }}
                >
                  <i className='stepper-check fas fa-check' style={{ color: 'white' }}></i>
                  <span
                    className='stepper-number'
                    style={{ backgroundColor: '#80171D', color: 'white' }}
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
                  style={{ backgroundColor: '#80171D', color: 'white' }}
                >
                  <i className='stepper-check fas fa-check' style={{ color: 'white' }}></i>
                  <span
                    className='stepper-number'
                    style={{ backgroundColor: '#80171D', color: 'white' }}
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
                  style={{ backgroundColor: '#80171D', color: 'white' }}
                >
                  <i className='stepper-check fas fa-check'></i>
                  <span
                    className='stepper-number'
                    style={{ backgroundColor: '#80171D', color: 'white' }}
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
                <Step3 />
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
                    className='btn btn-lg btn-light-primary me-3'
                    style={{ backgroundColor: 'white', color: '#80171D' }}
                    data-kt-stepper-action='previous'
                  >
                    <KTIcon iconName='arrow-left' className='fs-4 me-1 text-black' />
                    previous
                  </button>
                </div>

                <div>
                  <button
                    type='submit'
                    className='btn btn-lg  me-3'
                    style={{ backgroundColor: '#80171D', color: 'white' }}
                  >
                    <span className='indicator-label'>
                      {stepper.current?.currentStepIndex !==
                        stepper.current?.totalStepsNumber! - 1 && 'Next'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totalStepsNumber! - 1 && 'Submit'}
                      <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0 text-white' />
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

export { Vertical }
