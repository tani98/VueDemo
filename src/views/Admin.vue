<template>
  <a-config-provider :theme="colorState">
    <a-layout class="w-full h-full bg-white">
      <a-layout-header class="header">
        <HeaderComponent
          :username="getUserName"
          :collapsed="collapsed"
          :onCollapsed="onCollapsed"
        />
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" :collapsed="collapsed">
          <a-menu
            class="h-full"
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            theme="dark"
            :inline-collapsed="state.collapsed"
            :items="items"
          />
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-layout-content class="mt-1 mx-1 overflow-auto">
            <RouterView />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { ref, reactive, computed, h } from 'vue'
import { TeamOutlined, CarOutlined, UserSwitchOutlined } from '@ant-design/icons-vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import { useLoginStore } from '../stores/login'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
const { t } = i18n.global

const loginStore = useLoginStore()
const router = useRouter()

const collapsed = ref(false)

const colorState = {
  token: {
    colorPrimary: '#3e78b3',
  },
}

const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
})

const items = reactive([
  {
    key: 'customer',
    icon: () => h(TeamOutlined),
    label: t('admin.persons'),
    onclick: () => onClickItem(`/admin/customer`),
    title: 'customer',
  },
  {
    key: 'vehicle',
    icon: () => h(CarOutlined),
    label: t('admin.vehicle'),
    onclick: () => onClickItem(`/admin/vehicle`),
    title: 'vehicle',
  },
  {
    key: 'user',
    icon: () => h(UserSwitchOutlined),
    label: t('admin.users'),
    onclick: () => onClickItem(`/admin/user`),
    title: 'players',
  },
])

const getUserName = computed(() => {
  return loginStore.getUserName
})

const onCollapsed = () => {
  collapsed.value = !collapsed.value
}

const onClickItem = (path) => {
  router.push(path)
}
</script>
