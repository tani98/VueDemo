import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicle: [],
  }),
  persist: false,
  getters: {
    getVehicles(state) {
      return state.vehicle
    },
  },
  actions: {
    async fetchVehicle() {
      try {
        const response = await this.$http.get('/vehicle')
        this.data = response.data
      } catch (error) {
        console.log('fetcgVehicle ', error)
        if (error.message) {
          notification['error']({
            message: 'Error al obtener los vehiculos',
            description: error.message,
          })
        }
      }
    },
    async saveVehicle(body) {
      try {
        this.$http.post('/vehicle', body).then((response) => {
          if (response.status === 200 || response.status === 201) {
            this.fetchVehicle()
          }
        })
      } catch (error) {
        console.log('saveVehicle ', error)
        if (error.message) {
          notification['error']({
            message: 'Error al guardar vehiculo',
            description: error.message,
          })
        }
      }
    },
  },
})
