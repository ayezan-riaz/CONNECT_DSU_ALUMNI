

import React from 'react'

const ShowUser = () => {
    return (




        <div className="card mb-5 mb-xl-8">
            {/*begin::Card body*/}
            <div className="card-body">
                {/*begin::Summary*/}
                {/*begin::User Info*/}
                <div className="d-flex flex-center flex-column py-5">
                    {/*begin::Avatar*/}
                    <div className="symbol symbol-100px symbol-circle mb-7">
                        <img src="" alt="image" />
                    </div>
                    {/*end::Avatar*/}
                    {/*begin::Name*/}
                    <a href="#" className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">Emma Smith</a>
                    {/*end::Name*/}
                    {/*begin::Position*/}
                    <div className="mb-9">
                        {/*begin::Badge*/}
                        <div className="badge badge-lg badge-light-primary d-inline">Administrator</div>
                        {/*begin::Badge*/}
                    </div>
                    {/*end::Position*/}
                    {/*begin::Info*/}
                    {/*begin::Info heading*/}
                    <div className="fw-bold mb-3">Assigned Tickets
                        <span className="ms-2" ddata-bs-toggle="popover" data-bs-trigger="hover" data-bs-html="true" data-bs-content="Number of support tickets assigned, closed and pending this week.">
                            <i className="ki-duotone ki-information fs-7">
                                <span className="path1" />
                                <span className="path2" />
                                <span className="path3" />
                            </i>
                        </span></div>
                    {/*end::Info heading*/}
                    <div className="d-flex flex-wrap flex-center">
                        {/*begin::Stats*/}
                        <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                            <div className="fs-4 fw-bold text-gray-700">
                                <span className="w-75px">243</span>
                                <i className="ki-duotone ki-arrow-up fs-3 text-success">
                                    <span className="path1" />
                                    <span className="path2" />
                                </i>
                            </div>
                            <div className="fw-semibold text-muted">Total</div>
                        </div>
                        {/*end::Stats*/}
                        {/*begin::Stats*/}
                        <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                            <div className="fs-4 fw-bold text-gray-700">
                                <span className="w-50px">56</span>
                                <i className="ki-duotone ki-arrow-down fs-3 text-danger">
                                    <span className="path1" />
                                    <span className="path2" />
                                </i>
                            </div>
                            <div className="fw-semibold text-muted">Solved</div>
                        </div>
                        {/*end::Stats*/}
                        {/*begin::Stats*/}
                        <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                            <div className="fs-4 fw-bold text-gray-700">
                                <span className="w-50px">188</span>
                                <i className="ki-duotone ki-arrow-up fs-3 text-success">
                                    <span className="path1" />
                                    <span className="path2" />
                                </i>
                            </div>
                            <div className="fw-semibold text-muted">Open</div>
                        </div>
                        {/*end::Stats*/}
                    </div>
                    {/*end::Info*/}
                </div>
                {/*end::User Info*/}
                {/*end::Summary*/}
                {/*begin::Details toggle*/}
                <div className="d-flex flex-stack fs-4 py-3">
                    <div className="fw-bold rotate collapsible" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="kt_user_view_details">Details
                        <span className="ms-2 rotate-180">
                            <i className="ki-duotone ki-down fs-3" />
                        </span></div>
                    <span data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-original-title="Edit customer details" data-kt-initialized={1}>
                        <a href="#" className="btn btn-sm btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_update_details">Edit</a>
                    </span>
                </div>
                {/*end::Details toggle*/}
                <div className="separator" />
                {/*begin::Details content*/}
                <div id="kt_user_view_details" className="collapse show">
                    <div className="pb-5 fs-6">
                        {/*begin::Details item*/}
                        <div className="fw-bold mt-5">Account ID</div>
                        <div className="text-gray-600">ID-45453423</div>
                        {/*begin::Details item*/}
                        {/*begin::Details item*/}
                        <div className="fw-bold mt-5">Email</div>
                        <div className="text-gray-600">
                            <a href="#" className="text-gray-600 text-hover-primary">info@keenthemes.com</a>
                        </div>
                        {/*begin::Details item*/}
                        {/*begin::Details item*/}
                        <div className="fw-bold mt-5">Address</div>
                        <div className="text-gray-600">101 Collin Street,
                            <br />Melbourne 3000 VIC
                            <br />Australia</div>
                        {/*begin::Details item*/}
                        {/*begin::Details item*/}
                        <div className="fw-bold mt-5">Language</div>
                        <div className="text-gray-600">English</div>
                        {/*begin::Details item*/}
                        {/*begin::Details item*/}
                        <div className="fw-bold mt-5">Last Login</div>
                        <div className="text-gray-600">20 Dec 2023, 11:30 am</div>
                        {/*begin::Details item*/}
                    </div>
                </div>
                {/*end::Details content*/}
            </div>
            {/*end::Card body*/}
        </div>
    )
}
export default ShowUser