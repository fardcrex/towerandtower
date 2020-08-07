<template>

  <div class="notificacion-card">
    <h2 class="font-semibold parrafo">Título</h2>
    <p class="parrafo">
      {{data.titulo_notification}}
    </p>
    <h2 class="font-semibold parrafo">Cuerpo</h2>
    <p class="parrafo">
      {{data.cuerpo_notification}}
    </p>

  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.notificacion-card {
  width: 90%;

  background-color: $color-white;
  box-shadow: $shadow-app-nav;
  padding: 1.2em 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  border-radius: 5px;
}
.parrafo {
  width: 80%;
  text-align: start;
  padding-left: 1em;
}
</style>