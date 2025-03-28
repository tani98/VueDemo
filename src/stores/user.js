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
        const response = await this.$http.get('/user')
        console.log(response.data)
        this.data = response.data
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
        this.$http.post('/player', body).then((response) => {
          console.log(response)
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
