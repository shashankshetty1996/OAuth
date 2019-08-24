<template>
  <div class="Login">
    <h1>Login Component here</h1>
    <p>Client id is {{ clientID }}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      clientID: ""
    };
  },
  mounted() {
    const { clientID } = this.$route.query;
    this.clientID = clientID;
  }
};
</script>

<style>
</style>