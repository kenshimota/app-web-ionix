import axios from "axios";
import RequestError from "./request-error";

class RequestAxios {
  constructor() {
    const axiosDefault = axios.default;
    axiosDefault.defaults.baseURL = "http://" + location.hostname + ":4500/api";
    this.token = "";
  }

  setToken(token) {
    this.token = token;
  }

  handleError(report) {
    const response = report && report.response;
    const error = new RequestError(
      "Error desconocido, reportar a su proveedor"
    );

    if (response && response.status && response.data) {
      error.setMessage(response.data.message);
      error.setStatus(response.status);
    }

    throw error;
  }

  post(url, params, headers = {}) {
    if (this.token) headers["Authorization"] = this.token;
    return axios.post(url, params, { headers }).catch(this.handleError);
  }

  get(url, headers = {}) {
    if (this.token) headers["Authorization"] = this.token;
    return axios.get(url, { headers }).catch(this.handleError);
  }

  put(url, params, headers = {}) {
    if (this.token) headers["Authorization"] = this.token;
    return axios.put(url, params, { headers }).catch(this.handleError);
  }

  delete(url, headers = {}) {
    if (this.token) headers["Authorization"] = this.token;
    return axios.delete(url, { headers }).catch(this.handleError);
  }
}

export default new RequestAxios();
