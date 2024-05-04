import * as Yup from 'yup'

export interface ICreateAccount {
    registrationId: string
    name: string
    email: string
}

const createAccountSchemas = [

    Yup.object({
        registrationId: Yup.string().required().label('Registration Id'),
    }),
    Yup.object({
        name: Yup.string().required().label('name'),
    }),
    Yup.object({
        email: Yup.string().required().label('email'),
    }),


]

const inits: ICreateAccount = {
    registrationId: '',
    name: '',
    email: ''
}

export { createAccountSchemas, inits }
