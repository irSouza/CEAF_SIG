<template>
  <v-card class="pa-4">
    <v-card-title>Detalhes RNC</v-card-title>
    <v-card-text><v-list dense>
      <v-list-item v-for="(v,k) in complaint" :key="k">
        <v-list-item-content><v-list-item-title>{{k}}</v-list-item-title><v-list-item-subtitle>{{v}}</v-list-item-subtitle></v-list-item-content>
      </v-list-item>
    </v-list></v-card-text>
    <v-card-actions><v-btn text @click="$router.back()">Voltar</v-btn></v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
const complaint = ref({})
onMounted(async ()=> complaint.value = (await api.get(`/complaints/${useRoute().params.id}`)).data)
</script>
