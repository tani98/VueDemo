import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import api from './api/index'
import i18n from './i18n'

import {
  ConfigProvider,
  StyleProvider,
  Form,
  Menu,
  Input,
  Button,
  Layout,
  Dropdown,
  FloatButton,
  Avatar,
  Card,
  List,
  Upload,
  Modal,
  Table,
} from 'ant-design-vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  ;(store.$http = api), (store.$router = markRaw(router))
})

app.use(pinia)
app.use(router)
app.use(i18n)

app.use(ConfigProvider)
app.use(StyleProvider)
app.use(Form)
app.use(Menu)
app.use(Input)
app.use(Button)
app.use(Layout)
app.use(Dropdown)
app.use(FloatButton)
app.use(Avatar)
app.use(Card)
app.use(List)
app.use(Upload)
app.use(Modal)
app.use(Table)

app.mount('#app')
