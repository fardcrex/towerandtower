<template>
  <div
    v-if="!isQrActive"
    class="grid grid-cols-2 sm:grid-cols-4 mx-3 py-5 gap-5"
  >
    <BaseCardMarcar
      v-for="(menu,index) in menus"
      :key="index"
      :title="menu.title"
      :tipo="menu.tipo"
      :imagenSrc="menu.imagenSrc"
      @openToCamera="openToCamera"
    />
  </div>
  <QrcodeStream
    v-else
    class="menu bg-black"
    @decode="onDecode"
  ></QrcodeStream>
</template>

<script>
import { mapState } from "vuex";
import { QrcodeStream } from "vue-qrcode-reader";
import RegistroService from "@/services/RegistroService.js";
export default {
  components: {
    QrcodeStream,
  },
  computed: {
    title() {
      if (this.isLoader) return "Procesando código Qr...";
      if (this.isQrActive) return "Escanea el código Qr";
      return "Marcar Asistencia";
    },
    ...mapState({
      empleado_dni: (state) => state.user.empleado_dni,
    }),
  },
  data() {
    return {
      isQrActive: false,
      tipo: "",
      menus: [
        {
          title: "Ingreso",
          imagenSrc: "ingreso_marcatition.jpg",
          tipo: "Ingreso",
        },
        { title: "Salida", imagenSrc: "salida_marcation.jpg", tipo: "Retiro" },
        { title: "Refrigerio", imagenSrc: "LunchTime.jpg", tipo: "Refrigerio" },
        {
          title: "Retorno",
          imagenSrc: "Retorno_Work.png",
          tipo: "Retorno de refrigerio",
        },
      ],
    };
  },
  methods: {
    onDecode(decodedString) {
      console.log(decodedString);
      this.decodedString = decodedString;
      this.registrarMarcacion();
      // ...  console.log(decodedString);
    },
    openToCamera(tipo) {
      this.isQrActive = true;
      this.$emit("isQrActive", true);
      this.tipo = tipo;
    },
    registrarMarcacion() {
      this.$emit("loaded", true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (funcExito) => {
            console.log(funcExito);
            try {
              const res = await RegistroService.registrarMarcacion({
                idTelefono: "desdeNavegadorWeb",
                dni: this.empleado_dni,
                latitud: `${funcExito.coords.latitude}`,
                longitud: `${funcExito.coords.longitude}`,
                dataQr: `${this.decodedString}`,
                fechahora: new Date().toJSON(),
                tipo: this.tipo,
                motivo: this.tipo,
                temperatura: 0,
              });
              console.log("ads", res);
              this.$emit("sendMensaje", "Se marcó con éxito");
            } catch (error) {
              this.$emit("sendMensaje", error);
            }
            this.$emit("loaded", false);
            this.$emit("isQrActive", false);
            this.isQrActive = false;
          },
          (objPositionError) => {
            switch (objPositionError.code) {
              case objPositionError.PERMISSION_DENIED:
                this.$emit(
                  "sendMensaje",
                  "No se ha permitido el acceso a la posición del usuario."
                );
                break;
              case objPositionError.POSITION_UNAVAILABLE:
                this.$emit(
                  "sendMensaje",
                  "No se ha podido acceder a la información de su posición."
                );
                break;
              case objPositionError.TIMEOUT:
                this.$emit(
                  "sendMensaje",
                  "El servicio ha tardado demasiado tiempo en responder."
                );
                break;
              default:
                this.$emit("sendMensaje", "Error desconocido.");
            }
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>