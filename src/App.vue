<template>
  <router-view/>
</template>

<script>
  export default{
    name: 'App',
    created(){
      localStorage.clear()
    }
  }
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
</style>

