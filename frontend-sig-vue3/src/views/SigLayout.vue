<template>
  <!-- Drawer lateral -->
  <v-navigation-drawer
    app
    clipped
    width="260"
    class="sig-drawer"
  >
    <v-list dense>
      <v-list-item
        to="/sig"
        link
        class="sig-menu-item"
        active-class="sig-menu-item--active"
      >
        <v-list-item-icon>
          <v-icon>mdi-home-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item
        v-for="item in sigMenu"
        :key="item.to"
        :to="item.to"
        link
        class="sig-menu-item"
        active-class="sig-menu-item--active"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-spacer />

      <!-- Logout -->
      <v-list-item @click="logout" class="sig-menu-item">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- AppBar deslocado -->
  <v-app-bar app clipped-left color="white" elevation="1">
    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
  </v-app-bar>

  <!-- Conteúdo principal -->
  <v-main class="bg-grey-lighten-4 fill-height">
    <v-container fluid class="pa-6">
      <!-- ✅ Forçar re-render com key -->
      <router-view :key="$route.fullPath" />
    </v-container>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

async function logout() {
  await auth.logout()
  router.push('/')
}

const sigMenu = [
  { label: 'Todas RNCs', to: '/sig/list', icon: 'mdi-format-list-bulleted' },
  { label: 'Pendentes',  to: '/sig/pending', icon: 'mdi-clock-alert' }
]

const pageTitle = computed(() => {
  const p = route.path
  if (p.startsWith('/sig/list')) return 'Todas RNCs'
  if (p.startsWith('/sig/pending')) return 'Pendentes'
  return 'Menu'
})
</script>

<style scoped>
.sig-drawer {
  background-color: #f2f4f8;
}
.sig-menu-item {
  cursor: pointer;
  transition: background 0.2s;
}
.sig-menu-item--active {
  background-color: rgba(20, 94, 252, 0.15) !important;
}
</style>
