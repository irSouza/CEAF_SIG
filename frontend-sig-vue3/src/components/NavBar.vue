<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title @click="$router.push('/')">SIG Reclamações</v-toolbar-title>
    <v-spacer />
    <v-btn text v-if="!auth.token" @click="$router.push('/register')">Cadastrar</v-btn>
    <v-btn text v-if="auth.token" @click="auth.logout(); $router.push('/')">Sair</v-btn>
  </v-app-bar>
</template>

<script>
import { useAuthStore } from '../store/auth'
export default {
  setup() {
    const auth = useAuthStore()
    return { auth }
  }
}
</script>
