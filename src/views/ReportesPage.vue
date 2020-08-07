<template>
  <div class="app-container ">
    <AppNav :titlePage="title" />
    <AppNavBottom />
  </div>
</template>

<script>
import AppNav from "@/components/AppNav";
import AppNavBottom from "@/components/AppNavBottom";
export default {
  components: { AppNav, AppNavBottom },
  data() {
    return {
      title: "Reportes",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.app-container {
  background-color: $color-card;
  min-height: calc(100vh - 60px);
}
</style>