<!-- UserAvatar.vue -->
<template>
  <div>
    <div class="wrapper">
      <div class="gallery-flex-row" v-bind="$attrs">
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
.wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  width: 100%; /* 或者可以设置一个最大宽度 max-width */
}

.gallery-flex-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 从左到右排列 */
  max-width: 1200px; /* 容器的最大宽度，根据需要调整 */
  gap: 10px; /* 卡片之间的间距，根据需要调整 */
}

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
