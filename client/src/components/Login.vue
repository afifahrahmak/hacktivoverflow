<template>
  <div style="height: 100vh;">
    <div class="coba">
      <img src="../assets/login3.svg" style="width:250px;" />
      <h5>log in</h5>
    </div>
    <div>
      <q-form style=" width: 420px; height: 460px; padding: 5%;" @submit.prevent="login">
        <q-input
          filled
          stack-label
          size="13px"
          v-model="email"
          label="Your email *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Email is required']"
        />

        <q-input
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
          <br />
          <br />new to us ?
          <q-btn
            centered
            no-caps
            unelevated
            size="13px"
            label="Sign up"
            @click="toggleRegister"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
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
    login() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$store.commit("LOGIN", true);
          this.$router.push("/");
        })
        .catch(({ response }) => {
          const { message } = response.data;
          Swal.fire("Sorry!", message, "error");
        });
    },
    toggleRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
form {
  margin: auto;
  margin-bottom: 0;
  height: auto;
}
.coba {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
