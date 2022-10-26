<template>
  <center>
    <h1>Stranica koju trazite ne postoji</h1>
    <p>
      <a href="/">Nazad na pocetak! -> </a>
    </p>
  </center>
</template>

<script>

  export default {
    name: 'NotFound',

    created(){
      this.$router.push('/dashboard')
    }
  }

</script>

<style scoped>
  
  center {
    margin: 15vw;
  }

  h1 {
    color: var(--border);
    font-size: 2em;
  }

</style>