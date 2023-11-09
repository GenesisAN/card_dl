<script>
import CommentCard from "@/components/CommentCard.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import props from "vuetify/src/components/VCalendar/util/props";
import card from "@/store/actions/card";

export default {
  name: "CardView",
  components: { UserAvatar, CommentCard },
  computed: {
    props() {
      return props;
    },
    icon() {
      return this.icons[this.iconIndex];
    },
    currentLang() {
      // 返回当前选择的语言ID
      return (
        this.lang_map[localStorage.getItem("set_lange")] ||
        this.lang_map["English"]
      );
    },
    translatedTags() {
      return this.card.Tags.map((tag) => {
        return this.getTranslation(tag.tts, this.currentLang);
      });
    },
  },
  data: () => ({
    card: {
      ID: 0,
      UploadTag: "",
      UploadUserInfo: {
        id: 0,
        nickname: "",
        avatar: "",
        permission: 0,
      },
      Thumb: "",
      Path: "",
      Title: "Title",
      DownloadCount: 0,
      CardType: 6,
      MD5: "",
      UploadAt: "",
      CommentsTag: "",
      Comments: 0,
      CommentBan: false,
      ThreadID: 0,
      Note: "",
      CardMod: null,
      CardPlugin: null,
    },
    message: "",
    iconIndex: 0,
    mods_length: 0,
    plugins_length: 0,
    commits: [],
    lang_map: {
      English: 1,
      简体中文: 2,
    },
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
  }),
  created() {
    this.id = this.$route.params.id; // Type-casting as string
    // console.log("ID from URL:", this.md5);
    this.LoadCardInfo(this.id);
  },
  methods: {
    getTranslation(tts, currentLocale) {
      // 找出当前语言环境对应的翻译
      const translation = tts.find((t) => t.lan === currentLocale);
      // 如果找到了对应的翻译，则返回它；否则，返回默认的第一个翻译
      return translation ? translation.tt : tts[0].tt;
    },
    LoadCardInfo(id) {
      this.$store
        .dispatch("get_card_info", id)
        .then((res) => {
          console.log(res);
          if (res.data != null) {
            this.card = res.data;
            this.mods_length = this.card?.CardMod
              ? this.card.CardMod.length
              : 0;
            this.plugins_length = this.card?.CardPlugin
              ? this.card.CardPlugin.length
              : 0;
            this.LoadCardPosts(this.card.ThreadID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    LoadCardPosts(id) {
      this.$store
        .dispatch("get_card_comment", id)
        .then((res) => {
          if (res.data != null) {
            console.log(res);
            this.commits = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    JumpToMsg() {
      const element = document.getElementById("messagebox");
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      // 设置一个偏移量，例如往上偏移50像素
      const offset = -450; // 往下偏移则使用正值

      // 使用window.scrollTo函数滚动到目标位置，包含偏移
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
      element.focus();
    },
    ReplClick(param) {
      this.JumpToMsg();
      this.message += param;
      console.log(param);
    },
    sendMessage() {
      this.$store
        .dispatch("send_card_comment", {
          thread_id: this.card.ThreadID,
          content: this.message,
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.commits.push(res.data);
          }
          this.resetIcon();
          this.clearMessage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
};
</script>
<template>
  <div>
    <v-btn bottom color="blue" dark fab fixed right x-large @click="JumpToMsg">
      <!-- 这里放置按钮图标或文本 -->
      <v-icon>mdi-message</v-icon>
    </v-btn>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      style="margin-bottom: 85px"
      x-large
    >
      <v-icon>mdi-download</v-icon>
    </v-btn>

    <!-- Product header will now use flexbox to align items -->
    <div class="product-header">
      <!-- Carousel container with flex: 2 to take twice as much space as author info -->
      <v-carousel>
        <v-carousel-item>
          <div class="d-flex justify-center align-center" style="height: 100%">
            <img :src="card.Thumb" />
          </div>
        </v-carousel-item>
        <!--  <v-carousel-item>-->
        <!--    <div class="d-flex justify-center align-center" style="height: 100%">-->
        <!--      <img src="https://picsum.photos/1920/1080" />-->
        <!--    </div>-->
        <!--  </v-carousel-item>-->

        <!--  <v-carousel-item>-->
        <!--    <div class="d-flex justify-center align-center" style="height: 100%">-->
        <!--      <img src="https://picsum.photos/700/300" />-->
        <!--    </div>-->
        <!--  </v-carousel-item>-->
      </v-carousel>
      <!-- Author info container with flex: 1 -->
      <h1 class="product-title">{{ card.Title }}</h1>
      <v-icon>mdi-download</v-icon>
      {{ card.DownloadCount }}
      <v-icon color="gra"> mdi-heart-multiple</v-icon>
      0
      <v-icon>mdi-bookmark-multiple</v-icon>
      0
      <p />

      <UserAvatar
        :avatar-url="card.UploadUserInfo.avatar"
        :user-handle="card.UploadUserInfo.nickname"
        :user-name="card.UploadUserInfo.nickname"
        :avatar-name="card.UploadUserInfo.AvatarName"
        class="ma-4"
      ></UserAvatar>

      <p class="product-description">
        {{ card.Note }}
      </p>
      <v-btn class="ma-2">
        <v-icon>mdi-toy-brick-plus</v-icon>
        {{ mods_length }}
      </v-btn>
      <v-btn class="ma-2">
        <v-icon left>mdi-puzzle-plus</v-icon>
        {{ plugins_length }}
      </v-btn>
      <div class="text-center">
        <v-chip
          v-for="t in card.Tags"
          :key="t.ID"
          class="ma-2"
          color="indigo"
          text-color="white"
        >
          {{ getTranslation(t.tts, currentLang) }}
        </v-chip>
      </div>
      <div class="purchase-options">
        <v-btn class="buy-button">{{ $t("download") }}</v-btn>
        <v-btn class="buy-button">{{ $t("download_mod_pack") }}</v-btn>
        <v-btn class="buy-button">{{ $t("like") }}</v-btn>
        <v-btn class="buy-button">{{ $t("bookmark") }}</v-btn>
        <v-btn class="buy-button">{{ $t("report") }}</v-btn>
      </div>
    </div>
    <div class="product-page">
      <!--      <div class="product-details">-->
      <!--        <h2>Details</h2>-->
      <!--        <p>Here you can add more detailed information about the card.</p>-->
      <!--      </div>-->
      <v-form class="user-reviews">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-textarea
                id="messagebox"
                v-model="message"
                :append-icon="icon"
                :append-outer-icon="'mdi-send'"
                filled
                rows="1"
                counter
                clear-icon="mdi-close-circle"
                clearable
                auto-grow
                :label="$t('comment_text')"
                type="text"
                @click:append="changeIcon"
                @click:append-outer="sendMessage"
                @click:clear="clearMessage"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <div class="user-reviews">
        <h2>{{ $t("comment") }}</h2>
        <!-- Assuming there are multiple reviews, so this would be repeated for each one. -->
        <div class="review">
          <v-card v-if="commits.length == 0">
            <v-card-title class="text-center">
              <v-card-text class="text-center">
                {{ $t("no_comment") }}
              </v-card-text>
            </v-card-title>
          </v-card>
          <CommentCard
            v-for="c in commits"
            :key="c.id"
            :comment="c.content"
            :date="c.created_at"
            :avatar-url="c.avatar"
            :user-name="c.nickname"
            :user-handle="c.nickname"
            @replBtnClick="ReplClick"
          >
          </CommentCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-header :deep(ul.slick-dots) {
  padding-left: 0px;
}

.review > * {
  margin: 10px;
}

.v-carousel .v-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 这将确保每个轮播项都有100%的高度 */
}

.v-carousel .v-carousel-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 这将确保图片不会被拉伸或压缩 */
}

.product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.product-title {
  margin-top: 20px;
}

.product-header {
  text-align: center;
}

.product-description {
  margin-bottom: 20px;
}

.purchase-options {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.buy-button {
  background-color: #5c7e10;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1em;
}

.buy-button:hover {
  background-color: #4e6b0c;
}

.price {
  font-size: 1.5em;
  color: #333;
}

.user-reviews {
  width: 100%;
  max-width: 800px; /* Adjust as necessary */
  margin-top: 20px;
}

.review {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
