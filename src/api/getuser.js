import { HOST } from "common/js/config";
import axios from "axios";

export function getUser() {
  return axios.get(`${HOST}/getuser`);
}

export function editUser(editMes) {
  return axios.post(`${HOST}/edituser`, { editMes: editMes });
}
