<template>
  <div
    class="app-container"
    :class="{'is-black':isQrActive }"
  >
    <AppNav titlePage="Marcar Asistencia" />
    <div
      v-if="!isQrActive"
      class="grid grid-cols-2 sm:grid-cols-4 mx-3 py-5 gap-5  menu"
    >
      <BaseCardMarcar
        v-for="(menu,index) in menus"
        :key="index"
        :title="menu.title"
        :imagenSrc="menu.imagenSrc"
      />
    </div>
    <QrcodeStream
      v-else
      class="menu bg-black"
      @decode="onDecode"
    ></QrcodeStream>
    <AppNavBottom v-if="!isQrActive" />

  </div>
</template>

<script>
import AppNav from "@/components/AppNav";
import AppNavBottom from "@/components/AppNavBottom";
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  components: { AppNav, AppNavBottom, QrcodeStream },
  data() {
    return {
      isQrActive: true,
      menus: [
        { title: "Ingreso", imagenSrc: "ingreso_marcatition.jpg" },
        { title: "Salida", imagenSrc: "salida_marcation.jpg" },
        { title: "Refrigerio", imagenSrc: "LunchTime.jpg" },
        { title: "Retorno", imagenSrc: "Retorno_Work.png" },
      ],
    };
  },
  methods: {
    onDecode(decodedString) {
      console.log(decodedString);
      this.decodedString = decodedString;
      // ...  console.log(decodedString);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 90vh;
  display: flex;
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