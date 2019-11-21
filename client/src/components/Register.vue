<template>
  <div id="form" class="q-pa-md">
    <q-form @submit.prevent="register" style=" width: 420px; height: 460px; padding: 5%;">
      <q-input
        class
        stack-label
        filled
        v-model="username"
        label="Your username *"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'username is required']"
      />
      <q-input
        class
        filled
        stack-label
        size="13px"
        v-model="email"
        label="Your email *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Email is required']"
      />
      <q-input
        class
        filled
        stack-label
        size="13px"
        type="text"
        v-model="password"
        label="Your password *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Password is required']"
      />
      <div
        style="display: flex; justify-content: center; align-items:center; flex-direction: column;"
      >
        <q-btn unelevated no-caps size="13px" label="submit" type="submit" color="primary" />
        <br />already have account ?
        <q-btn
          centered
          no-caps
          unelevated
          size="13px"
          label="Log in"
          @click="toggleLogin"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      email: null,
      password: null
    };
  },

  methods: {
    register() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("register", user)
        .then(({ data }) => {
          this.$router.push("/login");
        })
        .catch(({ response }) => {
          const { message } = response.data;
          Swal.fire("Oops!", message[0], "error");
        });
    },
    toggleLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
form {
  margin: auto;
}
</style>
