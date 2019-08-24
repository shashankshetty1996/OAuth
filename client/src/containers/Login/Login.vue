<template>
  <div class="Login">
    <p>Client id is {{ clientID }}</p>
    <InputField
      type="email"
      :value="email"
      name="email"
      placeholder="Email ID"
      @updateValue="updateValue"
    />
    <InputField
      type="password"
      :value="password"
      name="password"
      placeholder="Password"
      @updateValue="updateValue"
    />
  </div>
</template>

<script>
import InputField from "../../components/InputField/InputField";

export default {
  name: "Login",
  data() {
    return {
      clientID: "",
      email: "",
      password: ""
    };
  },
  methods: {
    updateValue(dataName, dataValue) {
      this[dataName] = dataValue;
    }
  },
  mounted() {
    const { clientID } = this.$route.query;
    this.clientID = clientID;
  },
  components: {
    InputField
  }
};
</script>

<style>
</style>