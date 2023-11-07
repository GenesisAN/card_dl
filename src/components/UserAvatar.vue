<!-- UserAvatar.vue -->
<template>
  <div v-bind="$attrs">
    <div class="user-avatar-container">
      <v-avatar>
        <img v-if="avatarUrl" :src="avatarUrl" alt="user avatar" />
        <span v-else>{{ avatarNameInitial }}</span>
      </v-avatar>
      <div>
        <div class="user-name">{{ userName }}</div>
        <div class="user-handle">@{{ userHandle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    avatarName: String,
    avatarUrl: String,
    userName: String,
    userHandle: String,
  },
  computed: {
    avatarNameInitial() {
      return this.avatarName ? this.avatarName.charAt(0) : "";
    },
  },
};
</script>

<style scoped>
.user-avatar img {
  object-fit: cover;
}

.user-name {
  font-weight: bold;
}
.user-handle {
  color: #666;
  font-size: 0.875rem;
}
</style>
