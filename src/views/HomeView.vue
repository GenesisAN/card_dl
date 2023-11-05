<template>
  <div>
    <div id="gallery" class="gallery-flex-row gallery-flex-start">
      <transition-group
        class="gallery-flex-row gallery-flex-start"
        name="card-deal"
        tag="div"
      >
        <v-card
          v-for="(card, index) in list"
          :key="card.MD5"
          :style="card.style"
          class="gallery-flex-column card-scale"
          height="325px"
          width="176px"
        >
          <div
            class="card-thumb-wrapper"
            @mouseleave="hover = -1"
            @mouseover="hover = index"
          >
            <v-img :src="card.Thumb" class="card-image">
              <v-card-title v-if="index === hover" class="card-toolbar">
              </v-card-title>
            </v-img>
            <v-overlay
              v-if="index === hover"
              class="card-overlay clickable"
              @click="goToCardDetail(card)"
            >
              <div class="card-buttons">
                <v-btn class="card-button" @click="download(card)"
                  >{{ $t("download") }}
                </v-btn>
                <v-btn class="card-button" @click="download(card)"
                  >{{ $t("like") }}
                </v-btn>
                <v-btn class="card-button" @click="download(card)"
                  >{{ $t("bookmark") }}
                </v-btn>
              </div>
            </v-overlay>
          </div>
          <v-card-title
            class="card-title clickable"
            @click="goToCardDetail(card)"
            >{{ truncateString(card.Title, 8) }}
          </v-card-title>
          <v-card-subtitle class="card-subtitle">
            <v-avatar class="avatar-brown" size="30">
              <img v-if="card.uploaderAvatar" :src="card.uploaderAvatar" />
              <span v-else class="white-text text-h5">{{
                card.AvatarName
              }}</span>
            </v-avatar>
            <a class="uploader-link">{{ card.uploader }}</a>
          </v-card-subtitle>
        </v-card>
      </transition-group>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<style scoped>
:root {
  --animation-delay: 0ms; /* 默认值 */
}

#gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 使卡片在水平方向上居中 */
  align-items: stretch; /* 确保卡片在垂直方向上拉伸以填充额外的空间 */
}

.clickable:hover {
  cursor: pointer;
}

.gallery-flex-start {
  justify-content: flex-start;
}

.gallery-flex-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 在主轴方向上居中对齐子元素 */
  align-items: flex-start; /* 在交叉轴方向上从顶部开始对齐子元素 */
  align-content: flex-start; /* 多行对齐方式 */
  width: 100%; /* 确保容器宽度为100% */
}

@media (max-width: 600px) {
  .gallery-flex-row {
    justify-content: center;
    align-items: center; /* 在交叉轴方向上居中对齐子元素 */
    align-content: center; /* 在多行总体居中 */
  }
}

.gallery-flex-column {
  flex: 1; /* 允许卡片伸展和收缩 */
  min-width: 176px; /* 设置卡片的最小宽度 */
  max-width: 176px; /* 设置卡片的最大宽度 */
  height: auto; /* 允许卡片的高度根据内容调整 */
  margin: 10px; /* 为了美观，你可以根据需要调整间距 */
  box-sizing: border-box; /* 包括 padding 和 border 在内的宽度计算 */
  border-radius: 10px;
}

.card-scale {
  transition: transform 0.2s ease;
}

.card-scale:hover {
  transform: scale(1.05); /* 放大卡片至原始尺寸的105% */
}

.card-image {
  border-radius: 10px 10px 0 0;
  min-height: 125px;
  min-width: 176px;
}

.card-title {
  margin: -10px 0 0 0;
  font-size: 16px;
}

.card-subtitle {
  display: flex;
  align-items: center;
}

.uploader-link {
  margin-left: 10px;
  color: black;
}

.card-thumb-wrapper {
  position: relative;
  padding-right: 10px;
  display: flex;
  align-items: center;
}

.card-toolbar {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.3rem;
}

.card-overlay {
  position: absolute;
  background-color: rgba(45, 42, 42, 0.36);
  z-index: 0;
}

.card-buttons {
  display: flex;
  flex-direction: column;
}

.card-button {
  margin: 0.5rem 0;
}

.avatar-brown {
  color: #ffffff;
  background-color: #795548;
}

.white-text {
  color: #ffffff;
}

.text-h5 {
  font-size: 1.25rem;
}

/* 卡片进入动画 */
.card-deal-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  transition-delay: var(--animation-delay);
}

.card-deal-enter-to,
.card-deal-enter-active {
  opacity: 1;
  transform: translateY(0);
}

.card-deal-enter {
  opacity: 0;
  transform: translateY(100vh);
}

@keyframes cardEnterAnimation {
  0% {
    opacity: 0;
    transform: translateY(100vh);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
<script>
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

export default Vue.extend({
  components: {
    InfiniteLoading,
  },
  data: () => ({
    page: 1,
    list: [],
    hover: -1,
    loading: false,
    visible: false,
    current: -1,
  }),
  mounted() {
    this.dealCards();
  },
  methods: {
    dealCards() {
      const delayIncrement = 100; // 100毫秒递增
      this.list.forEach((card, index) => {
        card.animationDelay = index * delayIncrement;
      });
    },
    infiniteHandler($state) {
      this.$store
        .dispatch("serach_card", {
          params: {
            p: this.page,
          },
        })
        .then((res) => {
          if (res.data?.length > 0) {
            this.page += 1;
            res.data.forEach((item, index) => {
              // 计算3级哈希目录
              item.Thumb =
                res.baseURL + `/card/thumd/${item.CardType}/${item.MD5}.jpg`;
              item.Path =
                res.baseURL + `/card/image/${item.CardType}/${item.MD5}.png`;
              item.uploader = item?.UploadUserInfo?.nickname ?? "匿名";
              item.uploaderAvatar = item?.UploadUserInfo?.avatar ?? "";
              item.AvatarName = item.uploader.slice(0, 1).toUpperCase();
              item.style = `--animation-delay:${index * 100}ms`;
              this.list.push(item);
            });
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    download(item) {
      console.log(item);
      window.open(item.Path);
    },
    hashDirs(md5) {
      // 我们假设MD5长度为32，并取其前6个字符进行分割
      let part1 = md5.slice(0, 2);
      let part2 = md5.slice(2, 4);
      let part3 = md5.slice(4, 6);

      return `${part1}/${part2}/${part3}/${md5}`;
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    },
  },
});
</script>
