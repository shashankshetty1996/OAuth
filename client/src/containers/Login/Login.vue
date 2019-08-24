<template>
  <div class="login">
    <p class="banner-text">Client id is {{ clientID }}</p>
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
.login {
  padding: 10px 15%;
}
.banner-text {
  color: #1faced;
  font-size: 24px;
  font-weight: 700;
  margin: 48px 0;
}
</style>