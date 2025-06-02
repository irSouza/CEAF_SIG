<template>
  <div class="complaint-form page-container">
    <h1>Nova RNC</h1>
    <!-- Formul&aacute;rio de nova RNC -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input id="nome" v-model="form.nome" type="text" required />
      </div>

      <div class="form-group">
        <label for="descricao">Descri&ccedil;&atilde;o:</label>
        <textarea id="descricao" v-model="form.descricao" rows="4" required></textarea>
      </div>

      <!-- Voc&ecirc; pode adicionar mais campos de formul&aacute;rio aqui -->

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ComplaintFormView',
  data() {
    return {
      form: {
        nome: '',
        descricao: ''
        // outros campos do formul&aacute;rio, se houver
      }
    };
  },
  methods: {
    submitForm() {
      // L&oacute;gica de envio do formul&aacute;rio (ex.: chamar API para salvar a RNC)
      console.log('Formul&aacute;rio enviado:', this.form);
      // Exemplo: p&oacute;s-envio poder&iacute;amos resetar o formul&aacute;rio ou redirecionar
      // this.form.nome = '';
      // this.form.descricao = '';
      // this.$router.push('/alguma/rota');
    }
  }
};
</script>

<style scoped>
.complaint-form.page-container {
  /* Permitir rolagem se o conte&uacute;do do formul&aacute;rio exceder a altura disponível */
  overflow: auto;
  overflow-x: auto;
  flex: 1 1 auto;
  min-height: 0;
}

/* Estilos b&aacute;sicos do formul&aacute;rio */
.form-group {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 0.25em;
  font-weight: bold;
}
.form-group input,
.form-group textarea {
  padding: 0.5em;
  font: inherit;
  max-width: 100%;
  box-sizing: border-box;
}

/* Ajuste responsivo: em telas pequenas, garantir que o form ocupe largura total */
@media (max-width: 600px) {
  .complaint-form form {
    max-width: 100%;
  }
}
</style>
