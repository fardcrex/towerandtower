<template>

  <div
    class="neumorphic-card"
    @click="goToCamera"
  >
    <div>
      <div class="neumorphic-card__outer">
        <img
          class="neumorphic-image"
          :src="require(`@/assets/${menu.imagenSrc}`)"
        />

      </div>
      <div class="neumorphic-card__title">{{menu.title}}</div>

    </div>
  </div>

</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
    },
  },
  methods: {
    goToCamera() {
      this.$emit("openToCamera", this.menu);
    },
  },
  name: "BaseCardMarcar",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.neumorphic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $color-white;
  padding: 30px 22px 0 22px;
  box-shadow: $shadow-app-nav;
  border-radius: 10px;
  height: minmax(280px, auto);
  width: auto;
}

.neumorphic-card__title {
  display: block;
  color: $color-secondary;
  font-size: $font-title-card;
  padding: 20px 0 20px;
  text-align: center;
}

.neumorphic-card__outer {
  background-color: #ffffff;
  border-radius: 5px;
  border: 4px solid #ffffff;
  box-shadow: 4px 4px 8px rgba(55, 84, 170, 0.15),
    -7px -7px 10px rgba(255, 255, 255, 1), 0px 0px 4px rgba(255, 255, 255, 0.2) !important;
  margin: -5px;
}
</style>