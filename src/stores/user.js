import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'

export const usUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  persist: false,
  getters: {
    getUsers(state) {
      return state.users
    },
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await this.$http.get('/auth/user')
        this.users = response.data
      } catch (error) {
        console.log('fetchUsers ', error)
        if (error.message) {
          notification['error']({
            message: 'Error al obtener los usuarios',
            description: error.message,
          })
        }
      }
    },
    async saveUser(body) {
      try {
        this.$http.post('/auth/signup', body).then((response) => {
          this.fetchUsers()
        })
      } catch (error) {
        console.log('saveUser ', error)
        if (error.message) {
          notification['error']({
            message: 'Error al guardar usuario',
            description: error.message,
          })
        }
      }
    },
  },
})
