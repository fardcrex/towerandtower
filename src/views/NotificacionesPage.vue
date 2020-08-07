<template>
  <div class="app-container">
    <AppNav
      :titlePage="title"
      :isBack="isItemSelected"
      @onBack="onBack"
    />
    <div class="box-relleno"></div>
    <div
      v-if="isItemSelected"
      class="container_notify"
    >
      <img
        src="../assets/logos/message.png"
        alt="mensaje"
        class="mensaje"
      >
      <div>
        <p class="text-2xl">Fecha: {{getFormatFecha(notificacionSelected.fecha_notification)}}</p>
        <p class="text-2xl">Hora: {{getFormatTime}}</p>
      </div>
      <NotificacionCard
        class="my-3"
        :data="notificacionSelected"
      />
      <a
        :href="getLinkMap"
        target="_blank"
      >Ir a Maps <img
          src="../assets/gps.png"
          alt=""
        ></a>
    </div>
    <RecycleScroller
      v-else
      class="scroller"
      :items="list"
      :item-size="14"
      :pageMode="true"
      key-field="fecha_notification"
      v-slot="{ item }"
    >
      <NotificacionRow
        :data="item"
        @onClick="onClick"
      >
        {{ item.titulo_notification }} /
        {{ getFormatFecha(item.fecha_notification) }}
      </NotificacionRow>
    </RecycleScroller>
    <AppNavBottom v-if="!isItemSelected" />
  </div>
</template>

<script>
import AppNav from "@/components/AppNav";
import AppNavBottom from "@/components/AppNavBottom";
import NotificacionRow from "@/components/NotificacionRow";
import NotificacionCard from "@/components/NotificacionCard";
import NotificacionService from "@/services/NotificacionService.js";
import { mapState } from "vuex";
import { RecycleScroller } from "vue-virtual-scroller";
import { getFormatFecha, getFormatTime } from "@/recursos/timeHelper.js";
export default {
  components: {
    AppNav,
    AppNavBottom,
    RecycleScroller,
    NotificacionCard,
    NotificacionRow,
  },
  data() {
    return {
      isItemSelected: false,
      notificacionSelected: {},
      title: "Historial de Notificaciones",
      list: [],
    };
  },
  created() {
    this.getNotificaciones();
  },
  computed: {
    ...mapState({
      empleado_dni: (state) => state.user.empleado_dni,
    }),
    getFormatTime() {
      return getFormatTime(this.notificacionSelected.fecha_notification);
    },
    getLinkMap() {
      const {
        latitud_notification,
        longtitud_notification,
      } = this.notificacionSelected;
      return `https://www.google.es/maps/@${latitud_notification},${longtitud_notification},15z`;
    },
  },
  methods: {
    getFormatFecha(value) {
      return getFormatFecha(value);
    },
    onClick(item) {
      this.notificacionSelected = item;
      this.isItemSelected = true;
      this.title = item.titulo_notification;
    },
    onBack() {
      this.notificacionSelected = {};
      this.isItemSelected = false;
      this.title = "Historial de Notificaciones";
    },
    async getNotificaciones() {
      const res = await NotificacionService.getNotificaciones(
        this.empleado_dni
      );
      this.list = res.data.reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.app-container {
  background-color: $color-card;
}
.box-relleno {
  height: 70px;
}
.scroller {
  margin: auto;
  // margin-top: 5em;
  min-height: 90vh;
}
.container_notify {
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  img {
    width: 50%;
  }
  a {
    justify-content: center;
    display: flex;
    width: 50%;
    align-items: center;
    padding: 1rem 0;
    img {
      margin-left: 1rem;
      height: 32px;
      width: auto;
    }
  }
}
</style>
