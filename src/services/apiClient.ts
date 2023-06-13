import axios from "axios";
import WPAPI from "wpapi";
import { API_URL_LOCAL_WIN_WP } from "../constants";

// THIS THE TEST WORDPRESS INSTALL IN LOCAL
const RESTROOT = API_URL_LOCAL_WIN_WP;
export const wp = new WPAPI({
  endpoint: RESTROOT,
});

const axiosInstance = axios.create({
  baseURL: API_URL_LOCAL_WIN_WP,
});

// interface IIdentifiable {
//   id: number;
// }

// class APIClient<T extends IIdentifiable, U> {

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  patch = (id: number, updates: Partial<T>) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${id}`, updates)
      .then((res) => res.data);
  };

  delete = (id: number) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
