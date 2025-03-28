<template>
  <a-table :columns="columns" :data-source="getVehicles" :scroll="{ x: 600, y: 440 }" bordered>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <a @click="onEdit(record)">{{ $t('vehicle.edit') }} </a>
        </span>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="openModal" :title="`Editar ${formState.title}`" @cancel="onClose">
    <template #footer>
      <a-button key="back" @click="onClose">{{ $t('common.cancel') }}</a-button>
      <a-button key="submit" type="primary" class="bg-[#f45d1c]" @click="onSubmit">{{
        $t('common.update')
      }}</a-button>
    </template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item name="brand" :label="t('vehicle.brand')">
        <a-input v-model:value="formState.brand" />
      </a-form-item>
      <a-form-item name="model" :label="t('vehicle.model')">
        <a-input v-model:value="formState.model" />
      </a-form-item>
      <a-form-item name="chassis" :label="t('vehicle.chassis')">
        <a-input v-model:value="formState.chassis" />
      </a-form-item>
      <a-form-item name="color" :label="t('vehicle.color')">
        <a-input v-model:value="formState.color" />
      </a-form-item>
      <a-form-item name="year" :label="t('vehicle.year')">
        <a-input v-model:value="formState.year" />
      </a-form-item>
      <a-form-item name="plate" :label="t('vehicle.plate')">
        <a-input v-model:value="formState.plate" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { computed, onMounted, ref, toRaw, reactive } from 'vue'
import { useVehicleStore } from '../stores/vehicle'

import i18n from '@/i18n'
const { t } = i18n.global

const store = useVehicleStore()

const initState = {
  title: '',
  tag: null,
  url: null,
}

const labelCol = {
  style: {
    width: '160px',
  },
}

const wrapperCol = {
  span: 16,
}

const formState = reactive({ ...initState })
const openModal = ref(false)

const getVehicles = computed(() => {
  return store.getVehicles
})

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: t('vehicle.brand'),
    dataIndex: 'brand',
  },
  {
    title: t('vehicle.model'),
    dataIndex: 'model',
  },
  {
    title: t('vehicle.chassis'),
    dataIndex: 'chassis',
  },
  {
    title: t('vehicle.color'),
    dataIndex: 'color',
  },
  {
    title: t('vehicle.year'),
    dataIndex: 'year',
  },
  {
    title: t('vehicle.plate'),
    dataIndex: 'plate',
  },
  {
    title: t('common.action'),
    key: 'action',
  },
]

const onSubmit = () => {
  var body = toRaw(formState)

  onClose()
}

const onEdit = (record) => {}

const onClose = () => {
  openModal.value = false
  Object.assign(formState, {})
}

onMounted(() => {
  store.fetchVehicle()
})
</script>
