<template>
  <div class="loader">
    <img src="../assets/loader.svg" />
    <p>We limit the loading speed for demo purpose only.</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
Vue.extend({
  name: "LoaderComponents",
});
</script>

<style scoped>
.loader {
  width: 100%;
  text-align: center;
}
</style>
