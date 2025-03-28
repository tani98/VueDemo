import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
  }),
  persist: false,
  getters: {
    getCustomers(state) {
      return state.customers
    },
  },
  actions: {
    async fetchCustomers() {
      try {
        const response = await this.$http.get('/customer')
        console.log(response.data)
        this.data = response.data
      } catch (error) {
        console.log('fetchcustomers ', error)
        if (error.message) {
          notification['error']({
            message: 'Error al obtener los cliente',
            description: error.message,
          })
        }
      }
    },
    async saveCustomer(body) {
      try {
        this.$http.post('/player', body).then((response) => {
          console.log(response)
          this.fetchCustomers()
        })
      } catch (error) {
        console.log('saveCustomer ', error)
        if (error.message) {
          notification['error']({
            message: 'Error al guardar cliente',
            description: error.message,
          })
        }
      }
    },
  },
})
