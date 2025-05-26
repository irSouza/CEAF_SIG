<template>
  <div>
    <h1>Painel SIG</h1>
    <Charts/>
    <ComplaintTable :items="complaints"/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Charts from '@/components/Charts.vue'
import ComplaintTable from '@/components/ComplaintTable.vue'
import { useComplaintsStore } from '@/store/complaints'
const store = useComplaintsStore()
onMounted(() => store.fetchAll())
const complaints = store.complaints
</script>
