<template>
  <v-container fluid class="login-container">
    <v-card class="login-card" elevation="12">
      <v-card-title class="login-card__header">
        <v-img
          src="/logo.png"
          alt="SIG Embalagens"
          contain
          max-width="140"
          class="login-card__logo"
        />
      </v-card-title>

      <v-card-text class="login-card__body">
        <v-form @submit.prevent="onLogin" ref="formRef">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="mdi-email"
            type="email"
            rounded
            dense
            required
          />
          <v-text-field
            v-model="password"
            label="Senha"
            prepend-inner-icon="mdi-lock"
            type="password"
            rounded
            dense
            required
          />
          <v-btn
            class="login-btn"
            color="primary"
            block
            large
            rounded
            type="submit"
          >
            ACESSAR
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

async function onLogin() {
  try {
    const res = await axios.post('http://localhost:5000/auth/login', {
      email: email.value,
      password: password.value
    })

    const token = res.data.token
    const payload = JSON.parse(atob(token.split('.')[1]))

    // ✅ Atualiza o store e salva no localStorage
    auth.setUser({
      token,
      role: payload.role,
      name: payload.name
    })

    // ✅ Redireciona conforme a role
    if (payload.role === 'SIG') {
      router.push('/sig')
    } else {
      router.push('/client')
    }
  } catch (err) {
    alert('Credenciais inválidas')
    console.error(err)
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f2f4f8 100%);
}

.login-card {
  width: 380px;
  border-radius: 16px;
  overflow: hidden;
}

.login-card__header {
  display: flex;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 0;
  background-color: #ffffff;
}

.login-card__logo {
  margin: 0 auto;
}

.login-card__body {
  padding: 24px;
}

.login-btn {
  margin-top: 24px;
}
</style>
