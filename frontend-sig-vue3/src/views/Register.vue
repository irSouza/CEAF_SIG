<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Registrar</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onRegister">
              <v-text-field label="Nome" v-model="name" required />
              <v-text-field label="Email" v-model="email" required />
              <v-text-field label="Senha" v-model="password" type="password" required />
              <v-btn color="primary" type="submit">Cadastrar</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="$router.push('/')">Já tenho conta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const auth = useAuthStore()
    const router = useRouter()
    const onRegister = async () => {
      try {
        await auth.register({ name: name.value, email: email.value, password: password.value })
        alert('Registrado com sucesso')
        router.push('/')
      } catch {
        alert('Erro no cadastro')
      }
    }
    return { name, email, password, onRegister }
  }
}
</script>
