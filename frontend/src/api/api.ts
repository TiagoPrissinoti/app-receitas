import axios from 'axios'

const envApiUrl = import.meta.env.VITE_API_URL?.trim()
const apiBaseUrl = envApiUrl
  ? envApiUrl.replace(/\/+$/, '')
  : 'http://localhost:3333'

export const api = axios.create({
  baseURL: apiBaseUrl,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function getUploadUrl(image?: string) {
  if (!image) return ''
  return `${apiBaseUrl}/uploads/${image}`
}
