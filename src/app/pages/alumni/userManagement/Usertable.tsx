
import React, { useState, useEffect } from 'react'
import UserModal from './UserModal'
//import ayezan from '../../alumni/assets/ayezan.png'
import aye from '../assets/aye.jpg'
//import ayezan from '../assets/logo.png'
const Usertable = () => {
  const [editUser, setEditUser] = useState<any>({})
  const [users, setUsers] = useState([
    {

      id: 1,
      name: 'Ayezan',
      email: 'ayezanriaz8@gmail.com',
      position: 'Senior',
      role: 'Java Developer',
      LastLogin: 'Today',
      twoStep: 'Enabled',
      joinedDate: '10 Nov 2022',
      online: 'Enabled',
      image: aye
    },
    {

      id: 2,
      name: 'Abdullha',
      email: 'abdullha@gmail.com',
      position: 'Senior',
      role: 'Trials',
      LastLogin: 'Today',
      twoStep: 'Enabled',
      joinedDate: '10 Nov 2022',
      online: 'Enabled',
      image: aye
    },
    {

      id: 3,
      name: 'nabeel',
      email: 'nabeel@gmail.com',
      position: 'Senior',
      role: 'Adminstrator',
      LastLogin: 'Today',
      twoStep: 'Enabled',
      joinedDate: '10 Nov 2022',
      online: 'Enabled',
      image: aye
    },
    {

      id: 4,
      name: 'Ahad',
      email: 'ahad@gmail.com',
      position: 'Senior',
      role: 'Analyst',
      LastLogin: 'Today',
      twoStep: 'Enabled',
      joinedDate: '10 Nov 2022',
      online: 'Enabled',
      image: aye
    },

  ])

  // const [searchText, setSearchText] = useState('');

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(event.target.value.toLowerCase());
  // };

  // const filteredUsers = users.filter((user) =>
  //   user.name.toLowerCase().includes(searchText)
  // );

  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    // Filter the users based on the search text
    const filteredSuggestions = users
      .filter(user => user.name.toLowerCase().startsWith(value))
      .map(user => user.name);
    setSuggestions(filteredSuggestions);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText)
  );

  const updateExistingUser = (updatedUser: any) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === updatedUser.id) {
          return { ...user, ...updatedUser }
        }
        return user
      })
    })
  }

  useEffect(() => {
    console.log(users) // Log the users state whenever it changes
  }, [users])

  const handleEditUser = (userId: number) => {
    // Find the user with the matching id
    const userToUpdate = users.find((user) => user.id === userId)

    if (userToUpdate) {
      console.log(userToUpdate)
      // Perform the edit operation on the user (e.g., open a modal for editing)
      // updateExistingUser(userToUpdate);
      setEditUser(userToUpdate)
      updateExistingUser(userToUpdate)
      setShowModal(true)
    }
  }

  const handleDeleteUser = (userId: number) => {
    // Filter out the user with the matching id
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
    console.log('Delete User:', userId)
  }

  // const handleAddUser = () => {
  //   // Generate a new user object with a unique id
  //   const newUser = {
  //     id: Math.floor((Math.random()*89)+1),
  //     role: 'Business Analyst',
  //     company:"XORD",
  //     status:<div className='badge badge-light-success fw-bolder'>Completed</div>,
  //     startDate: '8 Nov 2012',
  //     endDate: '10 Oct 2014',
  //   };
  //   setUsers([...users, newUser]);
  //   console.log('Add User:', newUser);
  // };

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser])
    // console.log('Add User:', newUser);

    // Perform any other actions with the new user data in the parent component
  }

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    // updateExistingUser(editUser)
    setEditUser({})
  }
  return (
    <div className='card'>
      {/* <div className='card-header border-0 pt-6'>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            <button type='button' className='btn btn-primary' onClick={openModal}>
              <i className='ki-duotone ki-plus fs-2' />
              Add Usertable Experience
            </button>
          </div>
        </div>
      </div> */}
      {/*begin::Search*/}

      {/*end::Search*/}


      <div className='card-header border-0 pt-6'>
        {/*begin::Card title*/}
        <div className='card-title'>
          {/*begin::Search*/}
          <div className='d-flex align-items-center position-relative my-1'>
            <i className='ki-duotone ki-magnifier fs-3 position-absolute ms-5'>
              <span className='path1' />
              <span className='path2' />
            </i>
            <input
              type='text'
              value={searchText}
              onChange={handleSearchChange}
              className='form-control form-control-solid w-250px ps-13'
              placeholder='Search user'
              list='suggestionsList'
            />
          </div>
          {/*end::Search*/}
        </div>
        {/*begin::Card title*/}
        {/*begin::Card toolbar*/}
        <div className='card-toolbar'>
          {/*begin::Toolbar*/}
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            {/*begin::Filter*/}
            <button
              type='button'
              className='btn btn-light-primary me-3'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
            >
              <i className='ki-duotone ki-filter fs-2'>
                <span className='path1' />
                <span className='path2' />
              </i>
              Filter
            </button>
            {/*begin::Menu 1*/}

            <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
              {/*begin::Header*/}
              <div className='px-7 py-5'>
                <div className='fs-5 text-dark fw-bold'>Filter Options</div>
              </div>
              {/*end::Header*/}
              {/*begin::Separator*/}
              <div className='separator border-gray-200' />
              {/*end::Separator*/}
              {/*begin::Content*/}
              <div className='px-7 py-5' data-kt-user-table-filter='form'>
                {/*begin::Input group*/}
                <div className='mb-10'>
                  <label className='form-label fs-6 fw-semibold'>Role:</label>
                  <select
                    className='form-select form-select-solid fw-bold select2-hidden-accessible'
                    data-kt-select2='true'
                    data-placeholder='Select option'
                    data-allow-clear='true'
                    data-kt-user-table-filter='role'
                    data-hide-search='true'
                    data-select2-id='select2-data-10-xcgd'
                    tabIndex={-1}
                    aria-hidden='true'
                    data-kt-initialized={1}
                  >
                    <option data-select2-id='select2-data-12-7ubg' />
                    <option value='Administrator'>Administrator</option>
                    <option value='Analyst'>Analyst</option>
                    <option value='Developer'>Developer</option>
                    <option value='Support'>Support</option>
                    <option value='Trial'>Trial</option>
                  </select>
                  <span
                    className='select2 select2-container select2-container--bootstrap5'
                    dir='ltr'
                    data-select2-id='select2-data-11-1ipj'
                    style={{ width: '100%' }}
                  >
                    <span className='selection'>
                      <span
                        className='select2-selection select2-selection--single form-select form-select-solid fw-bold'
                        role='combobox'
                        aria-haspopup='true'
                        aria-expanded='false'
                        tabIndex={0}
                        aria-disabled='false'
                        aria-labelledby='select2-cr0z-container'
                        aria-controls='select2-cr0z-container'
                      >
                        <span
                          className='select2-selection__rendered'
                          id='select2-cr0z-container'
                          role='textbox'
                          aria-readonly='true'
                          title='Select option'
                        >
                          <span className='select2-selection__placeholder'>Select option</span>
                        </span>
                        <span className='select2-selection__arrow' role='presentation'>
                          <b role='presentation' />
                        </span>
                      </span>
                    </span>
                    <span className='dropdown-wrapper' aria-hidden='true' />
                  </span>
                </div>
                {/*end::Input group*/}
                {/*begin::Input group*/}
                <div className='mb-10'>
                  <label className='form-label fs-6 fw-semibold'>Two Step Verification:</label>
                  <select
                    className='form-select form-select-solid fw-bold select2-hidden-accessible'
                    data-kt-select2='true'
                    data-placeholder='Select option'
                    data-allow-clear='true'
                    data-kt-user-table-filter='two-step'
                    data-hide-search='true'
                    data-select2-id='select2-data-13-39pn'
                    tabIndex={-1}
                    aria-hidden='true'
                    data-kt-initialized={1}
                  >
                    <option data-select2-id='select2-data-15-2qcu' />
                    <option value='Enabled'>Enabled</option>
                  </select>
                  <span
                    className='select2 select2-container select2-container--bootstrap5'
                    dir='ltr'
                    data-select2-id='select2-data-14-vo84'
                    style={{ width: '100%' }}
                  >
                    <span className='selection'>
                      <span
                        className='select2-selection select2-selection--single form-select form-select-solid fw-bold'
                        role='combobox'
                        aria-haspopup='true'
                        aria-expanded='false'
                        tabIndex={0}
                        aria-disabled='false'
                        aria-labelledby='select2-kgc5-container'
                        aria-controls='select2-kgc5-container'
                      >
                        <span
                          className='select2-selection__rendered'
                          id='select2-kgc5-container'
                          role='textbox'
                          aria-readonly='true'
                          title='Select option'
                        >
                          <span className='select2-selection__placeholder'>Select option</span>
                        </span>
                        <span className='select2-selection__arrow' role='presentation'>
                          <b role='presentation' />
                        </span>
                      </span>
                    </span>
                    <span className='dropdown-wrapper' aria-hidden='true' />
                  </span>
                </div>
                {/*end::Input group*/}
                {/*begin::Actions*/}
                <div className='d-flex justify-content-end'>
                  <button
                    type='reset'
                    className='btn btn-light btn-active-light-primary fw-semibold me-2 px-6'
                    data-kt-menu-dismiss='true'
                    data-kt-user-table-filter='reset'
                  >
                    Reset
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary fw-semibold px-6'
                    data-kt-menu-dismiss='true'
                    data-kt-user-table-filter='filter'
                  >
                    Apply
                  </button>
                </div>
                {/*end::Actions*/}
              </div>
              {/*end::Content*/}
            </div>
            {/*end::Menu 1*/}
            {/*end::Filter*/}
            {/*begin::Export*/}
            <button
              type='button'
              className='btn btn-light-primary me-3'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_export_users'
            >
              <i className='ki-duotone ki-exit-up fs-2'>
                <span className='path1' />
                <span className='path2' />
              </i>
              Export
            </button>
            {/*end::Export*/}
            {/*begin::Add user*/}
            {/* <div className='card-header border-0 pt-6'>
              <div className='card-toolbar'>
                <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
                  <button type='button' className='btn btn-primary' onClick={openModal}>
                    <i className='ki-duotone ki-plus fs-2' />
                    Add User
                  </button>
                </div>
              </div>
            </div> */}
            <button type='button' className='btn btn-primary' onClick={openModal}>
              <i className='ki-duotone ki-plus fs-2' />
              Add User
            </button>
            {/*end::Add user*/}
          </div>
          {/*end::Toolbar*/}
          {/*begin::Group actions*/}
          <div
            className='d-flex justify-content-end align-items-center d-none'
            data-kt-user-table-toolbar='selected'
          >
            <div className='fw-bold me-5'>
              <span className='me-2' data-kt-user-table-select='selected_count' />
              Selected
            </div>
            <button
              type='button'
              className='btn btn-danger'
              data-kt-user-table-select='delete_selected'
            >
              Delete Selected
            </button>
          </div>
          {/*end::Group actions*/}
          {/*begin::Modal - Adjust Balance*/}
          <div className='modal fade' id='kt_modal_export_users' tabIndex={-1} aria-hidden='true'>
            {/*begin::Modal dialog*/}
            <div className='modal-dialog modal-dialog-centered mw-650px'>
              {/*begin::Modal content*/}
              <div className='modal-content'>
                {/*begin::Modal header*/}
                <div className='modal-header'>
                  {/*begin::Modal title*/}
                  <h2 className='fw-bold'>Export Users</h2>
                  {/*end::Modal title*/}
                  {/*begin::Close*/}
                  <div
                    className='btn btn-icon btn-sm btn-active-icon-primary'
                    data-kt-users-modal-action='close'
                  >
                    <i className='ki-duotone ki-cross fs-1'>
                      <span className='path1' />
                      <span className='path2' />
                    </i>
                  </div>
                  {/*end::Close*/}
                </div>
                {/*end::Modal header*/}
                {/*begin::Modal body*/}
                <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                  {/*begin::Form*/}
                  <form
                    id='kt_modal_export_users_form'
                    className='form fv-plugins-bootstrap5 fv-plugins-framework'
                    action='#'
                  >
                    {/*begin::Input group*/}
                    <div className='fv-row mb-10'>
                      {/*begin::Label*/}
                      <label className='fs-6 fw-semibold form-label mb-2'>Select Roles:</label>
                      {/*end::Label*/}
                      {/*begin::Input*/}
                      <select
                        name='role'
                        data-control='select2'
                        data-placeholder='Select a role'
                        data-hide-search='true'
                        className='form-select form-select-solid fw-bold select2-hidden-accessible'
                        data-select2-id='select2-data-16-qg7l'
                        tabIndex={-1}
                        aria-hidden='true'
                        data-kt-initialized={1}
                      >
                        <option data-select2-id='select2-data-18-ffnp' />
                        <option value='Administrator'>Administrator</option>
                        <option value='Analyst'>Analyst</option>
                        <option value='Developer'>Developer</option>
                        <option value='Support'>Support</option>
                        <option value='Trial'>Trial</option>
                      </select>
                      <span
                        className='select2 select2-container select2-container--bootstrap5'
                        dir='ltr'
                        data-select2-id='select2-data-17-np7v'
                        style={{ width: '100%' }}
                      >
                        <span className='selection'>
                          <span
                            className='select2-selection select2-selection--single form-select form-select-solid fw-bold'
                            role='combobox'
                            aria-haspopup='true'
                            aria-expanded='false'
                            tabIndex={0}
                            aria-disabled='false'
                            aria-labelledby='select2-role-zb-container'
                            aria-controls='select2-role-zb-container'
                          >
                            <span
                              className='select2-selection__rendered'
                              id='select2-role-zb-container'
                              role='textbox'
                              aria-readonly='true'
                              title='Select a role'
                            >
                              <span className='select2-selection__placeholder'>Select a role</span>
                            </span>
                            <span className='select2-selection__arrow' role='presentation'>
                              <b role='presentation' />
                            </span>
                          </span>
                        </span>
                        <span className='dropdown-wrapper' aria-hidden='true' />
                      </span>
                      {/*end::Input*/}
                    </div>
                    {/*end::Input group*/}
                    {/*begin::Input group*/}
                    <div className='fv-row mb-10 fv-plugins-icon-container'>
                      {/*begin::Label*/}
                      <label className='required fs-6 fw-semibold form-label mb-2'>
                        Select Export Format:
                      </label>
                      {/*end::Label*/}
                      {/*begin::Input*/}
                      <select
                        name='format'
                        data-control='select2'
                        data-placeholder='Select a format'
                        data-hide-search='true'
                        className='form-select form-select-solid fw-bold select2-hidden-accessible'
                        data-select2-id='select2-data-19-m6l2'
                        tabIndex={-1}
                        aria-hidden='true'
                        data-kt-initialized={1}
                      >
                        <option data-select2-id='select2-data-21-mhro' />
                        <option value='excel'>Excel</option>
                        <option value='pdf'>PDF</option>
                        <option value='cvs'>CVS</option>
                        <option value='zip'>ZIP</option>
                      </select>
                      <span
                        className='select2 select2-container select2-container--bootstrap5'
                        dir='ltr'
                        data-select2-id='select2-data-20-95g7'
                        style={{ width: '100%' }}
                      >
                        <span className='selection'>
                          <span
                            className='select2-selection select2-selection--single form-select form-select-solid fw-bold'
                            role='combobox'
                            aria-haspopup='true'
                            aria-expanded='false'
                            tabIndex={0}
                            aria-disabled='false'
                            aria-labelledby='select2-format-hp-container'
                            aria-controls='select2-format-hp-container'
                          >
                            <span
                              className='select2-selection__rendered'
                              id='select2-format-hp-container'
                              role='textbox'
                              aria-readonly='true'
                              title='Select a format'
                            >
                              <span className='select2-selection__placeholder'>
                                Select a format
                              </span>
                            </span>
                            <span className='select2-selection__arrow' role='presentation'>
                              <b role='presentation' />
                            </span>
                          </span>
                        </span>
                        <span className='dropdown-wrapper' aria-hidden='true' />
                      </span>
                      {/*end::Input*/}
                      <div className='fv-plugins-message-container invalid-feedback' />
                    </div>
                    {/*end::Input group*/}
                    {/*begin::Actions*/}
                    <div className='text-center'>
                      <button
                        type='reset'
                        className='btn btn-light me-3'
                        data-kt-users-modal-action='cancel'
                      >
                        Discard
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                      >
                        <span className='indicator-label'>Submit</span>
                        <span className='indicator-progress'>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2' />
                        </span>
                      </button>
                    </div>
                    {/*end::Actions*/}
                  </form>
                  {/*end::Form*/}
                </div>
                {/*end::Modal body*/}
              </div>
              {/*end::Modal content*/}
            </div>
            {/*end::Modal dialog*/}
          </div>
          {/*end::Modal - New Card*/}
          {/*begin::Modal - Add task*/}
          <div className='modal fade' id='kt_modal_add_user' tabIndex={-1} aria-hidden='true'>
            {/*begin::Modal dialog*/}
            <div className='modal-dialog modal-dialog-centered mw-650px'>
              {/*begin::Modal content*/}
              <div className='modal-content'>
                {/*begin::Modal header*/}
                <div className='modal-header' id='kt_modal_add_user_header'>
                  {/*begin::Modal title*/}
                  <h2 className='fw-bold'>Add User</h2>
                  {/*end::Modal title*/}
                  {/*begin::Close*/}
                  <div
                    className='btn btn-icon btn-sm btn-active-icon-primary'
                    data-kt-users-modal-action='close'
                  >
                    <i className='ki-duotone ki-cross fs-1'>
                      <span className='path1' />
                      <span className='path2' />
                    </i>
                  </div>
                  {/*end::Close*/}
                </div>
                {/*end::Modal header*/}
                {/*begin::Modal body*/}
                <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                  {/*begin::Form*/}
                  <form
                    id='kt_modal_add_user_form'
                    className='form fv-plugins-bootstrap5 fv-plugins-framework'
                    action='#'
                  >
                    {/*begin::Scroll*/}
                    <div
                      className='d-flex flex-column scroll-y me-n7 pe-7'
                      id='kt_modal_add_user_scroll'
                      data-kt-scroll='true'
                      data-kt-scroll-activate='{default: false, lg: true}'
                      data-kt-scroll-max-height='auto'
                      data-kt-scroll-dependencies='#kt_modal_add_user_header'
                      data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                      data-kt-scroll-offset='300px'
                      style={{}}
                    >
                      {/*begin::Input group*/}
                      <div className='fv-row mb-7'>
                        {/*begin::Label*/}
                        <label className='d-block fw-semibold fs-6 mb-5'>Avatar</label>
                        {/*end::Label*/}
                        {/*begin::Image placeholder*/}
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              ".image-input-placeholder { background-image: url('assets/media/svg/files/blank-image.svg'); } [data-bs-theme=\"dark\"] .image-input-placeholder { background-image: url('assets/media/svg/files/blank-image-dark.svg'); }",
                          }}
                        />
                        {/*end::Image placeholder*/}
                        {/*begin::Image input*/}
                        <div
                          className='image-input image-input-outline image-input-placeholder'
                          data-kt-image-input='true'
                        >
                          {/*begin::Preview existing avatar*/}
                          <div
                            className='image-input-wrapper w-125px h-125px'
                            style={{
                              backgroundImage: 'url(assets/media/avatars/300-6.jpg)',
                            }}
                          />
                          {/*end::Preview existing avatar*/}
                          {/*begin::Label*/}
                          <label
                            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                            data-kt-image-input-action='change'
                            data-bs-toggle='tooltip'
                            aria-label='Change avatar'
                            data-bs-original-title='Change avatar'
                            data-kt-initialized={1}
                          >
                            <i className='ki-duotone ki-pencil fs-7'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                            {/*begin::Inputs*/}
                            <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
                            <input type='hidden' name='avatar_remove' />
                            {/*end::Inputs*/}
                          </label>
                          {/*end::Label*/}
                          {/*begin::Cancel*/}
                          <span
                            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                            data-kt-image-input-action='cancel'
                            data-bs-toggle='tooltip'
                            aria-label='Cancel avatar'
                            data-bs-original-title='Cancel avatar'
                            data-kt-initialized={1}
                          >
                            <i className='ki-duotone ki-cross fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                          </span>
                          {/*end::Cancel*/}
                          {/*begin::Remove*/}
                          <span
                            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                            data-kt-image-input-action='remove'
                            data-bs-toggle='tooltip'
                            aria-label='Remove avatar'
                            data-bs-original-title='Remove avatar'
                            data-kt-initialized={1}
                          >
                            <i className='ki-duotone ki-cross fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                          </span>
                          {/*end::Remove*/}
                        </div>
                        {/*end::Image input*/}
                        {/*begin::Hint*/}
                        <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
                        {/*end::Hint*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div className='fv-row mb-7 fv-plugins-icon-container'>
                        {/*begin::Label*/}
                        <label className='required fw-semibold fs-6 mb-2'>Full Name</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <input
                          type='text'
                          name='user_name'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder='Full name'
                          defaultValue='Emma Smith'
                        />
                        {/*end::Input*/}
                        <div className='fv-plugins-message-container invalid-feedback' />
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div className='fv-row mb-7 fv-plugins-icon-container'>
                        {/*begin::Label*/}
                        <label className='required fw-semibold fs-6 mb-2'>Email</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <input
                          type='email'
                          name='user_email'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder='example@domain.com'
                          defaultValue='smith@kpmg.com'
                        />
                        {/*end::Input*/}
                        <div className='fv-plugins-message-container invalid-feedback' />
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div className='mb-7'>
                        {/*begin::Label*/}
                        <label className='required fw-semibold fs-6 mb-5'>Role</label>
                        {/*end::Label*/}
                        {/*begin::Roles*/}
                        {/*begin::Input row*/}
                        <div className='d-flex fv-row'>
                          {/*begin::Radio*/}
                          <div className='form-check form-check-custom form-check-solid'>
                            {/*begin::Input*/}
                            <input
                              className='form-check-input me-3'
                              name='user_role'
                              type='radio'
                              defaultValue={0}
                              id='kt_modal_update_role_option_0'
                            />
                            {/*end::Input*/}
                            {/*begin::Label*/}
                            <label
                              className='form-check-label'
                              htmlFor='kt_modal_update_role_option_0'
                            >
                              <div className='fw-bold text-gray-800'>Administrator</div>
                              <div className='text-gray-600'>
                                Best for business owners and company administrators
                              </div>
                            </label>
                            {/*end::Label*/}
                          </div>
                          {/*end::Radio*/}
                        </div>
                        {/*end::Input row*/}
                        <div className='separator separator-dashed my-5' />
                        {/*begin::Input row*/}
                        <div className='d-flex fv-row'>
                          {/*begin::Radio*/}
                          <div className='form-check form-check-custom form-check-solid'>
                            {/*begin::Input*/}
                            <input
                              className='form-check-input me-3'
                              name='user_role'
                              type='radio'
                              defaultValue={1}
                              id='kt_modal_update_role_option_1'
                            />
                            {/*end::Input*/}
                            {/*begin::Label*/}
                            <label
                              className='form-check-label'
                              htmlFor='kt_modal_update_role_option_1'
                            >
                              <div className='fw-bold text-gray-800'>Developer</div>
                              <div className='text-gray-600'>
                                Best for developers or people primarily using the API
                              </div>
                            </label>
                            {/*end::Label*/}
                          </div>
                          {/*end::Radio*/}
                        </div>
                        {/*end::Input row*/}
                        <div className='separator separator-dashed my-5' />
                        {/*begin::Input row*/}
                        <div className='d-flex fv-row'>
                          {/*begin::Radio*/}
                          <div className='form-check form-check-custom form-check-solid'>
                            {/*begin::Input*/}
                            <input
                              className='form-check-input me-3'
                              name='user_role'
                              type='radio'
                              defaultValue={2}
                              id='kt_modal_update_role_option_2'
                            />
                            {/*end::Input*/}
                            {/*begin::Label*/}
                            <label
                              className='form-check-label'
                              htmlFor='kt_modal_update_role_option_2'
                            >
                              <div className='fw-bold text-gray-800'>Analyst</div>
                              <div className='text-gray-600'>
                                Best for people who need full access to analytics data, but don't
                                need to update business settings
                              </div>
                            </label>
                            {/*end::Label*/}
                          </div>
                          {/*end::Radio*/}
                        </div>
                        {/*end::Input row*/}
                        <div className='separator separator-dashed my-5' />
                        {/*begin::Input row*/}
                        <div className='d-flex fv-row'>
                          {/*begin::Radio*/}
                          <div className='form-check form-check-custom form-check-solid'>
                            {/*begin::Input*/}
                            <input
                              className='form-check-input me-3'
                              name='user_role'
                              type='radio'
                              defaultValue={3}
                              id='kt_modal_update_role_option_3'
                            />
                            {/*end::Input*/}
                            {/*begin::Label*/}
                            <label
                              className='form-check-label'
                              htmlFor='kt_modal_update_role_option_3'
                            >
                              <div className='fw-bold text-gray-800'>Support</div>
                              <div className='text-gray-600'>
                                Best for employees who regularly refund payments and respond to
                                disputes
                              </div>
                            </label>
                            {/*end::Label*/}
                          </div>
                          {/*end::Radio*/}
                        </div>
                        {/*end::Input row*/}
                        <div className='separator separator-dashed my-5' />
                        {/*begin::Input row*/}
                        <div className='d-flex fv-row'>
                          {/*begin::Radio*/}
                          <div className='form-check form-check-custom form-check-solid'>
                            {/*begin::Input*/}
                            <input
                              className='form-check-input me-3'
                              name='user_role'
                              type='radio'
                              defaultValue={4}
                              id='kt_modal_update_role_option_4'
                            />
                            {/*end::Input*/}
                            {/*begin::Label*/}
                            <label
                              className='form-check-label'
                              htmlFor='kt_modal_update_role_option_4'
                            >
                              <div className='fw-bold text-gray-800'>Trial</div>
                              <div className='text-gray-600'>
                                Best for people who need to preview content data, but don't need to
                                make any updates
                              </div>
                            </label>
                            {/*end::Label*/}
                          </div>
                          {/*end::Radio*/}
                        </div>
                        {/*end::Input row*/}
                        {/*end::Roles*/}
                      </div>
                      {/*end::Input group*/}
                    </div>
                    {/*end::Scroll*/}
                    {/*begin::Actions*/}
                    <div className='text-center pt-15'>
                      <button
                        type='reset'
                        className='btn btn-light me-3'
                        data-kt-users-modal-action='cancel'
                      >
                        Discard
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                      >
                        <span className='indicator-label'>Submit</span>
                        <span className='indicator-progress'>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2' />
                        </span>
                      </button>
                    </div>
                    {/*end::Actions*/}
                  </form>
                  {/*end::Form*/}
                </div>
                {/*end::Modal body*/}
              </div>
              {/*end::Modal content*/}
            </div>
            {/*end::Modal dialog*/}
          </div>
          {/*end::Modal - Add task*/}
        </div>
        {/*end::Card toolbar*/}
      </div>
      {/*end::Card header*/}

      <div className='card-body py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            role='table'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th colSpan={1} role='columnheader' className='w-10px pe-2'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      data-kt-check='false'
                      data-kt-check-target='#kt_table_users .form-check-input'
                    />
                  </div>
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{ cursor: 'pointer' }}
                >
                  USER
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{ cursor: 'pointer' }}
                >
                  ROLE
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{ cursor: 'pointer' }}
                >
                  LAST LOGIN
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{ cursor: 'pointer' }}
                >
                  TWO STEPS
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{ cursor: 'pointer' }}
                >
                  JOINED DATE
                </th>

                <th
                  colSpan={1}
                  role='columnheader'
                  className='text-end min-w-100px'
                  style={{ cursor: 'pointer' }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' role='rowgroup'>
              {users.map((user) => (
                <tr key={user.id} role='row'>
                  <td role='cell' className=''>
                    <div className='form-check form-check-custom form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        data-kt-check='false'
                        data-kt-check-target='#kt_table_users .form-check-input'
                      />
                    </div>
                  </td>
                  <td className='d-flex align-items-center'>
                    {/*begin:: Avatar */}
                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                      <a href='../../demo1/dist/apps/user-management/users/view.html'>
                        <div className='symbol-label'>
                          <img
                            src={user.image}
                            alt='Ayezan'
                            className='w-100'
                          />
                        </div>
                      </a>
                    </div>
                    {/*end::Avatar*/}
                    {/*begin::User details*/}
                    <div className='d-flex flex-column'>
                      <a
                        href='../../demo1/dist/apps/user-management/users/view.html'
                        className='text-gray-800 text-hover-primary mb-1'
                      >
                        {user.name}
                      </a>
                      <span>{user.email}</span>
                    </div>
                    {/*begin::User details*/}
                  </td>

                  <td role='cell' className=''>
                    {user.role}
                  </td>
                  <td role='cell' className=''>
                    {user.LastLogin}
                  </td>
                  <td role='cell' className=''>
                    {user.twoStep}
                  </td>
                  <td role='cell' className=''>
                    {user.joinedDate}
                  </td>


                  <td role='cell' className='text-end min-w-100px'>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </a>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <UserModal
          closeModal={closeModal}
          addUser={handleAddUser}
          editUser={editUser}
          setEditUser={setEditUser}
          updateExistingUser={updateExistingUser}
        />
      )}
    </div>
  )
}

export default Usertable
