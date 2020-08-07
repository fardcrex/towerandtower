<template>

  <div
    class="notificacion-card"
    @click="onClick"
  >
    <img
      class="icono"
      src="../assets/carta.png"
      alt="carta"
    >
    <p class="font-semibold parrafo">
      <slot></slot>
    </p>
    <img
      class="icono"
      src="../assets/proximo.png"
      alt="flecha next"
    >
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  methods: {
    onClick() {
      this.$emit("onClick", this.data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.notificacion-card {
  width: 90%;
  margin: 0.2em auto;
  background-color: $color-white;
  box-shadow: $shadow-app-nav;
  padding: 1.2em 5%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
}
.parrafo {
  width: 80%;
  text-align: start;
  padding-left: 1em;
}
.icono {
  height: 24px;
}
</style>