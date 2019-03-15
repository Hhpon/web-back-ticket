import axios from 'axios'
import { HOST } from 'common/js/config'

export function addTic(ticMes) {
  return axios.post(`${HOST}/addtic`, { ticMes: ticMes })
}