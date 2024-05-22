/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl' // Make sure to import useIntl from react-intl

import { PageTitle } from '../../../_metronic/layout/core'
import { } from '../../../_metronic/partials/widgets'
import ayezan from '../../pages/alumni/assets/ayezan.jpg'
const DashboardPage: FC = () => (
  <div className="container">
    {/* <div className="row">
      <div className="col-12">
        <h1 style={{ color: 'gray', textAlign: 'center', fontSize: '70px', fontWeight: 'bold', marginTop: '120px' }}>WELCOME TO ALUMNI
          <br />  PORTAL</h1>
      </div>
    </div> */}
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
              <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">69</span>
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
                <span>31 InActive</span>
                <span>72%</span>
              </div>
              <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                <div
                  className="bg-white rounded h-8px"
                  role="progressbar"
                  style={{ width: "72%" }}
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
                Total Alumni
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
              <div
                className="symbol symbol-35px symbol-circle"
                data-bs-toggle="tooltip"
                aria-label="Barry Walter"
                data-bs-original-title="Barry Walter"
                data-kt-initialized={1}
              >
                <img alt="Pic" src={ayezan} />
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
        {/*begin::Card widget 17*/}
        <div className="card card-flush h-md-50 mb-5 mb-xl-10">
          {/*begin::Header*/}
          <div className="card-header pt-5">
            {/*begin::Title*/}
            <div className="card-title d-flex flex-column">
              {/*begin::Info*/}
              <div className="d-flex align-items-center">
                {/*begin::Currency*/}
                <span className="fs-4 fw-semibold text-gray-400 me-1 align-self-start">
                  $
                </span>
                {/*end::Currency*/}
                {/*begin::Amount*/}
                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
                  69,700
                </span>
                {/*end::Amount*/}
                {/*begin::Badge*/}
                <span className="badge badge-light-success fs-base">
                  <i className="ki-duotone ki-arrow-up fs-5 text-success ms-n1">
                    <span className="path1" />
                    <span className="path2" />
                  </i>
                  2.2%
                </span>
                {/*end::Badge*/}
              </div>
              {/*end::Info*/}
              {/*begin::Subtitle*/}
              <span className="text-gray-400 pt-1 fw-semibold fs-6">
                Projects Earnings in April
              </span>
              {/*end::Subtitle*/}
            </div>
            {/*end::Title*/}
          </div>
          {/*end::Header*/}
          {/*begin::Card body*/}
          <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
            {/*begin::Chart*/}
            <div className="d-flex flex-center me-5 pt-2">
              <div
                id="kt_card_widget_17_chart"
                style={{ minWidth: 70, minHeight: 70 }}
                data-kt-size={70}
                data-kt-line={11}
              >
                <span />
                <canvas height={70} width={70} />
              </div>
            </div>
            {/*end::Chart*/}
            {/*begin::Labels*/}
            <div className="d-flex flex-column content-justify-center flex-row-fluid">
              {/*begin::Label*/}
              <div className="d-flex fw-semibold align-items-center">
                {/*begin::Bullet*/}
                <div className="bullet w-8px h-3px rounded-2 bg-success me-3" />
                {/*end::Bullet*/}
                {/*begin::Label*/}
                <div className="text-gray-500 flex-grow-1 me-4">Leaf CRM</div>
                {/*end::Label*/}
                {/*begin::Stats*/}
                <div className="fw-bolder text-gray-700 text-xxl-end">$7,660</div>
                {/*end::Stats*/}
              </div>
              {/*end::Label*/}
              {/*begin::Label*/}
              <div className="d-flex fw-semibold align-items-center my-3">
                {/*begin::Bullet*/}
                <div className="bullet w-8px h-3px rounded-2 bg-primary me-3" />
                {/*end::Bullet*/}
                {/*begin::Label*/}
                <div className="text-gray-500 flex-grow-1 me-4">Mivy App</div>
                {/*end::Label*/}
                {/*begin::Stats*/}
                <div className="fw-bolder text-gray-700 text-xxl-end">$2,820</div>
                {/*end::Stats*/}
              </div>
              {/*end::Label*/}
              {/*begin::Label*/}
              <div className="d-flex fw-semibold align-items-center">
                {/*begin::Bullet*/}
                <div
                  className="bullet w-8px h-3px rounded-2 me-3"
                  style={{ backgroundColor: "#E4E6EF" }}
                />
                {/*end::Bullet*/}
                {/*begin::Label*/}
                <div className="text-gray-500 flex-grow-1 me-4">Others</div>
                {/*end::Label*/}
                {/*begin::Stats*/}
                <div className="fw-bolder text-gray-700 text-xxl-end">$45,257</div>
                {/*end::Stats*/}
              </div>
              {/*end::Label*/}
            </div>
            {/*end::Labels*/}
          </div>
          {/*end::Card body*/}
        </div>
        {/*end::Card widget 17*/}
        {/*begin::List widget 26*/}
        <div className="card card-flush h-lg-50">
          {/*begin::Header*/}
          <div className="card-header pt-5">
            {/*begin::Title*/}
            <h3 className="card-title text-gray-800 fw-bold">External Links</h3>
            {/*end::Title*/}
            {/*begin::Toolbar*/}
            <div className="card-toolbar">
              {/*begin::Menu*/}
              <button
                className="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-overflow="true"
              >
                <i className="ki-duotone ki-dots-square fs-1 text-gray-300 me-n1">
                  <span className="path1" />
                  <span className="path2" />
                  <span className="path3" />
                  <span className="path4" />
                </i>
              </button>
              {/*begin::Menu 2*/}
              <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px"
                data-kt-menu="true"
              >
                {/*begin::Menu item*/}
                <div className="menu-item px-3">
                  <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">
                    Quick Actions
                  </div>
                </div>
                {/*end::Menu item*/}
                {/*begin::Menu separator*/}
                <div className="separator mb-3 opacity-75" />
                {/*end::Menu separator*/}
                {/*begin::Menu item*/}
                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    New Ticket
                  </a>
                </div>
                {/*end::Menu item*/}
                {/*begin::Menu item*/}
                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    New Customer
                  </a>
                </div>
                {/*end::Menu item*/}
                {/*begin::Menu item*/}
                <div
                  className="menu-item px-3"
                  data-kt-menu-trigger="hover"
                  data-kt-menu-placement="right-start"
                >
                  {/*begin::Menu item*/}
                  <a href="#" className="menu-link px-3">
                    <span className="menu-title">New Group</span>
                    <span className="menu-arrow" />
                  </a>
                  {/*end::Menu item*/}
                  {/*begin::Menu sub*/}
                  <div className="menu-sub menu-sub-dropdown w-175px py-4">
                    {/*begin::Menu item*/}
                    <div className="menu-item px-3">
                      <a href="#" className="menu-link px-3">
                        Admin Group
                      </a>
                    </div>
                    {/*end::Menu item*/}
                    {/*begin::Menu item*/}
                    <div className="menu-item px-3">
                      <a href="#" className="menu-link px-3">
                        Staff Group
                      </a>
                    </div>
                    {/*end::Menu item*/}
                    {/*begin::Menu item*/}
                    <div className="menu-item px-3">
                      <a href="#" className="menu-link px-3">
                        Member Group
                      </a>
                    </div>
                    {/*end::Menu item*/}
                  </div>
                  {/*end::Menu sub*/}
                </div>
                {/*end::Menu item*/}
                {/*begin::Menu item*/}
                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    New Contact
                  </a>
                </div>
                {/*end::Menu item*/}
                {/*begin::Menu separator*/}
                <div className="separator mt-3 opacity-75" />
                {/*end::Menu separator*/}
                {/*begin::Menu item*/}
                <div className="menu-item px-3">
                  <div className="menu-content px-3 py-3">
                    <a className="btn btn-primary btn-sm px-4" href="#">
                      Generate Reports
                    </a>
                  </div>
                </div>
                {/*end::Menu item*/}
              </div>
              {/*end::Menu 2*/}
              {/*end::Menu*/}
            </div>
            {/*end::Toolbar*/}
          </div>
          {/*end::Header*/}
          {/*begin::Body*/}
          <div className="card-body pt-5">
            {/*begin::Item*/}
            <div className="d-flex flex-stack">
              {/*begin::Section*/}
              <a href="#" className="text-primary fw-semibold fs-6 me-2">
                Avg. Client Rating
              </a>
              {/*end::Section*/}
              {/*begin::Action*/}
              <button
                type="button"
                className="btn btn-icon btn-sm h-auto btn-color-gray-400 btn-active-color-primary justify-content-end"
              >
                <i className="ki-duotone ki-exit-right-corner fs-2">
                  <span className="path1" />
                  <span className="path2" />
                </i>
              </button>
              {/*end::Action*/}
            </div>
            {/*end::Item*/}
            {/*begin::Separator*/}
            <div className="separator separator-dashed my-3" />
            {/*end::Separator*/}
            {/*begin::Item*/}
            <div className="d-flex flex-stack">
              {/*begin::Section*/}
              <a href="#" className="text-primary fw-semibold fs-6 me-2">
                Instagram Followers
              </a>
              {/*end::Section*/}
              {/*begin::Action*/}
              <button
                type="button"
                className="btn btn-icon btn-sm h-auto btn-color-gray-400 btn-active-color-primary justify-content-end"
              >
                <i className="ki-duotone ki-exit-right-corner fs-2">
                  <span className="path1" />
                  <span className="path2" />
                </i>
              </button>
              {/*end::Action*/}
            </div>
            {/*end::Item*/}
            {/*begin::Separator*/}
            <div className="separator separator-dashed my-3" />
            {/*end::Separator*/}
            {/*begin::Item*/}
            <div className="d-flex flex-stack">
              {/*begin::Section*/}
              <a href="#" className="text-primary fw-semibold fs-6 me-2">
                Google Ads CPC
              </a>
              {/*end::Section*/}
              {/*begin::Action*/}
              <button
                type="button"
                className="btn btn-icon btn-sm h-auto btn-color-gray-400 btn-active-color-primary justify-content-end"
              >
                <i className="ki-duotone ki-exit-right-corner fs-2">
                  <span className="path1" />
                  <span className="path2" />
                </i>
              </button>
              {/*end::Action*/}
            </div>
            {/*end::Item*/}
          </div>
          {/*end::Body*/}
        </div>
        {/*end::LIst widget 26*/}
      </div>
      {/*end::Col*/}

    </div>


  </div> // Move the closing div tag to this line
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
