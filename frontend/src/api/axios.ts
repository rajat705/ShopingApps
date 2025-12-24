import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000",
})

api.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer fake-token"
  return config
})
export default api