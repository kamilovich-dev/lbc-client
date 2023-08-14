import axios, { AxiosInstance } from "axios"

class AxiosClient {

  BASE_URL: string = 'http://localhost:5000/api'
  client: AxiosInstance

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  }

  async getModules(): Promise<TGetModulesResponse | undefined> {
    try {
      return (await this.client.get<TGetModulesResponse>('/module')).data;
    } catch(error) {
      console.log(error)
    }
  }

}

type TModule = {
  id: number,
  name: string,
  description: string,
}

type TGetModulesResponse = {
  modules: TModule[]
}

export { AxiosClient }