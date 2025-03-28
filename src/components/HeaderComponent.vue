<template>
  <div style="display: flex">
    <div>
      <MenuUnfoldOutlined
        v-if="props.collapsed"
        style="color: white; font-size: 20px; margin-left: 10px"
        @click="() => props.onCollapsed()"
      />
      <MenuFoldOutlined
        v-else
        style="color: white; font-size: 20px; margin-left: 10px"
        @click="() => props.onCollapsed()"
      />
    </div>
    <div style="position: absolute; right: 10px">
      <a-dropdown>
        <a style="color: white" @click.prevent>
          {{ props.username }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="onClick">
            <a-menu-item key="logout">{{ $t('admin.logout') }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  username: String,
  collapsed: Boolean,
  onCollapsed: Function,
})

const onClick = ({ key }) => {
  if (key == 'logout') {
    localStorage.clear()
    location.reload()
  }
}
</script>
