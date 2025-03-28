<template>
  <a-list
    class="w-full"
    :grid="{ gutter: 4, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }"
    :data-source="getUsers"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="width: 280px">
          <template #cover>
            <div style="display: flex; justify-content: center; margin-top: 2vh">
              <a-avatar :size="64" :style="{ backgroundColor: `${randomColor(item.id)}` }">{{
                letter(item)
              }}</a-avatar>
            </div>
          </template>
          <div style="display: flex; justify-content: center; margin-top: 2vh">
            <a-card-meta :title="`${item.nickname}`"> </a-card-meta>
          </div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
  <a-modal
    :open="openModal"
    @cancel="onClose"
    :title="isEdit ? `${t('user.edit')}` : `${t('user.create')}`"
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
      <a-form-item name="email" :label="t('common.email')">
        <a-input v-model:value="formState.email" />
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
import { usUserStore } from '../stores/user'

import i18n from '@/i18n'
const { t } = i18n.global

const store = usUserStore()

const openModal = ref(false)
const isEdit = ref(false)
const colorCache = ref({})
const formRef = ref()

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
  email: [{ required: true, message: t('required.email') }],
}

const getUsers = computed(() => {
  return store.getUsers
})

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      var body = toRaw(formState)
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
  return `${record.nickname.substr(0, 1)}`
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
  store.fetchUsers()
})
</script>
