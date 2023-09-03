<template>
  <v-container class="h-screen">
    <v-row class="fill-height text-center" align-content="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-4">AWARD</h1>
        <p class="subheading font-weight-regular mb-4">
          Enter your email address <br />
          to signin and continue
        </p>
        <v-form @submit.prevent="login">
          <v-text-field class="ml-10 mr-10" variant="outlined" v-model="state.email" label="Email" required></v-text-field>
          <v-alert class="pa-2 mb-5 ml-10 mr-10 text-center" v-if="state.error" type="error" icon="">{{ state.error }}</v-alert>
          <v-btn class="pl-10 pr-10" type="submit" size="large" variant="elevated" color="black">Sign In</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Login",
  setup() {
    const state = reactive({
      email: "",
      error: "",
    });

    return {state}
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "POST",
          body: JSON.stringify({ email: this.state.email }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error("Login failed");
        }

        this.$router.push("/home");
      } catch (error) {
        console.log("Invalid email. Please try again.");
        this.state.error = "Invalid email. Please try again.";
        console.log("this.error");
        console.log(this.state.error);
        console.log(error);
      }
    },
  },
};
</script>

<style>
.v-alert__prepend {
  display: none !important;
}
</style>