<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5">
          <v-card-title class="text-h4">关于本网站</v-card-title>
          <v-card-text>
            <p>本网站是一个正在开发中的项目</p>
            <p>许多警告，错误处理，故障提示，包括基础功能，还在开发中。</p>
            <p>
              如果您遇到任何问题或有任何建议，欢迎随时反馈给我，我会尽快处理和改进。
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="“primary”" href="“mailto:contact@website.com”"
              >联系我们</v-btn
            >
            <v-spacer></v-spacer> <v-icon>mdi-dev-to</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="“ts”">
import Vue from "vue";

export default Vue.extend({
  name: "HomeView",
  components: {
  },
});
</script>
