<template>
  <div class="dashboard-client page-container">
    <h1>Minhas RNCs</h1>
    <!-- Conte&uacute;do da lista de RNCs: tabela ou cards -->
    <table class="rnc-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descri&ccedil;&atilde;o</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rnc in rncs" :key="rnc.id">
          <td>{{ rnc.id }}</td>
          <td>{{ rnc.descricao }}</td>
          <td>{{ rnc.status }}</td>
        </tr>
        <tr v-if="rncs.length === 0">
          <td colspan="3">Nenhum registro encontrado.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DashboardClient',
  data() {
    return {
      // Lista de RNCs do usu&aacute;rio (deve ser carregada via API ou vuex na implementa&ccedil;&atilde;o real)
      rncs: []
    };
  },
  created() {
    // Exemplo: chamada de API para obter as RNCs do cliente
    // axios.get('/api/rncs').then(res => { this.rncs = res.data; });
  }
};
</script>

<style scoped>
.dashboard-client.page-container {
  /* Permitir que o conte&uacute;do expanda e role dentro do container */
  overflow: auto;
  overflow-x: auto;
  flex: 1 1 auto;   /* permite o crescimento (se o pai for flex container) */
  min-height: 0;    /* permite contrair altura em um flex container, evitando overflow */
}

/* Estilos adicionais para melhorar layout da tabela (opcionais) */
.rnc-table {
  width: 100%;
  border-collapse: collapse;
}
.rnc-table th, .rnc-table td {
  border: 1px solid #ccc;
  padding: 0.5em;
  text-align: left;
}
</style>
