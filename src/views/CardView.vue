<template>
  <div class="product-page">
    <div class="product-header">
      <div class="image-gallery">
        <img :src="currentImage" alt="Game Cover" class="product-cover" />
        <div class="gallery-controls">
          <button
            v-for="(image, index) in images"
            :key="index"
            @click="setCurrentImage(image)"
          >
            <img
              :alt="'Game image ' + (index + 1)"
              :src="image"
              class="thumbnail"
            />
          </button>
        </div>
      </div>
      <h1 class="product-title">Game Title</h1>
      <p class="product-description">
        Short description of the game, its features, and any important
        information a buyer might want to know.
      </p>
      <div class="purchase-options">
        <button class="buy-button">Add to Cart</button>
        <div class="price">Price</div>
      </div>
    </div>
    <div class="product-details">
      <h2>Details</h2>
      <p>
        Here you can add more detailed information about the game, like system
        requirements, languages supported, etc.
      </p>
    </div>
    <div class="user-reviews">
      <h2>User Reviews</h2>
      <div class="review">
        <h3>Username</h3>
        <p>
          This is a review by a user. It contains their opinion on the game.
        </p>
      </div>
      <!-- Repeat the above div for each review -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductPage",
  // Data and methods for the product page can be added here
};
</script>

<style scoped>
.product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.product-header {
  text-align: center;
}

.product-cover {
  width: 100%;
  max-width: 600px; /* Adjust as necessary */
  border-radius: 8px;
  margin-bottom: 20px;
}

.product-title {
  font-size: 2em;
  margin: 10px 0;
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

.product-details,
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
