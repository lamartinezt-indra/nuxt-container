<template>
  <div v-if="alert.visible">
    <a-alert
      :message="alert.message"
      :description="alert.description"
      :type="alert.type"
      closable
      show-icon
    />
    <br />
  </div>

  <a-card :bordered="false" style="width: 500px">
    <a-typography-title :level="3" class="title"
      >Iniciar Sesión</a-typography-title
    >
    <a-form
      :model="formState"
      name="loginForm"
      autocomplete="off"
      layout="vertical"
      style="width: 100%"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      @submit="onSubmit"
    >
      <a-form-item
        label="Usuario"
        name="username"
        :rules="[{ required: true, message: 'Ingrese su usuario' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Ingrese su contraseña' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block
          >Iniciar Sesión</a-button
        >
      </a-form-item>
    </a-form>
  </a-card>
  <pre>Versión: 1.0.0</pre>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const router = useRouter()

definePageMeta({
  layout: 'auth-layout',
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' },
})

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})

const alert = reactive<any>({
  message: 'Usuario o contraseña inválida',
  description: '',
  type: 'error',
  visible: false,
})

const { signIn } = useAuth()

const onSubmit = (e: Event) => {
  e.preventDefault()
}

const onFinish = async (values: FormState) => {
  const response = await signIn('credentials', {
    redirect: false,
    username: values.username,
    password: values.password,
  })

  if (response?.error) {
    alert.visible = true

    setTimeout(() => {
      alert.visible = false
    }, 5000)
  } else {
    router.push('/')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
