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
    console.log("ID from URL:", this.md5);
    this.$store
      .dispatch("get_card_info", this.id)
      .then((res) => {
        console.log(res);
        if (res.data != null) {
          this.card = res.data;
          this.mods_length = this.card?.CardMod ? this.card.CardMod.length : 0;
          this.plugins_length = this.card?.CardPlugin
            ? this.card.CardPlugin.length
            : 0;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    JumpToMsg() {
      var element = document.getElementById("messagebox");
      var elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      // 设置一个偏移量，例如往上偏移50像素
      var offset = -450; // 往下偏移则使用正值

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
      this.resetIcon();
      this.clearMessage();
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
        <!--        <v-carousel-item>-->
        <!--          <div class="d-flex justify-center align-center" style="height: 100%">-->
        <!--            <img src="https://picsum.photos/1920/1080" />-->
        <!--          </div>-->
        <!--        </v-carousel-item>-->

        <!--        <v-carousel-item>-->
        <!--          <div class="d-flex justify-center align-center" style="height: 100%">-->
        <!--            <img src="https://picsum.photos/700/300" />-->
        <!--          </div>-->
        <!--        </v-carousel-item>-->
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
          class="ma-2"
          color="indigo"
          prepend-icon="mdi-account-circle"
          text-color="white"
        >
          Mike
        </v-chip>

        <v-chip
          append-icon="mdi-star"
          class="ma-2"
          color="orange"
          text-color="white"
        >
          Premium
        </v-chip>

        <v-chip
          append-icon="mdi-cake-variant"
          class="ma-2"
          color="primary"
          text-color="white"
        >
          1 Year
        </v-chip>

        <v-chip class="ma-2" color="green" text-color="white">
          <template v-slot:prepend>
            <v-avatar class="green-darken-4"> 1</v-avatar>
          </template>
          Years
        </v-chip>

        <v-chip
          :model-value="true"
          class="ma-2"
          closable
          color="teal"
          prepend-icon="mdi-checkbox-marked-circle"
          text-color="white"
        >
          Confirmed
        </v-chip>

        <v-chip
          :model-value="true"
          class="ma-2"
          closable
          close-icon="mdi-delete"
          color="teal"
          prepend-icon="mdi-checkbox-marked-circle"
          text-color="white"
        >
          Confirmed
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
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-textarea
                id="messagebox"
                v-model="message"
                :append-icon="icon"
                :append-outer-icon="'mdi-send'"
                filled
                clear-icon="mdi-close-circle"
                clearable
                auto-grow
                label="Message"
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
        <h2>User Reviews</h2>
        <!-- Assuming there are multiple reviews, so this would be repeated for each one. -->
        <div class="review">
          <CommentCard
            :comment="'Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'"
            :date="'2021-01-01'"
            :user-handle="'gena'"
            :user-name="'GenesisAN'"
            @replBtnClick="ReplClick"
          >
          </CommentCard>
          <CommentCard
            :comment="'Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'"
            :date="'2021-01-01'"
            :uploader-avatar="'https://picsum.photos/32/32'"
            :user-handle="'77889'"
            :user-name="'AN2'"
            @replBtnClick="ReplClick"
          >
          </CommentCard>
          <CommentCard
            :comment="'Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'"
            :date="'2021-01-01'"
            :uploader-avatar="'https://picsum.photos/32/32'"
            :user-handle="'551dscd'"
            :user-name="'AN3'"
            @replBtnClick="ReplClick"
          >
          </CommentCard>
        </div>
        <!-- Repeat the above div for each review -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-header >>> ul.slick-dots {
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
