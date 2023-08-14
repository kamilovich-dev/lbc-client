import axios, { AxiosInstance } from "axios"

class Client {

  BASE_URL: string = 'http://localhost:5000/api'
  axiosInstance: AxiosInstance

  constructor(accessToken?: string) {
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  }

}

export { Client }