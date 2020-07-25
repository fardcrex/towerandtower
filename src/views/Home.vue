<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <h1>Coordenadas</h1>
    <h2>{{latitud}}</h2>
    <h2>{{longitude}}</h2>
    <QrcodeStream
      class="aaa"
      @decode="onDecode"
    ></QrcodeStream>

    <QrcodeCapture @decode="onDecode" />
    <!--    <QrcodeDropZone @decode="onDecode" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { QrcodeStream, QrcodeCapture } from "vue-qrcode-reader";
export default {
  name: "Home",
  created() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition((funcExito) => {
        console.log(funcExito);
        this.latitud = funcExito.coords.latitude;
        this.longitude = funcExito.coords.longitude;
        console.log("funcExito");
      });
    } else {
      // No hay soporte para la geolocalización: podemos desistir o utilizar algún método alternativo
    }
  },
  data() {
    return {
      latitud: 0,
      longitude: 0,
    };
  },
  components: {
    QrcodeStream,

    QrcodeCapture,
  },
  methods: {
    onDecode(decodedString) {
      console.log(decodedString);
      // ...  console.log(decodedString);
    },
  },
};
</script>
<style lang="scss">
.aaa {
  width: 100px;
  height: 100px;
  color: red;
}
</style>