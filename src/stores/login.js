import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: '',
    username: '',
  }),
  persist: true,
  getters: {
    getToken(state) {
      return state.token
    },
    getUserName(state) {
      return state.username
    },
  },
  actions: {
    async fetchLogin(body) {
      try {
        const response = await this.$http.post('/auth/login', body)
        this.token = response.data.token
        this.username = body.nickname
        localStorage.setItem('login', this.token)
        this.$router.push('/admin')
      } catch (error) {
        console.log('fetchLogin ', error)
        notification.open({
          message: `Error al iniciar sesión`,
          description: 'Usuario o contraseña incorretos.',
          placement: 'bottom',
        })
      }
    },
  },
})
