import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `${API_URL}/users/query`

// const getUsers = (query: string): Promise<UsersQueryResponse> => {
//   // return axios
//   //   .get(`${GET_USERS_URL}?${query}`)
//   //   .then((d: AxiosResponse<UsersQueryResponse>) => {
//   //     console.log(d.data);
//   //     return d.data
//   //   })
// }


const getUsers = (query: string): any => {
  return [

    {
id:5,
  name: "aezan",
  avatar: "gfdsfds",
  email: "go@ojkfs"
  // position?: string
  // role?: string
  // last_login?: string
  // two_steps?: boolean
  // joined_day?: string
  // online?: boolean
  // initials?: {
  //   label: string
  //   state: string
    },
    {
      id:5,
  name: "aezannbn",
  avatar: "gfdsfds",
  email: "go@ojkfs"

    }

  ]
}
  

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
