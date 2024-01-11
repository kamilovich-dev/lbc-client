import axios, { AxiosInstance, isAxiosError } from "axios"
import { refreshToken } from '../endpoints/user-endpoints'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiError } from "../ui/ApiError"

class Client implements IClient {

  BASE_URL: string = import.meta.env.VITE_LBC_SERVER_API_URL
  MESSAGE_DURATION: number = 2000
  MESSAGE_NODE_ID: string = 'lbc-server-api-message'
  axiosInstance: AxiosInstance
  isRetry: boolean = false

  constructor() {

    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      validateStatus: function (status) {
        return (status >= 200 && status <= 299)
      },
      withCredentials: true,
    })
    this.initializeInterceptors()

  }

  initializeInterceptors() {

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    })

    this.axiosInstance.interceptors.response.use(response => {
      return response
    }, async error => {
      const originalRequest = error.config
      if (error.response.status == 401 && originalRequest && !this.isRetry) {
        this.isRetry = true
        try {
            const response = await refreshToken(this)
            if (response?.accessToken) localStorage.setItem('token', response.accessToken)
            return this.axiosInstance.request(originalRequest)
        } catch(e) {
            console.log('Ошибка при обновлении токена' + e)
        }
      }

      if (error.response.status == 401 && this.isRetry) {
        localStorage.removeItem('token')
      }

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
  isRetry: boolean,
  initializeInterceptors: () => void,
  renderMessage: (
      component: (args: any) => JSX.Element,
      message: string | undefined,
      status: number | undefined
  ) => void,
}

export { Client }
export type { IClient }
