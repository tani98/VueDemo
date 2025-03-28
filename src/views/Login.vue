<template>
  <a-form
    :model="formState"
    autocomplete="on"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    @finish="onFinish"
  >
    <a-form-item
      :label="t('login.username')"
      name="nickname"
      :rules="[{ required: true, message: t('required.username') }]"
    >
      <a-input v-model:value="formState.nickname"
        ><template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      :label="t('login.password')"
      name="password"
      :rules="[{ required: true, message: t('required.password') }]"
    >
      <a-input-password v-model:value="formState.password"
        ><template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">{{ $t('login.enter') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useLoginStore } from '../stores/login'

import i18n from '@/i18n'
const { t } = i18n.global

const store = useLoginStore()

const initState = {
  nickname: '',
  password: '',
}

const formState = reactive({ ...initState })

const onFinish = (values) => {
  console.log('Success:', values)
  var body = toRaw(formState)
  store.fetchLogin(body)
}
</script>
