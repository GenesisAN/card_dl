<template>
  <div>
    <div class="wrapper">
      <div class="gallery-flex-row" v-bind="$attrs">
        <v-avatar :style="{ backgroundColor: avatarColor }" class="user-avatar">
          <img v-if="hasAvatar" :src="avatarUrl" alt="user avatar" />
          <span v-else class="white--text text-h5">{{
            avatarNameInitial
          }}</span>
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
    avatarUrl: String,
    userName: String,
    userHandle: String,
  },
  data() {
    return {
      hasAvatar: true,
      avatarColor: "",
    };
  },
  created() {
    if (!this.avatarUrl) {
      this.hasAvatar = false;
    }
    this.avatarColor = this.stringToColor(this.userName);
  },
  methods: {
    stringToColor(str) {
      // 为了简化，我们仅使用用户名的长度来影响色相值
      const hue = this.simpleHash(str) % 360;
      // 设置饱和度为70%和亮度为80%来生成柔和的颜色
      const saturation = 70;
      const lightness = 80;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    },
    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    },
  },
  computed: {
    avatarNameInitial() {
      return this.userName ? this.userName.charAt(0) : "";
    },
  },
};
</script>

<!-- CSS 略 -->

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.gallery-flex-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 1200px;
  gap: 10px;
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
