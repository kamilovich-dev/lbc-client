import axios, { AxiosInstance, isAxiosError } from "axios"
import { refreshToken } from '../endpoints/user-endpoints'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiError } from "../ui/ApiError"

class Client {

  BASE_URL: string = import.meta.env.VITE_LBC_SERVER_API_URL
  MESSAGE_DURATION = 2000
  MESSAGE_NODE_ID = 'lbc-server-api-message'
  axiosInstance: AxiosInstance
  isLoading = false































































































































































































  isRetry= false

  constructor() {

    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      timeout: 2000,
      validateStatus: function (status) {
        return (status >= 200 && status <= 299)
      },
      withCredentials: true,
    })
    this.initializeInterceptors()

  }

  initializeInterceptors() {

    this.axiosInstance.interceptors.request.use((config) => {
      this.isLoading = true
      const token = localStorage.getItem('token')
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    })

    this.axiosInstance.interceptors.response.use(response => {
      response.data = {isError: false, ...response.data}
      this.isLoading = false
      return response
    }, async error => {
      const originalRequest = error.config
      if (error.response?.status == 401 && originalRequest && !this.isRetry) {
        this.isRetry = true
        try {
            const response = await refreshToken(this)
            if (response?.accessToken) localStorage.setItem('token', response.accessToken)
            return this.axiosInstance.request(originalRequest)
        } catch(e) {
            console.log('Ошибка при обновлении токена' + e)
        }
      }

      if (error.response?.status == 401 && this.isRetry) {
        localStorage.removeItem('token')
      }

      let message = ''
      if (isAxiosError(error)) {
        if (error.response?.data?.message) message = error.response?.data?.message
          else if (error.response?.statusText) message = error.response.statusText
            else message = error.message

        const status = error.response?.status
        this.renderMessage( ApiError, message, status )
      }

      if (error.response) {
        error.response.data = {isError: true, ...error.response.data}
      } else {
        error.response = {
          data: {isError: true, message}
        }
      }

      this.isLoading = false
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

export { Client }