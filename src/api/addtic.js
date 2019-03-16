import axios from 'axios'
import { HOST } from 'common/js/config'

export function addTic(ticMes) {
  return axios.post(`${HOST}/addtic`, { ticMes: ticMes })
}

export function editTic(editMes) {
  return axios.post(`${HOST}/editic`, { editMes: editMes })
}

export function delTic(id) {
  return axios.post(`${HOST}/deltic`, { _id: id })
}