<template>
  <div>
    <h1>Painel Empresa</h1>
    <ComplaintTable :items="complaints"/>
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
