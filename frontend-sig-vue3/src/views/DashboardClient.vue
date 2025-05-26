<template>
  <div>
    <h1>Meus RNCs</h1>
    <ComplaintTable :items="complaints"/>
    <v-btn color="primary" class="mt-4" @click="$router.push('/complaint/new')">Nova RNC</v-btn>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ComplaintTable from '@/components/ComplaintTable.vue'
import { useComplaintsStore } from '@/store/complaints'
const store = useComplaintsStore()
onMounted(() => store.fetchAll())
const complaints = store.complaints
</script>
