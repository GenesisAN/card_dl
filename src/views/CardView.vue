<script>
import CommentCard from "@/components/CommentCard.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import props from "vuetify/src/components/VCalendar/util/props";

export default {
  name: "CardView",
  computed: {
    props() {
      return props;
    },
  },
  components: { UserAvatar, CommentCard },
  data: () => ({
    dialog: false,
  }),
};
</script>
<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          bottom
          color="blue"
          dark
          fab
          fixed
          right
          v-bind="attrs"
          x-large
          v-on="on"
        >
          <!-- 这里放置按钮图标或文本 -->
          <v-icon>mdi-message</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          {{ $t("settings") }}
        </v-card-title>
        <v-col>
          <v-container fluid>
            <v-row align="center">
              <v-col cols="6">
                <v-subheader>{{ $t("language") }}</v-subheader>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="set_lange"
                  :items="states"
                  :label="$t('select_language')"
                  menu-props="auto"
                ></v-select>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="6">
                <v-subheader>夜间模式</v-subheader>
              </v-col>
              <v-col cols="6">
                <v-switch v-model="$vuetify.theme.dark"></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"
            >{{ $t("setting") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      style="margin-bottom: 85px"
      x-large
      @click="onClickFab"
    >
      <!-- 这里放置按钮图标或文本 -->
      <v-icon>mdi-download</v-icon>
    </v-btn>

    <!-- Product header will now use flexbox to align items -->
    <div class="product-header">
      <!-- Carousel container with flex: 2 to take twice as much space as author info -->
      <v-carousel>
        <v-carousel-item>
          <div class="d-flex justify-center align-center" style="height: 100%">
            <img src="https://picsum.photos/1920/1080" />
          </div>
        </v-carousel-item>

        <v-carousel-item>
          <div class="d-flex justify-center align-center" style="height: 100%">
            <img
              src="http://localhost:3000/api/v1/card/thumd/1/9df566e37275a8c93d3be31319a7588e.jpg"
            />
          </div>
        </v-carousel-item>

        <v-carousel-item>
          <div class="d-flex justify-center align-center" style="height: 100%">
            <img
              src="http://localhost:3000/api/v1/card/thumd/1/397ec4ed8a6d80b9151a4686c9b70494.jpg"
            />
          </div>
        </v-carousel-item>
      </v-carousel>
      <!-- Author info container with flex: 1 -->
      <h1 class="product-title">Card Title</h1>

      <UserAvatar
        :avatar-url="'https://picsum.photos/32/32'"
        :user-handle="'user123'"
        :user-name="'AN'"
        class="ma-4"
      ></UserAvatar>
      <p class="product-description">
        Short description of the card, its features, and any important
        information a player might want to know.
      </p>

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
        <v-btn class="buy-button">Download</v-btn>
        <v-btn class="buy-button">Add to Bookmark</v-btn>
        <v-btn class="buy-button">Like</v-btn>
        <v-btn class="buy-button">Report</v-btn>
      </div>
    </div>
    <div class="product-page">
      <!--      <div class="product-details">-->
      <!--        <h2>Details</h2>-->
      <!--        <p>Here you can add more detailed information about the card.</p>-->
      <!--      </div>-->
      <div class="user-reviews">
        <h2>User Reviews</h2>
        <!-- Assuming there are multiple reviews, so this would be repeated for each one. -->
        <div class="review">
          <CommentCard
            :avatar-name="'GenesisAN'"
            :comment="'Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'"
            :date="'2021-01-01'"
            :uploader-avatar="'https://picsum.photos/32/32'"
            :user-handle="'user123'"
            :user-name="'AN'"
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
