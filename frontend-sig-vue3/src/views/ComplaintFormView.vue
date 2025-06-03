<template>
  <v-container class="pa-4">
    <h2 class="mb-6">Nova Reclamação (RNC)</h2>

    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.customer" label="Cliente" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="form.criticalImportance"
            :items="[1, 2, 3]"
            label="Importância Crítica (1 a 3)"
            required
          ></v-select>
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="form.description" label="Descrição" required></v-textarea>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="form.bagCode" label="Código do Bag" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="form.lotNumber" label="Número do Lote" required></v-text-field>
        </v-col>


        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.affectedBags"
            label="Bags Afetados"
            type="number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-radio-group v-model="form.hasSample" row>
            <label class="mb-2">Disponibilidade de Amostra</label>
            <v-radio label="Sim" :value="true"></v-radio>
            <v-radio label="Não" :value="false"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12">
          <v-file-input
            v-model="form.attachments"
            label="Anexos"
            multiple
            prepend-icon="mdi-paperclip"
            show-size
          ></v-file-input>
        </v-col>

        <v-col cols="12" class="text-end">
          <v-btn color="primary" type="submit">Enviar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  customer: '',
  criticalImportance: null,
  generalCause: '',
  description: '',
  bagCode: '',
  lotNumber: '',
  machine: '',
  affectedBags: '',
  hasSample: null,
  attachments: [],
})

async function submitForm() {
  const data = new FormData()
  for (const key in form.value) {
    if (key === 'attachments') {
      form.value.attachments.forEach(file => data.append('attachments', file))
    } else {
      data.append(key, form.value[key])
    }
  }
  data.append('fy', new Date().getFullYear())
  data.append('firstContactAt', new Date().toISOString())

  const res = await fetch('/complaints', {
    method: 'POST',
    headers: { Authorization: `Bearer ${auth.token}` },
    body: data
  })

  if (res.ok) {
    router.push('/client/list')
  } else {
    alert('Erro ao enviar RNC')
  }
}
</script>

<style scoped>
h2 {
  font-weight: 600;
  color: black;
}
</style>
