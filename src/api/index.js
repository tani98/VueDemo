import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const login = localStorage.getItem('login')
    if (login) {
      var json = JSON.parse(login)
      config.headers['Authorization'] = 'Bearer ' + json.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
