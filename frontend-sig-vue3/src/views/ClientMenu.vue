<template>
  <v-main app class="menu-page">
    <v-container fluid>
      <v-row class="mb-8" justify="center">
        <v-col cols="12" class="text-center">
          <h1>Olá, {{ auth.user.name }}</h1>
          <p>O que deseja fazer?</p>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          v-for="item in clientMenu"
          :key="item.to"
          cols="12"
          md="4"
        >
          <v-card
            class="menu-block"
            elevation="6"
            @click="go(item.to)"
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
  </v-main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()

const clientMenu = [
  {
    label: 'Minhas RNCs',
    to: '/client/list',
    icon: 'mdi-format-list-bulleted',
    subtitle: 'Visualizar suas reclamações enviadas'
  },
  {
    label: 'Nova RNC',
    to: '/client/form',
    icon: 'mdi-plus-box',
    subtitle: 'Cadastrar uma nova reclamação'
  }
]

function go(path) {
  router.push(path)
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
  transition: transform .2s, box-shadow .2s;
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
