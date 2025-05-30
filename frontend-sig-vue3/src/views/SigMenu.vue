<template>
  <v-container fluid class="menu-page">
    <v-row class="mb-8" justify="center">
      <v-col cols="12" class="text-center">
        <h1 v-if="auth.user">Bem-vindo, {{ auth.user.name }}</h1>
        <h1 v-else>Saindo...</h1>
        <p>Escolha uma opção abaixo:</p>
      </v-col>
    </v-row>

    <v-row dense v-if="showMenuButtons" justify="center">
      <v-col
        v-for="item in sigMenu"
        :key="item.label"
        cols="12"
        md="4"
      >
        <v-card
          class="menu-block"
          elevation="6"
          @click="go(item)"
        >
          <v-card-title>
            <v-icon class="mr-3">{{ item.icon }}</v-icon>
            <span class="menu-block__title">{{ item.label }}</span>
          </v-card-title>
          <v-card-text class="menu-block__subtitle">
            {{ item.subtitle }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()
const showMenuButtons = ref(true)

async function logout() {
  await auth.logout()
  router.push('/')
}

const sigMenu = [
  {
    label: 'Todas RNCs',
    to: '/sig/list',
    icon: 'mdi-format-list-bulleted',
    subtitle: 'Visualizar todas as reclamações'
  },
  {
    label: 'Dashboard',
    to: '/sig/dashboard',
    icon: 'mdi-chart-bar',
    subtitle: 'Análise mensal das reclamações'
  },
  {
    label: 'Pendentes',
    to: '/sig/pending',
    icon: 'mdi-clock-alert',
    subtitle: 'Ver reclamações não concluídas'
  },
  {
    label: 'Sair',
    to: '',
    icon: 'mdi-logout',
    subtitle: 'Sair do sistema',
    action: logout
  }
]

function go(item) {
  if (item.action) {
    item.action()
  } else {
    router.push(item.to)
  }
}
</script>

<style scoped>
.menu-page {
  background: #f2f4f8;
  min-height: calc(100vh - 64px);
  padding-top: 32px;
}

.menu-block {
  cursor: pointer;
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.menu-block:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.menu-block__title {
  font-size: 1.25rem;
  font-weight: 600;
}

.menu-block__subtitle {
  color: #666;
  font-size: 0.95rem;
}
</style>
