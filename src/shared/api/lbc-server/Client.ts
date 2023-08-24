import axios, { AxiosInstance, isAxiosError } from "axios"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { IClient } from './endpoints/types'
import { ApiError } from "./ui/ApiError"

class Client implements IClient {

  BASE_URL: string = 'http://localhost:5000/api'
  ERROR_MESSAGE_DURATION: number = 3000
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

      if (isAxiosError(error)) {

        const appRoot = document.getElementById('root')
        if (appRoot) { //Рендерим компонент с информацией об ошибке
          const errorNodeId = 'lbc-server-api-error'
          appRoot.insertAdjacentHTML('afterbegin', `<div id=${errorNodeId}><div>`)
          const errorRoot = ReactDOM.createRoot(document.getElementById(errorNodeId)!)
          errorRoot.render(React.createElement(ApiError, {
            message: error.response?.statusText ,
            status: error.response?.status,
            duration: this.ERROR_MESSAGE_DURATION
          }, null))

          setTimeout(() => {
            errorRoot.unmount();
          }, this.ERROR_MESSAGE_DURATION);
        }

      }

      throw error
    })

  }
}

export { Client }
