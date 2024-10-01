<template>
  <a-layout>
    <a-layout-header>
      <a-page-header :title="pageTitle">
        <template #extra>
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <UserOutlined style="color: #fff" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0" @click="() => signOut()">
                  <LogoutOutlined />
                  Cerrar Sesión
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-page-header>
    </a-layout-header>
    <a-layout-content>
      <a-row>
        <a-col :xs="1" :xl="2" :xxl="4"></a-col>
        <a-col :xs="22" :xl="20" :xxl="16"><slot /></a-col>
        <a-col :xs="1" :xl="2" :xxl="4"></a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
const { signOut } = useAuth()
const route = useRoute()

defineProps({
  pageTitle: {
    type: String,
    required: true,
  },
})

const pageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Catálogo de Aplicaciones'
    case '/users':
      return 'Información de Usuarios'
    default:
      return ''
  }
})
</script>

<style scoped>
.ant-layout-header {
  background-color: #004571;
}

.ant-layout-content {
  height: 100%;
  padding: 2rem 0;
}

.ant-page-header {
  color: #fff !important;
}
</style>
