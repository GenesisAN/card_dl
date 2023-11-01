<template>
  <div>
    <div id="gallery" class="flex-row flex-start">
      <v-card
        v-for="(card, index) in list"
        :key="card.MD5"
        class="flex-column"
        width="176px"
        height="325px"
      >
        <div
          class="card-thumb-wrapper relative"
          @mouseover="hover = index"
          @mouseleave="hover = -1"
        >
          <v-img :src="card.Thumb" min-height="125px" min-width="176px">
            <v-card-title
              v-if="index === hover"
              class="card-toolbar absolute pd-h3 flex-row-between w-100"
            >
            </v-card-title>
          </v-img>
          <v-overlay
            v-if="index === hover"
            absolute
            color="#000000FF"
            z-index="0"
          >
            <div>
              <v-btn @click="download(card)">Donwload</v-btn>
              <v-btn @click="download(card)">Like</v-btn>
              <v-btn @click="download(card)">Bookmark</v-btn>
            </div>
          </v-overlay>
        </div>
        <v-card-title class="card-title">{{
          truncateString(card.Title, 8)
        }}</v-card-title>
        <v-card-subtitle>
          <v-avatar color="brown" size="30">
            <img v-if="card.uploaderAvatar" :src="card.uploaderAvatar" />
            <span v-else class="white--text text-h5">{{
              card.AvatarName
            }}</span>
          </v-avatar>
          <a color="#white" class="a-uploader">{{
            card.uploader
          }}</a></v-card-subtitle
        >
      </v-card>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>
<style scoped>
#gallery {
  display: flex;
  flex-wrap: wrap;
}
.card-title {
  margin: -10px 0 0 0;
  font-size: 16px;
}
.a-uploader {
  margin-left: 10px;
}
.card-thumb-wrapper {
  width: 30%;
  padding-right: 10px;
  display: flex;
  align-items: center;
}
.flex-column {
  margin: 20px;
}
.btr {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
<script>
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

import axios from "axios";

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
  methods: {
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
            res.data.forEach((item) => {
              // 计算3级哈希目录
              item.Thumb =
                res.baseURL + `/card/thumd/${item.CardType}/${item.MD5}.jpg`;
              item.Path =
                res.baseURL + `/card/image/${item.CardType}/${item.MD5}.png`;
              item.uploader = item?.UploadUserInfo?.nickname ?? "匿名";
              item.uploaderAvatar = item?.UploadUserInfo?.avatar ?? "";
              item.AvatarName = item.uploader.slice(0, 1).toUpperCase();
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
