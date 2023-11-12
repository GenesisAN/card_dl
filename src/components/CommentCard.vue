<template>
  <v-card class="mx-auto comment-card">
    <!-- Comment Text -->
    <v-card-text class="text-h5 py-3 comment-text">
      {{ comment }}
    </v-card-text>

    <!-- Actions and User Info -->
    <v-card-actions class="comment-actions comment-text">
      <v-row class="w-100 d-flex align-center justify-space-between no-gutters">
        <UserAvatar
          :avatar-url="avatarUrl"
          :user-handle="userHandle"
          :user-name="userName"
          class="align-center"
        ></UserAvatar>
        <!-- Spacer to push content to edges -->
        <v-spacer></v-spacer>

        <!-- Date and Menu -->
        <v-col class="d-flex align-center justify-end" cols="auto">
          <v-list-item-subtitle class="grey--text mr-4">
            {{ timeAgo(date) }}
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
    avatarUrl: String,
    userName: String,
    userHandle: String,
    comment: String,
    index: String,
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
    timeAgo(dateString) {
      const backendTime = new Date(dateString);
      const currentTime = new Date();

      // Calculate the time difference in milliseconds
      const timeDifference = currentTime - backendTime;

      // Convert time difference to minutes, hours, and days
      const minutesAgo = Math.floor(timeDifference / 60000);
      const hoursAgo = Math.floor(timeDifference / 3600000);
      const daysAgo = Math.floor(timeDifference / 86400000);

      if (minutesAgo < 60) {
        return `${minutesAgo}分钟前`;
      } else if (hoursAgo < 24) {
        return `${hoursAgo}小时前`;
      } else {
        const options = { month: "numeric", day: "numeric" };
        if (backendTime.getFullYear() !== currentTime.getFullYear()) {
          options.year = "numeric";
        }
        return backendTime.toLocaleDateString("zh-CN", options);
      }
    },
  },
};
</script>

<style scoped>
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
