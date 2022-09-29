<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hello-i18n />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import HelloI18n from "@/components/HelloI18n.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    HelloI18n,
  },
});
</script>
