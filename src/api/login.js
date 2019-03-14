import { HOST } from 'common/js/config'
import axios from 'axios'

export function login(userName, passWord) {
  return axios({ method: 'post', url: `${HOST}/login`, data: { userName: userName, passWord: passWord }, withCredentials: true })
}