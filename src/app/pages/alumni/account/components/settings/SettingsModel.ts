export interface IProfileDetails {
  avatar: string
  fName: string
  mName: string
  lName: string
  ffName: string
  flName: string
  gender: string
  country: string
  email: string
  company: string
  CNIC: string
  contactPhone: string
  DOB: string
  Blood: string
  language: string
  timeZone: string
  currency: string
  communications: {
    email: boolean
    phone: boolean
  }
  allowMarketing: boolean
}

export interface IProfileDetails2 {
  avatar?: string
  first_name: string
  middle_name: string
  last_name: string
  // ffName:string
  // flName:string
  // gender:string
  profile: {
    id: any
    country: string
    timezone: string
    date_of_birth: string
  }
  email: string
  company?: string
  // CNIC:string
  phone: string
  // Blood:string
  // language: string
  // currency: string
  // communications: {
  //   email: boolean
  //   phone: boolean
  // }
  // allowMarketing: boolean
}

export interface IUpdateEmail {
  newEmail: string
  confirmPassword: string
}

export interface IUpdatePassword {
  currentPassword: string
  newPassword: string
  passwordConfirmation: string
}

export interface IConnectedAccounts {
  google: boolean
  github: boolean
  stack: boolean
}

export interface IEmailPreferences {
  successfulPayments: boolean
  payouts: boolean
  freeCollections: boolean
  customerPaymentDispute: boolean
  refundAlert: boolean
  invoicePayments: boolean
  webhookAPIEndpoints: boolean
}

export interface INotifications {
  notifications: {
    email: boolean
    phone: boolean
  }
  billingUpdates: {
    email: boolean
    phone: boolean
  }
  newTeamMembers: {
    email: boolean
    phone: boolean
  }
  completeProjects: {
    email: boolean
    phone: boolean
  }
  newsletters: {
    email: boolean
    phone: boolean
  }
}

export interface IDeactivateAccount {
  confirm: boolean
}

export const profileDetailsInitValues: IProfileDetails = {
  avatar: '/media/avatars/300-1.jpg',
  fName: 'Syed',
  mName: 'Saad',
  lName: 'Luqman',
  ffName: 'Luqman',
  flName: 'M',
  gender: 'Male',
  country: 'Pakistan',
  email: 'saad@gmail.com',
  company: 'DHA Suffa University',
  CNIC: '42102-098582-6',
  contactPhone: '044 3276 454 935',
  DOB: '1-2-1989',
  Blood: 'B+',
  language: '',
  timeZone: '',
  currency: '',
  communications: {
    email: false,
    phone: false,
  },
  allowMarketing: false,
}

export const profileDetailsInitValues2: IProfileDetails2 = {
  avatar: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  profile: {
    id: '',
    country: '',
    date_of_birth: '',
    timezone: '',
  },
  email: '',
  phone: '',
  // currency: '',
  // communications: {
  //   email: false,
  //   phone: false,
  // },
  // allowMarketing: false,
}

export const updateEmail: IUpdateEmail = {
  newEmail: 'support@keenthemes.com',
  confirmPassword: '',
}

export const updatePassword: IUpdatePassword = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: '',
}

export const connectedAccounts: IConnectedAccounts = {
  google: true,
  github: true,
  stack: false,
}

export const emailPreferences: IEmailPreferences = {
  successfulPayments: false,
  payouts: true,
  freeCollections: false,
  customerPaymentDispute: true,
  refundAlert: false,
  invoicePayments: true,
  webhookAPIEndpoints: false,
}

export const notifications: INotifications = {
  notifications: {
    email: true,
    phone: true,
  },
  billingUpdates: {
    email: true,
    phone: true,
  },
  newTeamMembers: {
    email: true,
    phone: false,
  },
  completeProjects: {
    email: false,
    phone: true,
  },
  newsletters: {
    email: false,
    phone: false,
  },
}

export const deactivateAccount: IDeactivateAccount = {
  confirm: false,
}
