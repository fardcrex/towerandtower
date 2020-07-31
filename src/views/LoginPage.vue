<template>
  <div class=" container">
    <h1 class="text-white text-3xl font-semibold pt-20">{{tittle}}</h1>
    <FormLogin />
    <div class="grid grid-cols-2 gap-2 mt-16">
      <p class="block text-white text-sm mb-2 mt-8 text-right"> ¿Eres nuevo? </p>
      <a
        class="block text-white text-sm font-bold mb-2 mt-8 text-left"
        href=""
      > Registrates</a>
    </div>
  </div>
</template>

<script>
import FormLogin from "@/components/FormLogin";

export default {
  components: { FormLogin },
  data() {
    return {
      tittle: "Tower & Tower S.A.",
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 105vh;
  background-color: #2a922f;
}
</style>