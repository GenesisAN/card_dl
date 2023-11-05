<template>
  <div>
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
            <v-avatar class="green-darken-4"> 1 </v-avatar>
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
        <button class="buy-button">Download</button>
        <button class="buy-button">Add to Bookmark</button>
        <button class="buy-button">Like</button>
        <button class="buy-button">Report</button>
      </div>
    </div>
    <div class="product-page">
      <div class="product-details">
        <h2>Details</h2>
        <p>Here you can add more detailed information about the card.</p>
      </div>
      <div class="user-reviews">
        <h2>User Reviews</h2>
        <!-- Assuming there are multiple reviews, so this would be repeated for each one. -->
        <div class="review">
          <h3>Another Username</h3>
          <p>
            This is another review by a user. It contains their opinion on the
            card.
          </p>
        </div>
        <!-- Repeat the above div for each review -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardView",
};
</script>

<style scoped>
.product-header >>> ul.slick-dots {
  padding-left: 0px;
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
  color: white;
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
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
