<template>
  <div class="container">
    <div class="center-div"></div>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%; /* 或者根据需要设置其他高度 */
}

.center-div {
  flex: 8; /* 占据5分之3的宽度 */
  background-color: #e5e5e5; /* 仅为可视化而设置，您可以根据需要更改或删除 */
  height: 1500px; /* 或者根据需要设置其他高度 */
  border-radius: 10px;
}
</style>
