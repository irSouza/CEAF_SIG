<template>
  <v-navigation-drawer
    app
    clipped
    width="260"
    class="client-drawer"
  >
    <v-list dense>
      <!-- Home / Menu -->
      <v-list-item @click="$router.push('/client')" class="client-menu-item">
        <v-list-item-icon><v-icon>mdi-home-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Menu</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-divider />

      <!-- Itens do menu Cliente -->
      <v-list-item
        v-for="item in clientMenu"
        :key="item.to"
        :to="item.to"
        link
        class="client-menu-item"
        active-class="client-menu-item--active"
      >
        <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>{{ item.label }}</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-spacer />

      <!-- Logout -->
      <v-list-item @click="logout" class="client-menu-item">
        <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Sair</v-list-item-title></v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app clipped-left color="white" elevation="1">
    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
  </v-app-bar>

  <v-main app class="pa-4 grey lighten-4">
    <router-view />
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

function logout() {
  auth.logout()
  router.push('/')
}

const clientMenu = [
  { label: 'Minhas RNCs', to: '/client/list', icon: 'mdi-format-list-bulleted' },
  { label: 'Nova RNC',    to: '/client/form', icon: 'mdi-plus-box' },
]

const pageTitle = computed(() => {
  const p = route.path
  if (p.startsWith('/client/list')) return 'Minhas RNCs'
  if (p.startsWith('/client/form')) return 'Nova RNC'
  return ''
})
</script>

<style scoped>
.client-drawer {
  background-color: #f2f4f8;
}
.client-menu-item {
  cursor: pointer;
  transition: background .2s;
}
.client-menu-item--active {
  background-color: rgba(20, 94, 252, 0.15) !important;
}
</style>
