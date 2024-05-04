import * as Yup from 'yup'

export interface ICreateAccount {
  registrationId: string
 SentEmail: string
}

const createAccountSchemas = [

  Yup.object({
    registrationId: Yup.string().required().label('Registration Id'),
  }),

  Yup.object({
    SentEmail: Yup.string().required().label('Sent Email'),
  }),
]

const inits: ICreateAccount = {
 registrationId: '',
  SentEmail: 'se201003@dsu.edpk'
}

export {createAccountSchemas, inits}
