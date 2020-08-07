<template>
  <div
    class="app-container"
    :class="{'is-black':isQrActive }"
  >
    <AppNav
      :titlePage="title"
      :isLoad="isLoad"
    />
    <div class="menu">
      <MenuMarcacion
        @sendMensaje="sendMensaje"
        @isQrActive="isQrActiveChange"
        @loaded="loaded"
      />
      <p>{{mensaje}}</p>
    </div>

    <AppNavBottom v-if="!isQrActive" />

  </div>
</template>

<script>
import AppNav from "@/components/AppNav";
import MenuMarcacion from "@/components/MenuMarcacion";
import AppNavBottom from "@/components/AppNavBottom";

export default {
  components: { AppNav, AppNavBottom, MenuMarcacion },
  computed: {
    title() {
      if (this.isLoad) return "Procesando código Qr...";
      if (this.isQrActive) return "Escanea el código Qr";
      return "Marcar Asistencia";
    },
  },
  data() {
    return {
      mensaje: "",
      isLoad: false,
      isQrActive: false,
    };
  },
  methods: {
    sendMensaje(mensaje) {
      this.mensaje = mensaje;
      setTimeout(() => {
        this.mensaje = "";
      }, 6000);
    },
    loaded(isLoad) {
      this.isLoad = isLoad;
    },
    isQrActiveChange(isActive) {
      this.isQrActive = isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.app-container {
  height: 95vh;
  display: flex;
  background-color: $color-card;
  flex-direction: column;
}
.is-black {
  background-color: black;
  min-height: 100vh;
}
.menu {
  margin-top: auto;
  margin-bottom: auto;
}
</style>