import axios, { AxiosInstance, isAxiosError } from "axios"
import { refreshToken } from '../endpoints/user-endpoints'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiError } from "../ui/ApiError"
import { makeObservable, observable } from "mobx"

class Client {

  BASE_URL: string = import.meta.env.VITE_LBC_SERVER_API_URL
  TIMEOUT = 2000
  MESSAGE_DURATION = 2000
  MESSAGE_NODE_ID = 'lbc-server-api-message'
  axiosInstance!: AxiosInstance
  isLoading = false
  isRetry= false

  logoutCallback: () => Promise<void>

  constructor(logoutCallback: () => Promise<void>) {
    makeObservable(this, {
      isLoading: observable
    })
    this.logoutCallback = logoutCallback
    this.initializeAxiosInstance()
    this.initializeInterceptors()
  }

  initializeAxiosInstance = () => {
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      timeout: this.TIMEOUT,
      validateStatus: function (status) {
        return (status >= 200 && status <= 299)
      },
      withCredentials: true,
    })
  }

  initializeInterceptors = () => {

    this.axiosInstance.interceptors.request.use(async (config) => {
      this.isLoading = true
      // await new Promise( (resolve, reject) => setTimeout(resolve, 2000) )
      const token = localStorage.getItem('token')
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    })

    this.axiosInstance.interceptors.response.use(async response => {
      const res = await new Promise((resolve, reject) => setTimeout(resolve, 1000))
      response.data = {isError: false, ...response.data}
      this.isLoading = false
      return response
    }, async error => {
      const res = await new Promise((resolve, reject) => setTimeout(resolve, 1000))

      const originalRequest = error.config
      if (error.response?.status == 401 && originalRequest && !this.isRetry) {
        this.isRetry = true
        try {
            const response = await refreshToken(this)
            if (response?.accessToken) {
              localStorage.setItem('token', response.accessToken)
              return this.axiosInstance.request(originalRequest)
            }
        } catch(e) {
            console.log('Ошибка при обновлении токена' + e)
        }
      }

      if (error.response?.status == 401 && this.isRetry) {
        this.logoutCallback()
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
        undefined,
        duration: this.MESSAGE_DURATION
      }, null))

      setTimeout(() => root.unmount(), this.MESSAGE_DURATION)
  }

}

export { Client }