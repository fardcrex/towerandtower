<template>
  <div id="nav">
    <h1 class="title text-xl ml-2">{{titlePage}}</h1>

  </div>
</template>

<script>
/* eslint-disable */

export default {
  props: ["titlePage"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

#nav {
  position: fixed;
  display: flex;
  align-items: center;
  min-height: 50px;
  min-width: 100%;
  margin: auto;
  padding: 0.2em 0.6em;
  background-color: $color-primary;
  @media screen and (min-width: $tablet) {
  }

  @media screen and (min-width: $notebook) {
    padding: 0.2em 10%;
  }
  @media screen and (min-width: $laptop) {
    padding: 0.2em 15%;
  }
}
.title {
  color: $color-white;
}
</style>
