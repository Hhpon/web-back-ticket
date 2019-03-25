import { HOST } from "common/js/config";
import axios from "axios";

export function getTic() {
  return axios.get(`${HOST}/getic`);
}

export function getSearch(searchText) {
  return axios.post(`${HOST}/getsearch`, { searchText: searchText });
}
