<template>
  <div>
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
      title: "Historial de Notificaciones",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>