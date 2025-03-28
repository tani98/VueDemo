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
        this.customers = response.data
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
        this.$http.post('/customer', body).then((response) => {
          if (response.status === 200 || response.status === 201) {
            this.fetchCustomers()
          }
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
