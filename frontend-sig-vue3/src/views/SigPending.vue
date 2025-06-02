<template>
  <v-container class="pa-4">
    <h2 class="mb-6">Reclamações Pendentes</h2>

    <ComplaintTable :items="pendingComplaints" />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ComplaintTable from '@/components/ComplaintTable.vue'
import { useComplaintsStore } from '@/store/complaints'

const store = useComplaintsStore()
const complaints = ref([])
const route = useRoute()

async function carregar() {
  await store.listAll()
  complaints.value = store.complaints
}

onMounted(carregar)
watch(() => route.fullPath, carregar)

const pendingComplaints = computed(() =>
  complaints.value.filter(c => c.status === 'pending')
)
</script>

<style scoped>
h2 {
  font-weight: 600;
}
</style>
