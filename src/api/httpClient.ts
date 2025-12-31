import router from '@/router'
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

const createAxiosInstance = (): AxiosInstance => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050'
  const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')
  const instance = axios.create({
    baseURL,
    timeout
  })
  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        Cookies.remove('token')
        router.push('/login')
      }
      return Promise.reject(error)
    },
  )
  return instance
}

export const httpClient = {
  get: (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return createAxiosInstance().get(url, config)
  },
  post: (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return createAxiosInstance().post(url, data, config)
  },
  put: (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return createAxiosInstance().put(url, data, config)
  },
  delete: (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return createAxiosInstance().delete(url, config)
  },
}
