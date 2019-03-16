import { HOST } from 'common/js/config'
import axios from 'axios'

export function getTic() {
  return axios.get(`${HOST}/getic`)
}