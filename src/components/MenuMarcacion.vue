<template>
  <div
    v-if="!isQrActive"
    class="grid grid-cols-2 sm:grid-cols-4 mx-3 py-5 gap-5"
  >
    <BaseCardMarcar
      v-for="(menu,index) in menus"
      :key="index"
      :menu="menu"
      @openToCamera="openToCamera"
    />
  </div>
  <QrcodeStream
    v-else
    class="menu bg-black"
    @decode="onDecode"
    @init="onInit"
  ></QrcodeStream>
</template>

<script>
import { mapState } from "vuex";
import { QrcodeStream } from "vue-qrcode-reader";
import RegistroService from "@/services/RegistroService.js";
import NotificacionService from "@/services/NotificacionService.js";
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
      empleado_all_name: (state) =>
        state.user.empleado_nombre + " " + state.user.empleado_apellido,
    }),
    menus() {
      return [
        {
          title: "Ingreso",
          imagenSrc: "ingreso_marcatition.jpg",
          tipo: "Ingreso",
          body: `El trabajador ${this.empleado_all_name} acaba de marcar su Ingreso`,
        },
        {
          title: "Salida",
          imagenSrc: "salida_marcation.jpg",
          tipo: "Retiro",
          body: `El trabajador ${this.empleado_all_name} acaba de marcar su Salida`,
        },
        {
          title: "Refrigerio",
          imagenSrc: "LunchTime.jpg",
          tipo: "Refrigerio",
          body: `El trabajador ${this.empleado_all_name} acaba de marcar su Refrigerio`,
        },
        {
          title: "Retorno",
          imagenSrc: "Retorno_Work.png",
          tipo: "Retorno de refrigerio",
          body: `El trabajador ${this.empleado_all_name} acaba de marcar su Retorno`,
        },
      ];
    },
  },
  data() {
    return {
      isQrActive: false,
      menu: "",
    };
  },
  methods: {
    onDecode(decodedString) {
      console.log(decodedString);
      this.decodedString = decodedString;
      if (decodedString) {
        this.registrarMarcacion();
      } else {
        this.$emit("isQrActive", false);
        this.isQrActive = false;
        this.$emit("sendMensaje", "No se encontró el código");
      }
      // ...  console.log(decodedString);
    },
    openToCamera(menu) {
      this.isQrActive = true;
      this.$emit("isQrActive", true);
      this.menu = menu;
    },
    registrarMarcacion() {
      this.$emit("loaded", true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (funcExito) => {
            console.log(funcExito);
            const fechaRegistro = new Date().toJSON();
            const { latitude, longitude } = funcExito.coords;
            try {
              const res = await RegistroService.registrarMarcacion({
                idTelefono: this.empleado_dni,
                dni: this.empleado_dni,
                latitud: `${latitude}`,
                longitud: `${longitude}`,
                dataQr: `${this.decodedString}`,
                fechahora: fechaRegistro,
                tipo: this.menu.tipo,
                motivo: this.menu.tipo,
                temperatura: 0,
              });
              const res2 = await NotificacionService.registerNotificacion({
                fechahora: fechaRegistro,
                latitud: `${latitude}`,
                longitud: `${longitude}`,
                titulo: this.menu.title,
                cuerpo: this.menu.body,
                idTelefono: this.empleado_dni,
              });
              console.log(res2, res);
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
    async onInit(promise) {
      console.log("error");
      try {
        await promise;
      } catch (error) {
        console.log(error);
        this.$emit("isQrActive", false);
        this.isQrActive = false;
        if (error.name === "NotAllowedError") {
          this.$emit(
            "sendMensaje",
            "ERROR: necesita conceder permiso de acceso a la cámara."
          );
        } else if (error.name === "NotFoundError") {
          this.$emit(
            "sendMensaje",
            "ERROR: necesita conceder permiso de acceso a la cámara."
          );
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.$emit(
            "sendMensaje",
            "ERROR: Se requiere un contexto seguro (HTTPS, localhost)."
          );
        } else if (error.name === "NotReadableError") {
          this.$emit("sendMensaje", "ERROR:¿La cámara ya está en uso?");
        } else if (error.name === "OverconstrainedError") {
          this.$emit(
            "sendMensaje",
            "ERROR: las cámaras instaladas no son adecuadas."
          );
        } else if (error.name === "StreamApiNotSupportedError") {
          this.$emit(
            "sendMensaje",
            "ERROR: Stream API no es compatible con este navegador."
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>