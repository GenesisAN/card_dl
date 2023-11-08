<template>
  <v-card class="mx-auto comment-card">
    <!-- Comment Text -->
    <v-card-text class="text-h5 py-3 comment-text">
      {{ comment }}
    </v-card-text>

    <!-- Actions and User Info -->
    <v-card-actions class="comment-actions comment-text">
      <v-row class="w-100 d-flex align-center justify-space-between no-gutters">
        <!-- User Avatar and Info -->
        <!--        <v-col class="d-flex align-center">-->
        <!--          <v-avatar class="mr-3 comment-avatar">-->
        <!--            <img v-if="uploaderAvatar" :src="uploaderAvatar" />-->
        <!--            <span v-else class="black&#45;&#45;text text-h5">{{ avatarName }}</span>-->
        <!--          </v-avatar>-->
        <!--          <v-list-item-content>-->
        <!--            <v-list-item-title>{{ userName }}</v-list-item-title>-->
        <!--            <v-list-item-subtitle class="grey&#45;&#45;text text&#45;&#45;lighten-1">-->
        <!--              {{ userHandle }}-->
        <!--            </v-list-item-subtitle>-->
        <!--          </v-list-item-content>-->
        <!--        </v-col>-->
        <UserAvatar
          :avatar-url="uploaderAvatar"
          :user-handle="userHandle"
          :user-name="userName"
          class="align-center"
        ></UserAvatar>
        <!-- Spacer to push content to edges -->
        <v-spacer></v-spacer>

        <!-- Date and Menu -->
        <v-col class="d-flex align-center justify-end" cols="auto">
          <v-list-item-subtitle class="grey--text mr-4">
            {{ date }}
          </v-list-item-subtitle>
          <v-btn color="secondary" icon rounded @click="replBtn">
            <v-icon>mdi-message</v-icon>
          </v-btn>
          <!-- Menu Button -->
          <v-menu offset-y transition="slide-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="icon-dots" v-bind="attrs" v-on="on"
                >mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <v-list-item @click="reportPost">
                <v-list-item-title>Report</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "CommentCard",
  components: { UserAvatar },
  props: {
    avatarName: String,
    uploaderAvatar: String,
    userName: String,
    userHandle: String,
    comment: String,
    date: String,
    // repBtn按钮触发的函数,拥有一个string类型的参数
  },
  methods: {
    reportPost() {
      // Emit an event when the report button is clicked
      // this.$emit("report", {
      //   userName: this.userName,
      //   userHandle: this.userHandle,
      //   date: this.date,
      // });
    },
    replBtn() {
      this.$emit("replBtnClick", "@" + this.userHandle + " ");
    },
  },
};
</script>

<style scoped>
.comment-card .icon-dots {
}

.comment-card {
}

.comment-card .comment-text {
  padding-left: 16px; /* Padding to align text with the avatar and menu icon */
  padding-right: 16px; /* Padding to maintain consistency */
}

.comment-card .comment-actions .v-row,
.comment-card .comment-text {
  padding-left: 16px; /* Padding to align actions with the card text */
}

.comment-card .comment-avatar img {
  object-fit: cover; /* Ensure the avatar image is properly scaled */
}

.comment-card .comment-avatar .black--text {
  color: #000; /* Black text color for the avatar name when no image */
}

/* Additional styling for the avatar background if needed */
.comment-card .comment-avatar .white--text {
  background-color: #e0e0e0; /* Light grey background color for avatar when no image */
}
</style>