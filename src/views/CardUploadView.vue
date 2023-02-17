<template>
  <div class="upload_box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title>Card Upload</v-toolbar-title>
      </v-toolbar>
      <v-form style="margin-top: 40px">
        <v-file-input v-model="file" show-size label="PNG input"></v-file-input>
        <v-combobox
          v-model="chips"
          :items="items"
          chips
          clearable
          label="卡片Tag设置(用于搜索)"
          multiple
          prepend-icon="mdi-tag-plus-outline"
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              :color="`$green lighten-3`"
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong
              >&nbsp;
              <!--<span>(interest)</span>-->
            </v-chip>
          </template>
        </v-combobox>
        <v-switch
          v-model="auto_fill"
          inset
          :label="`卡片信息自动填充`"
        ></v-switch>
        <v-divider></v-divider>
        <v-text-field
          label="卡片标题"
          :rules="MainRule"
          v-model="title"
          hide-details="auto"
        ></v-text-field>
        <v-divider></v-divider>
        <v-textarea
          v-model="about"
          label="卡片介绍"
          counter
          maxlength="120"
          full-width
          single-line
        ></v-textarea>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import axios from "axios";
@Component
export default class CardUploadView extends Vue {
  file = "";
  auto_fill = false;
  title = "";
  about = "";
  nonce = 0;
  colors = ["green", "purple", "indigo", "cyan", "teal", "orange"];
  chips: string[] = [];
  items = [
    "Streaming",
    "Eating",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ];
  MainRule = [(v: string) => !!v || "This field is required"];
  upload() {
    const formData = new FormData();
    formData.append("file", this.file);
    axios
      .post("http://localhost:8000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  remove(item: string) {
    this.chips.splice(this.chips.indexOf(item), 1);
  }
}
</script>

<style scoped>
.upload_box {
  display: flex;
  justify-content: center;
  height: 100%;
}
.elevation-12 {
  width: 900px;
  padding-top: 20px;
  padding-right: 40px;
  padding-left: 40px;
}
</style>
