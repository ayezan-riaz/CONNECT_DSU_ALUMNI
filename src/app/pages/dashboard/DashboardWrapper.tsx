import React, { FC, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ayezan from '../../pages/alumni/assets/ayezan.jpg'
import fame from '../../pages/alumni/assets/newHome.svg'
import './dashboard.css'
const DashboardPage: FC = () => (
  <div className='container'>
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='col-md-12 mb-5 text-center'>
        <div className='card card-ab shadow-sm d-flex flex-row align-items-center justify-content-between p-5'>

          <h1 className='animated-text'>
            WELCOME TO DSU ALUMNI PORTAL
          </h1>
        </div>

      </div>
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
        {/*begin::Col*/}
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
          {/*begin::Card widget 20*/}
          <div
            className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10"
            style={{
              backgroundColor: "#F1416C",
              backgroundImage: 'url("assets/media/patterns/vector-1.png")'
            }}
          >
            {/*begin::Header*/}
            <div className="card-header pt-5">
              {/*begin::Title*/}
              <div className="card-title d-flex flex-column">
                {/*begin::Amount*/}
                <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">2</span>
                {/*end::Amount*/}
                {/*begin::Subtitle*/}
                <span className="text-white opacity-75 pt-1 fw-semibold fs-6">
                  Active Users
                </span>
                {/*end::Subtitle*/}
              </div>
              {/*end::Title*/}
            </div>
            {/*end::Header*/}
            {/*begin::Card body*/}
            <div className="card-body d-flex align-items-end pt-0">
              {/*begin::Progress*/}
              <div className="d-flex align-items-center flex-column mt-3 w-100">
                <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
                  <span>98 Pending</span>
                  <span>2% </span>
                </div>
                <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                  <div
                    className="bg-white rounded h-8px"
                    role="progressbar"
                    style={{ width: "98%" }}
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              {/*end::Progress*/}
            </div>
            {/*end::Card body*/}
          </div>
          {/*end::Card widget 20*/}
          {/*begin::Card widget 7*/}
          <div className="card card-flush h-md-50 mb-5 mb-xl-10">
            {/*begin::Header*/}
            <div className="card-header pt-5">
              {/*begin::Title*/}
              <div className="card-title d-flex flex-column">
                {/*begin::Amount*/}
                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">357</span>
                {/*end::Amount*/}
                {/*begin::Subtitle*/}
                <span className="text-gray-400 pt-1 fw-semibold fs-6">
                  Professionals
                </span>
                {/*end::Subtitle*/}
              </div>
              {/*end::Title*/}
            </div>
            {/*end::Header*/}
            {/*begin::Card body*/}
            <div className="card-body d-flex flex-column justify-content-end pe-0">
              {/*begin::Title*/}
              <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                Today’s Heroes
              </span>
              {/*end::Title*/}
              {/*begin::Users group*/}
              <div className="symbol-group symbol-hover flex-nowrap">
                <div
                  className="symbol symbol-35px symbol-circle"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Alan Warden"
                  data-kt-initialized={1}
                >
                  <span className="symbol-label bg-warning text-inverse-warning fw-bold">
                    A
                  </span>
                </div>
                <div
                  className="symbol symbol-35px symbol-circle"
                  data-bs-toggle="tooltip"
                  aria-label="Michael Eberon"
                  data-bs-original-title="Michael Eberon"
                  data-kt-initialized={1}
                >
                  <img alt="Pic" src={ayezan} />
                </div>
                <div
                  className="symbol symbol-35px symbol-circle"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Susan Redwood"
                  data-kt-initialized={1}
                >
                  <span className="symbol-label bg-primary text-inverse-primary fw-bold">
                    S
                  </span>
                </div>
                <div
                  className="symbol symbol-35px symbol-circle"
                  data-bs-toggle="tooltip"
                  aria-label="Melody Macy"
                  data-bs-original-title="Melody Macy"
                  data-kt-initialized={1}
                >
                  <img alt="Pic" src={ayezan} />
                </div>
                <div
                  className="symbol symbol-35px symbol-circle"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Perry Matthew"
                  data-kt-initialized={1}
                >
                  <span className="symbol-label bg-danger text-inverse-danger fw-bold">
                    P
                  </span>
                </div>

                <a
                  href="#"
                  className="symbol symbol-35px symbol-circle"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_view_users"
                >
                  <span className="symbol-label bg-dark text-gray-300 fs-8 fw-bold">
                    +42
                  </span>
                </a>
              </div>
              {/*end::Users group*/}
            </div>
            {/*end::Card body*/}
          </div>
          {/*end::Card widget 7*/}
        </div>
        {/*end::Col*/}
        {/*begin::Col*/}
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
          {/*begin::Card widget 20*/}
          <div
            className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10"
            style={{
              backgroundColor: "#F1416C",
              backgroundImage: 'url("assets/media/patterns/vector-1.png")'
            }}
          >
            {/*begin::Header*/}
            <div className="card-header pt-5">
              {/*begin::Title*/}
              <div className="card-title d-flex flex-column">
                {/*begin::Amount*/}
                <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">4</span>
                {/*end::Amount*/}
                {/*begin::Subtitle*/}
                <span className="text-white opacity-75 pt-1 fw-semibold fs-6">
                  Approve Jobs
                </span>
                {/*end::Subtitle*/}
              </div>
              {/*end::Title*/}
            </div>
            {/*end::Header*/}
            {/*begin::Card body*/}
            <div className="card-body d-flex align-items-end pt-0">
              {/*begin::Progress*/}
              <div className="d-flex align-items-center flex-column mt-3 w-100">
                <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
                  <span>20 Pending</span>
                  <span>80%</span>
                </div>
                <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                  <div
                    className="bg-white rounded h-8px"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              {/*end::Progress*/}
            </div>
            {/*end::Card body*/}
          </div>
          {/*end::Card widget 20*/}
          {/*begin::Card widget 7*/}
          <div
            className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10"
            style={{
              backgroundColor: "#F1416C",
              backgroundImage: 'url("assets/media/patterns/vector-1.png")'
            }}
          >
            {/*begin::Header*/}
            <div className="card-header pt-5">
              {/*begin::Title*/}
              <div className="card-title d-flex flex-column">
                {/*begin::Amount*/}
                <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">7</span>
                {/*end::Amount*/}
                {/*begin::Subtitle*/}
                <span className="text-white opacity-75 pt-1 fw-semibold fs-6">
                  Alumni Card Approve
                </span>
                {/*end::Subtitle*/}
              </div>
              {/*end::Title*/}
            </div>
            {/*end::Header*/}
            {/*begin::Card body*/}
            <div className="card-body d-flex align-items-end pt-0">
              {/*begin::Progress*/}
              <div className="d-flex align-items-center flex-column mt-3 w-100">
                <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
                  <span>93 Pending</span>
                  <span>7% </span>
                </div>
                <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                  <div
                    className="bg-white rounded h-8px"
                    role="progressbar"
                    style={{ width: "93%" }}
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              {/*end::Progress*/}
            </div>
            {/*end::Card body*/}
          </div>
          {/*end::Card widget 7*/}
        </div>
        {/*end::Col*/}
        {/*begin::Col*/}
        <div className="col-xxl-6">
          {/*begin::Engage widget 10*/}
          <div className="card card-flush h-md-100">
            {/*begin::Body*/}
            <div
              className="card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0"
              style={{
                backgroundPosition: "100% 50%",
                backgroundImage: 'url("assets/media/stock/900x600/42.png")'
              }}
            >
              {/*begin::Wrapper*/}
              <div className="mb-10">
                {/*begin::Title*/}
                <div className="fs-2hx fw-bold text-gray-800 text-center mb-13">
                  <span className="me-2">
                    DHA Suffa University
                    <br />
                    <span className="position-relative d-inline-block text-danger">
                      <a
                        href="../../demo1/dist/pages/user-profile/overview.html"
                        className="text-danger opacity-75-hover"
                      >
                        Alumni
                      </a>
                      {/*begin::Separator*/}
                      <span className="position-absolute opacity-15 bottom-0 start-0 border-4 border-danger border-bottom w-100" />
                      {/*end::Separator*/}
                    </span>
                  </span>
                  Portal
                </div>
                {/*end::Title*/}
                {/*begin::Action*/}

                {/*begin::Action*/}
              </div>
              {/*begin::Wrapper*/}
              {/*begin::Illustration*/}
              <img
                className="mx-auto h-150px h-lg-200px theme-light-show"
                src="assets/media/illustrations/misc/upgrade.svg"
                alt=""
              />
              <img
                className="mx-auto h-150px h-lg-200px theme-dark-show"
                src={fame}
                alt=""
              />
              {/*end::Illustration*/}
            </div>
            {/*end::Body*/}
          </div>
          {/*end::Engage widget 10*/}
        </div>
        {/*end::Col*/}
      </div>

    </div>
  </div>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()


  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
      <ToastContainer />
    </>
  )
}

export { DashboardWrapper }
