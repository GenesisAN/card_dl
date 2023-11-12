<script>
import CommentCard from "@/components/CommentCard.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import props from "vuetify/src/components/VCalendar/util/props";

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
    mods_name: {},
    plugins_length: 0,
    plugins_name: [],
    commits: [],
    mode_dialog: false,
    plug_dialog: false,
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
            // this.mods_length = this.card?.CardMod
            //   ? this.card.CardMod.length
            //   : 0;
            // this.plugins_length = this.card?.CardPlugin
            //   ? this.card.CardPlugin.length
            //   : 0;
            this.card.CardMod?.forEach((item) => {
              if (
                !Object.prototype.hasOwnProperty.call(this.mods_name, item.GUID)
              ) {
                item.Modinfo.BPath = item.Modinfo.Path.replace(
                  "KK/mods/",
                  "KKEC/"
                );
                item.Modinfo.CPath = item.Modinfo.Path.replace("KK/mods/", "");
                if (item.Modinfo.GUID === "") {
                  this.mods_name[item.GUID] = 0;
                } else {
                  this.mods_name[item.GUID] = item.Modinfo;
                }
              }
            });
            this.mods_length = Object.keys(this.mods_name).length;
            this.card.CardPlugin?.forEach((item) => {
              if (!this.plugins_name.includes(item.Name)) {
                this.plugins_name.push(item.Name);
              }
            });
            this.plugins_length = this.plugins_name.length;

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
    <!-- ↓↓↓悬浮的回复按钮↓↓↓ -->
    <v-btn bottom color="blue" dark fab fixed right x-large @click="JumpToMsg">
      <v-icon>mdi-message</v-icon>
    </v-btn>
    <!-- ↓↓↓悬浮的下载按钮↓↓↓ -->
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

    <div class="product-header">
      <v-carousel>
        <!-- ↓↓↓开头展示的封面图片，可以有多个！↓↓↓ -->
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
      <!-- ↓↓↓作者用户头像↓↓↓ -->
      <UserAvatar
        :avatar-name="card.UploadUserInfo.AvatarName"
        :avatar-url="card.UploadUserInfo.avatar"
        :user-handle="card.UploadUserInfo.nickname"
        :user-name="card.UploadUserInfo.nickname"
        class="ma-4"
      ></UserAvatar>
      <!-- ↓↓↓卡片介绍正文↓↓↓ -->
      <p class="product-description">
        {{ card.Note }}
      </p>
      <!-- ↓↓↓模组和插件按钮↓↓↓ -->
      <div class="text-center">
        <v-dialog v-model="mode_dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" v-bind="attrs" v-on="on">
              <v-icon>mdi-toy-brick-plus</v-icon>
              {{ mods_length }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 lighten-2">
              {{ $t("mode_list") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-scroll>
              <p />
              <div
                v-for="(value, key) in mods_name"
                :key="key"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;
                "
              >
                <span
                  :style="{
                    color: value === 0 ? 'red' : 'blue',
                    pointerEvents: value === 0 ? 'none' : 'auto',
                  }"
                  >{{ key }}</span
                >
                <div style="display: flex; align-items: center">
                  <span v-if="value !== 0" style="margin-left: 10px">
                    <a
                      :href="`https://sideload.betterrepack.com/download/${value.BPath}`"
                      >[betterrepack]</a
                    >
                  </span>
                  <span v-if="value !== 0" style="margin-left: 10px">
                    <a :href="`https://api.carddl.com:5555/mod${value.CPath}`"
                      >[CardDL]</a
                    >
                  </span>
                  <span v-if="value == 0" style="margin-left: 10px">
                    <a :href="`https://cardd.co/mods/${key}.html`">{{
                      $t("help_us_find")
                    }}</a>
                  </span>
                </div>
              </div>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="mode_dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="plug_dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" v-bind="attrs" v-on="on">
              <v-icon>mdi-puzzle-plus</v-icon>
              {{ plugins_length }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 lighten-2">
              {{ $t("plugin_list") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-scroll>
              <p />
              <a
                v-for="p in plugins_name"
                v-bind:key="p"
                href="/about"
                style="display: block; margin-bottom: 10px; pointerevents: none"
              >
                {{ p }}
              </a>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="plug_dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <!-- ↓↓↓卡片标签↓↓↓ -->
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
      <!-- ↓↓↓下载，收藏，点赞，举报↓↓↓ -->
      <div class="purchase-options">
        <v-btn class="buy-button">{{ $t("download") }}</v-btn>
        <v-btn class="buy-button">{{ $t("like") }}</v-btn>
        <v-btn class="buy-button">{{ $t("bookmark") }}</v-btn>
        <v-btn class="buy-button">{{ $t("report") }}</v-btn>
      </div>
    </div>
    <!-- ↓↓↓回复区域↓↓↓ -->
    <div class="product-page">
      <!-- ↓↓↓回复输入框↓↓↓ -->
      <v-form class="user-reviews">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-textarea
                id="messagebox"
                v-model="message"
                :append-icon="icon"
                :append-outer-icon="'mdi-send'"
                :label="$t('comment_text')"
                auto-grow
                clear-icon="mdi-close-circle"
                clearable
                counter
                filled
                rows="1"
                type="text"
                @click:append="changeIcon"
                @click:append-outer="sendMessage"
                @click:clear="clearMessage"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <!-- ↓↓↓评论区域↓↓↓ -->
      <div class="user-reviews">
        <h2>{{ $t("comment") }}</h2>
        <!-- ↓↓↓评论内容遍历展示↓↓↓ -->
        <div class="review">
          <!-- ↓↓↓没有评论时的展示↓↓↓ -->
          <v-card v-if="commits.length == 0">
            <v-card-title class="text-center">
              <v-card-text class="text-center">
                {{ $t("no_comment") }}
              </v-card-text>
            </v-card-title>
          </v-card>
          <!-- ↓↓↓有评论时的展示↓↓↓ -->
          <CommentCard
            v-for="c in commits"
            :key="c.id"
            :avatar-url="c.avatar"
            :comment="c.content"
            :date="c.created_at"
            :user-handle="c.nickname"
            :user-name="c.nickname"
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
