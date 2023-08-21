import axios, { AxiosInstance } from "axios"
import { IClient } from './endpoints/types'

class Client implements IClient {

  BASE_URL: string = 'http://localhost:5000/api'
  axiosInstance: AxiosInstance

  constructor() {
    const accessToken = sessionStorage.getItem('token')

    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      validateStatus: function (status) {
        return (status >= 200 && status <= 299)
      }
    })

    this.axiosInstance.interceptors.response.use(response => {
      return response
    }, error => {

      throw error
    })

  }
}

export { Client }
