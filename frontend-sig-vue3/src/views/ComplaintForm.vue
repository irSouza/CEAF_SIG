<template>
  <v-container>
    <h2 class="mb-4">Cadastrar RNC</h2>
    <v-card class="pa-4">
      <v-form @submit.prevent="onSubmit">
        <v-row dense>
          <v-col cols="12" sm="6"><v-text-field label="FY" v-model="form.fy" type="number" required/></v-col>
          <v-col cols="12" sm="6"><v-text-field label="Bag Code" v-model="form.bagCode" required/></v-col>
          <v-col cols="12" sm="6"><v-text-field label="Lote" v-model="form.lotNumber" required/></v-col>
          <v-col cols="12" sm="6"><v-text-field label="Qtd Afetada" v-model="form.affectedBags" type="number" required/></v-col>
          <v-col cols="12"><v-text-field label="Causa Geral" v-model="form.generalCause" required/></v-col>
          <v-col cols="12"><v-textarea label="Descrição" v-model="form.description" required/></v-col>
          <v-col cols="12"><v-checkbox label="Possui Amostra?" v-model="form.hasSample"/></v-col>
          <v-col cols="12"><v-file-input label="Anexos" v-model="form.attachments" multiple/></v-col>
          <v-col cols="12"><v-btn color="primary" type="submit">Enviar RNC</v-btn></v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { ref } from 'vue'
import { useComplaintsStore } from '../store/complaints'
import { useRouter } from 'vue-router'
export default {
  setup(){
    const form = ref({ fy:new Date().getFullYear(), bagCode:'', lotNumber:'', affectedBags:null, generalCause:'', description:'', hasSample:false, attachments:[] })
    const store = useComplaintsStore(), router = useRouter()
    const onSubmit = async() => {
      await store.create(form.value)
      alert('RNC enviada')
      router.push('/client')
    }
    return { form,onSubmit }
  }
}
</script>
