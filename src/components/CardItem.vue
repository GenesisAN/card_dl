<template>
  <v-card class="flex-column" width="176px" height="325px">
    <div
      class="card-thumb-wrapper relative"
      @mouseover="$emit('mouseover', index)"
      @mouseleave="$emit('mouseleave')"
    >
      <v-img :src="card.Thumb" min-height="125px" min-width="176px">
        <v-card-title
          v-if="hover"
          class="card-toolbar absolute pd-h3 flex-row-between w-100"
        >
        </v-card-title>
      </v-img>
      <v-overlay v-if="hover" absolute color="#000000FF" z-index="0">
        <div>
          <v-btn @click="$emit('download', card)">Donwload</v-btn>
          <v-btn @click="$emit('like', card)">Like</v-btn>
          <v-btn @click="$emit('bookmark', card)">Bookmark</v-btn>
        </div>
      </v-overlay>
    </div>
    <v-card-title class="card-title">{{
      truncateString(card.Title, 8)
    }}</v-card-title>
    <v-card-subtitle>
      <v-avatar color="brown" size="30">
        <img v-if="card.uploaderAvatar" :src="card.uploaderAvatar" />
        <span v-else class="white--text text-h5">{{ card.AvatarName }}</span>
      </v-avatar>
      <a color="#white" class="a-uploader">{{ card.uploader }}</a>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    },
  },
};
</script>

<style scoped>
/* ... your styles from the original component ... */
</style>
