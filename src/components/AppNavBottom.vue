<template>
  <div class="AppNavBottom grid grid-cols-3 ">
    <router-link
      class="mt-1"
      to="/"
    >
      <span class="block mt-2">🏠</span>
      <span>Marcar Ingreso</span>
    </router-link>
    <router-link
      class="mt-1"
      to="/reportes"
    >
      <span class="block mt-2">📄</span>
      <span>Reportes</span>

    </router-link>
    <router-link
      class="mt-1"
      to="/notificaciones"
    >
      <span class="block mt-2">🔔</span>
      <span>Notificaciones</span>

    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.AppNavBottom {
  width: 100%;
  color: rgb(146, 146, 146);
  height: 3.6rem;
  position: fixed;
  padding: 0;
  bottom: 0;
  background: $color-white;
  box-shadow: $shadow-app-nav;
  a {
    color: #b9b9b9;
    margin: 0;
    &.router-link-exact-active {
      font-weight: bold;
      color: #42b983;
    }
  }
}
</style>