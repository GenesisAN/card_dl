<template>
  <div>
    <div id="gallery" class="flex-row flex-start">
      <v-card
        v-for="(card, index) in list"
        :key="card.MD5"
        class="flex-column"
        width="352px"
      >
        <div
          class="card-thumb-wrapper relative"
          @mouseover="hover = index"
          @mouseleave="hover = -1"
        >
          <v-img :src="card.Thumb" min-height="252px" min-width="352px">
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
            <v-avatar>
              <img :src="card.uploaderAvatar" alt="card.uploader" />
            </v-avatar>
            <p color="#white">{{ card.uploader }}</p>
            <v-btn @click="download(card)">Donwload</v-btn>
          </v-overlay>
        </div>
        <v-card-title>{{ card.Title }}</v-card-title>
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
const api = "//127.0.0.1:3000/api/v1/card/search?";
import axios from "axios";
// import HelloWorld from "../components/HelloWorld.vue";
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
      axios
        .get(api, {
          params: {
            p: this.page,
          },
        })
        .then((res) => {
          if (res.data.data?.length > 0) {
            this.page += 1;
            res.data.data.forEach((item) => {
              item.Thumb = `//127.0.0.1:3000/api/v1/card/thumd/${item.CardType}/${item.MD5}.jpg`;
              item.Path = `//127.0.0.1:3000/api/v1/card/image/${item.CardType}/${item.MD5}.png`;
              item.uploader = item?.UploadUserInfo?.nickname ?? "匿名";
              item.uploaderAvatar = item?.UploadUserInfo?.avatar ?? "匿名";
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
  },
});
</script>
