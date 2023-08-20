import axios, { AxiosInstance } from "axios"

class Client {

  BASE_URL: string = 'http://localhost:5000/api'
  axiosInstance: AxiosInstance

  constructor(accessToken?: string) {
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      validateStatus: function (status) {
        return (status >= 200 && status <= 299)
      }
    })
  }

}

export { Client }