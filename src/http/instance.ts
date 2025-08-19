import { useHttpClient, HttpClient } from "./common.ts"
import { type AxiosResponse, type AxiosError } from "axios"
console.log(import.meta.env.VITE_PHP_API_BASE_URL)
const httpPhp: HttpClient = useHttpClient({ baseURL: import.meta.env.VITE_PHP_API_BASE_URL })

httpPhp.onResponseSuccess((response: AxiosResponse) => {
  console.log("onResponseSuccess", response)
  if (response.data.code === 200) {
    return response.data
  } else {
    return Promise.reject(response.data)
  }
})

httpPhp.onResponseError((error: AxiosError) => {
  console.log("onResponseError", error)
  return Promise.reject(error)
})

export { httpPhp }
