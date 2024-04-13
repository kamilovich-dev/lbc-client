import axios, { AxiosInstance, isAxiosError } from "axios"
import { refreshToken } from '../endpoints/user-endpoints'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiError } from "../ui/ApiError"
import { makeObservable, observable, autorun, runInAction } from "mobx"
import { TokenStorage } from "./TokenStorage"

class Client {

  BASE_URL: string = import.meta.env.VITE_LBC_SERVER_API_URL
  TIMEOUT = 10000 /*Axios response timeout*/
  MESSAGE_DURATION = 2000 /*Error message duration*/

  responseDelayTimerID: NodeJS.Timer | undefined = undefined
  RESPONSE_DELAY: number | undefined = undefined /*Set to number to simulate network delay*/

  MESSAGE_NODE_ID = 'lbc-server-api-message'
  axiosInstance!: AxiosInstance
  isLoading = false /*If true - data is fetching*/
  isTryToRefreshToken = false /*Boolean flag to try to refresh token*/
  abortController: AbortController | undefined /*To abort request*/

  constructor() {
    makeObservable(this, {isLoading: observable})
    this.initializeAxiosInstance()
    this.initializeAbortController()
    this.initializeInterceptors()
    autorun(() => console.log(`${this.isLoading ? 'Loading server data' : 'Loaded server data'}`))
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

  initializeAbortController = () => {
    this.abortController = new AbortController()
  }

  setDelay = async () => {
    if (this.RESPONSE_DELAY) {
      clearTimeout(this.responseDelayTimerID)
      await new Promise(resolve => {
        this.responseDelayTimerID = setTimeout(resolve, this.RESPONSE_DELAY)
      } )
    }
  }

  abortRequest = () => {
    console.log('request aborted')
    this.abortController?.abort()
  }

  initializeInterceptors = () => {

    this.axiosInstance.interceptors.request.use(async (config) => {
      runInAction(() => { this.isLoading = true})
      const token = TokenStorage.getToken()
      console.log('token=' + token)
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    })

    this.axiosInstance.interceptors.response.use(async response => {
      await this.setDelay()
      this.isTryToRefreshToken = false
      console.log('got response', response.data)
      response.data = {isError: false, ...response.data}
      runInAction(() => { this.isLoading = false})
      return response
    }, async error => {
      await this.setDelay()

      if (axios.isCancel(error)) {
        return
      }

      const originalRequest = error.config
      if (error.response?.status == 401 && originalRequest && !this.isTryToRefreshToken) {
        this.isTryToRefreshToken = true
        try {
            const response = await refreshToken(this)
            if (response?.accessToken) {
              TokenStorage.setToken(response.accessToken)
              return this.axiosInstance.request(originalRequest)
            }
        } catch(e) {
            console.log('Ошибка при обновлении токена' + e)
        }
      }

      if (error.response?.status == 401 && this.isTryToRefreshToken) {
        TokenStorage.removeToken()
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

      runInAction(() => { this.isLoading = false})
      throw error
    })
  }

  renderMessage = (
      component: (args: any) => JSX.Element,
      message: string | undefined,
      status?: number ) => {

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