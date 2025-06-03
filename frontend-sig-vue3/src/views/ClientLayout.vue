<template>
  <v-navigation-drawer app clipped width="260" class="client-drawer">
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
        @click="navigate(item.to)"
        :class="['client-menu-item', route.path.startsWith(item.to) ? 'client-menu-item--active' : '']"
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

  <v-main app class="pt-12 pa-6 grey lighten-4">
    <router-view />
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useComplaintsStore } from '@/store/complaints'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const complaintStore = useComplaintsStore()

function logout() {
  auth.logout()
  router.push('/')
}

const clientMenu = [
  { label: 'Minhas RNCs', to: '/client/list', icon: 'mdi-format-list-bulleted' },
  { label: 'Nova RNC',    to: '/client/form', icon: 'mdi-plus-box' }
]

function navigate(path) {
  if (route.path.startsWith(path)) {
    if (path === '/client/list') {
      complaintStore.listAll && complaintStore.listAll()
    }
    if (path === '/client/form') {
      router.push({ path, query: { refresh: Date.now() } }).catch(() => {})
    }
    return
  }
  router.push(path).catch(() => {})
}

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
  transition: background 0.2s;
}
.client-menu-item--active {
  background-color: rgba(20, 94, 252, 0.15) !important;
}
</style>
