<template>
  <v-app-bar app color="white" elevation="1">
    <v-toolbar-title class="cursor-pointer" @click="$router.push('/')">
      <img src="/logo.png" alt="SIG" height="32"/>
    </v-toolbar-title>
    <v-spacer/>
    <v-btn text to="/sig">Painel SIG</v-btn>
    <v-btn text to="/company">Painel Empresa</v-btn>
    <v-btn text to="/client">Meus RNCs</v-btn>
    <v-spacer/>
    <span v-if="auth.user.name" class="mr-4">Olá, {{auth.user.name}}</span>
    <v-btn icon v-if="auth.token" @click="auth.logout(); $router.push('/')">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
  <v-main class="pa-6">
    <v-container max-width="lg"><slot/></v-container>
  </v-main>
  <v-footer padless class="justify-center py-4">
    <span>© 2025 SIG Embalagens</span>
  </v-footer>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
const auth = useAuthStore()
</script>
