import axios, { AxiosRequestConfig } from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'https://patient-haze-3407.getsandbox.com/',
  timeout: 1000
})
AxiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  }
)
export const serviceApi = {
  // eslint-disable-next-line
  get (resource: any, config?: AxiosRequestConfig) {
    return AxiosInstance.get(resource, config)
  },
  // eslint-disable-next-line
  post (resource: any, data?: any, config?: AxiosRequestConfig) {
    return AxiosInstance.post(resource, data, config)
  },
  // eslint-disable-next-line
  put (resource: any, data: any, config?: AxiosRequestConfig) {
    return AxiosInstance.put(resource, data, config)
  },
  // eslint-disable-next-line
  delete (resource: any, config?: AxiosRequestConfig) {
    return AxiosInstance.delete(resource, config)
  }
}
