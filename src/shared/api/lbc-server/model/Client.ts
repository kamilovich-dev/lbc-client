import axios, { AxiosInstance, isAxiosError } from "axios"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiError } from "../ui/ApiError"

class Client implements IClient {

  BASE_URL: string = import.meta.env.VITE_LBC_SERVER_API_URL
  MESSAGE_DURATION: number = 2000
  MESSAGE_NODE_ID: string = 'lbc-server-api-message'
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

    this.initializeInterceptors()

  }

  initializeInterceptors() {
    this.axiosInstance.interceptors.response.use(response => {

      return response

    }, error => {

      if (isAxiosError(error)) {
        this.renderMessage( ApiError, error.response?.statusText, error.response?.status )
      }

      throw error
    })
  }

  renderMessage = (
      component: (args: any) => JSX.Element,
      message: string | undefined,
      status: number | undefined ) => {

      document.body.insertAdjacentHTML('afterbegin', `<div id=${this.MESSAGE_NODE_ID}><div>`)
      const root = ReactDOM.createRoot(document.getElementById(this.MESSAGE_NODE_ID)!)
      root.render(React.createElement(component, {
        message,
        status,
        duration: this.MESSAGE_DURATION
      }, null))

      setTimeout(() => root.unmount(), this.MESSAGE_DURATION)
  }

}

interface IClient {
  BASE_URL: string,
  MESSAGE_NODE_ID: string,
  MESSAGE_DURATION: number,
  axiosInstance: AxiosInstance,
  initializeInterceptors: () => void,
  renderMessage: (
      component: (args: any) => JSX.Element,
      message: string | undefined,
      status: number | undefined
  ) => void,
}

export { Client }
export type { IClient }
