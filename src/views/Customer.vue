<template>
  <a-list
    class="w-full"
    :grid="{ gutter: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }"
    :data-source="getCustomers"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="width: 280px">
          <template #cover>
            <div v-if="item.picture">
              <a-avatar :size="64" :src="item.picture">{{ letter(item) }}</a-avatar>
            </div>
            <div v-else>
              <a-avatar :size="64" :style="{ backgroundColor: `${randomColor(item.id)}` }">{{
                letter(item)
              }}</a-avatar>
            </div>
          </template>
          <template #actions>
            <EditOutlined @click="edit(item)" />
          </template>
          <template #extra>
            <p>{{ item.id }}</p>
          </template>
          <a-card-meta :title="`${item.name} ${item.lastname}`"> </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
  <a-modal
    :open="openModal"
    @cancel="onClose"
    :title="isEdit ? `${t('customer.edit')}` : `${t('customer.create')}`"
  >
    <template #footer>
      <a-button key="back" @click="onClose">{{ $t('common.cancel') }}</a-button>
      <a-button key="submit" type="primary" @click="onSubmit">{{
        isEdit ? $t('common.update') : $t('common.create')
      }}</a-button>
    </template>

    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="name" :label="t('common.name')">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item name="lastname" :label="t('common.lastname')">
        <a-input v-model:value="formState.lastname" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-float-button @click="addNew">
    <template #icon>
      <PlusOutlined />
    </template>
  </a-float-button>
</template>
<script setup>
import { computed, onMounted, ref, reactive, toRaw } from 'vue'
import { PlusOutlined, EditOutlined } from '@ant-design/icons-vue'
import { useCustomerStore } from '../stores/customer'

import i18n from '@/i18n'
const { t } = i18n.global

const store = useCustomerStore()

const openModal = ref(false)
const isEdit = ref(false)
const colorCache = ref({})
const formRef = ref()

const ACTION = import.meta.env.VITE_APP_IMG_SERVER + '/fileupload'

const initState = {
  id: null,
  name: '',
  lastname: '',
  picture: '',
}

const formState = reactive({ ...initState })

const rules = {
  name: [{ required: true, message: t('required.name') }],
  lastname: [{ required: true, message: t('required.lastname') }],
}

const getCustomers = computed(() => {
  return store.getCustomers
})

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      var body = toRaw(formState)
      console.log(body)
      storeUser.saveUser(body)
      onClose()
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const addNew = () => {
  openModal.value = true
}

const onClose = () => {
  openModal.value = false
  Object.assign(formState, initState)
}

const edit = (record) => {
  Object.assign(formState, {
    id: record.id,
    name: record.name,
    lastname: record.lastname,
  })
  isEdit.value = true
  openModal.value = true
}

const letter = (record) => {
  return `${record.name.substr(0, 1)} ${record.lastname.substr(0, 1)}`
}

const labelCol = {
  style: {
    width: '160px',
  },
}

const wrapperCol = {
  span: 16,
}

const randomColor = (id) => {
  const r = () => Math.floor(256 * Math.random())
  return colorCache.value[id] || (colorCache.value[id] = `rgb(${r()}, ${r()}, ${r()})`)
}

onMounted(() => {
  store.fetchCustomers()
})
</script>
