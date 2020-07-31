<template>
  <form
    @submit.prevent="login"
    class="pt-12"
  >
    <div class=" px-16 mx-auto grid">
      <label
        class="block text-white text-sm font-bold mb-2 text-left "
        for="username"
      >
        Email
      </label>
      <input
        class="shadow appearance-none border w-full rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="email"
        placeholder="Email"
        v-model="email"
        name="correo"
      >
    </div>
    <div class=" px-16 mx-auto grid">
      <label
        class="block text-white text-sm font-bold mb-2 mt-8 text-left"
        for="password"
      >
        Contraseña
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="******************"
      >
      <a
        href="/"
        class="text-white text-sm fotn-bold text-right mt-1"
      >Olvidó su contraseña?</a>

    </div>
    <div class="px-16 mx-auto grid">
      <button
        v-if="!loading"
        class="bg-white hover:bg-gray-100 text-green-500 font-bold  py-3 rounded-full mt-12 mb-2"
      >
        INGRESAR
      </button>
      <div
        v-else
        class="preloader py-3 mt-12"
      ></div>
    </div>
    <p>{{ error }}</p>
  </form>
</template>

<script>
import { message } from "@/recursos/DataInformation.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false,
    };
  },
  methods: {
    login() {
      if (this.email === "" || this.password === "") {
        this.error = message.notCompleted;
        return;
      }
      this.loading = true;
      this.error = "";
      this.$store
        .dispatch("login", {
          correo: this.email,
          password: this.password,
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.loading = false;
          console.log("user data is", err);
          this.error = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  width: 55px;
  height: 55px;
}
</style>