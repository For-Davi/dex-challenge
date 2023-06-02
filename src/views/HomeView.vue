<template>
  <div id="login">
    <Login/>
  </div>
</template>

<script>

import Login from '@/components/Login.vue';

export default {
  name: 'HomeView',
  data(){
    return{
      loading: false
    }
  },
  components: {
    Login,
}
}

</script>

<style scoped lang="scss">
  #login{
    background-color: #1b4965;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>