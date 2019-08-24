<template>
  <div class="input-field">
    <input
      :type="type"
      class="input"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      @input="changeText"
    />
    <span class="clear-text" @click="clearText">X</span>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    value: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "Please enter here"
    }
  },
  methods: {
    changeText($event) {
      const { value: inputValue } = $event.target;
      this.$emit("updateValue", this.name, inputValue);
    },
    clearText($event) {
      this.$emit("updateValue", this.name, "");
    }
  }
};
</script>

<style>
.input-field {
  position: relative;
}

.input {
  border: none;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  outline: none;
  margin: 8px auto;
  max-width: 768px;
  padding: 8px 36px 8px 12px;
  width: 100%;
}

.clear-text {
  background-color: #ad9f9f;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 8px;
  font-weight: bold;
  position: absolute;
  right: 8px;
  padding: 4px 8px;
  transform: translateY(-50%);
  top: 50%;
}
</style>