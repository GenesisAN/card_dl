<template>
  <div class="upload_box">
    <v-card class="elevation-12">
      <v-toolbar :class="{ primary: !dark }">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title> Card Uploads </v-toolbar-title>
      </v-toolbar>
      <v-card class="image_card">
        <v-card-title v-if="selectedImage">
          <v-img
            :src="selectedImage"
            class="image_height"
            contain
            max-height="352"
          >
          </v-img>
          <v-card-text class="text-center">
            <v-divider></v-divider>
            {{ file.name }}{{ file_name_ex }}
          </v-card-text>
          <v-row v-if="!CardExist" justify="center" style="margin-top: 20px">
            <v-expansion-panels accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  卡片信息:{{ UploadInfoTemp.card_type }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row dense>
                    <v-col cols="12">
                      {{ UploadInfoTemp.char_info.firstname }}
                      {{
                        UploadInfoTemp.char_info.firstname &&
                        UploadInfoTemp.char_info.lastname
                          ? "-"
                          : ""
                      }}
                      {{ UploadInfoTemp.char_info.lastname }}
                      ({{
                        UploadInfoTemp.char_info.sex == 0 ? "男性" : "女性"
                      }})
                    </v-col>
                    <v-col v-if="UploadInfoTemp.char_info.nickname" cols="12">
                      昵称:{{ UploadInfoTemp.char_info.nickname }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >插件数量:{{ plugin_list.length }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row dense>
                    <v-col
                      v-for="(item, index) in plugin_list"
                      :key="index"
                      cols="12"
                      style="font-size: 14px"
                    >
                      [{{ index + 1 }}]: {{ item }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Mod数量:{{ zipmod_list.size }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row dense>
                    <v-col
                      v-for="(item, index) in zipmod_list.keys()"
                      :key="index"
                      cols="12"
                      style="font-size: 14px"
                    >
                      [{{ index + 1 }}]: {{ item }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-file-input
            v-model="file"
            accept="image/png"
            label="PNG input"
            show-size
            @change="onFileSelected"
          ></v-file-input>
          <v-switch
            v-if="!CardExist"
            v-model="auto_fill"
            :label="`标题自动填充`"
            inset
            style="margin-left: 20px"
            @change="autoFill"
          ></v-switch>
        </v-card-actions>
      </v-card>
      <v-form v-if="!CardExist" style="margin-top: 30px">
        <v-combobox
          v-model="chips"
          :items="items"
          :loading="loading"
          :search-input.sync="search"
          chips
          clearable
          label="卡片Tag设置(用于搜索)"
          multiple
          prepend-icon="mdi-tag-plus-outline"
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              :color="`$green lighten-3`"
              :input-value="selected"
              close
              v-bind="attrs"
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong
              >&nbsp;
              <!--<span>(interest)</span>-->
            </v-chip>
          </template>
        </v-combobox>
        <v-divider></v-divider>
        <v-text-field
          v-model="title"
          :rules="MainRule"
          hide-details="auto"
          label="卡片标题"
        ></v-text-field>
        <v-divider></v-divider>
        <v-textarea
          v-model="about"
          counter
          full-width
          label="卡片介绍"
          maxlength="120"
          single-line
        ></v-textarea>
      </v-form>
      <v-checkbox
        v-if="!CardExist"
        v-model="original"
        color="red"
        hide-details
        label="关闭评论区"
        value="red"
      ></v-checkbox>
      <v-checkbox
        v-if="!CardExist"
        v-model="comment_ban"
        color="red"
        hide-details
        label="这是原创卡片"
      ></v-checkbox>
      <v-card-actions v-if="!CardExist">
        <v-row justify="center">
          <v-col cols="12" md="4" sm="8">
            <v-btn block color="#63BBFFFF" dark x-large @click="submit">
              提交
              <v-icon right>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> 卡片上传成功</v-card-title>
        <v-card-text> 你可以继续上传，亦或是返回主页</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="(dialog = false), $router.push('/')"
          >
            返回主页
          </v-btn>

          <v-btn color="green darken-1" text @click="(dialog = false), clear()">
            继续上传
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

interface PluginData {
  Version: number;
  Data: any; // 你可能需要根据实际数据结构进一步指定这里的类型
}

interface ResolveInfo {
  GUID: string;
  Slot: number;
  LocalSlot: number;
  Property: string;
  CategoryNo: number;
}

interface PluginDataEx {
  Version: number;
  Name: string;
  RequiredPluginGUIDs: string[];
  RequiredZipmodGUIDs: ResolveInfo[];
}

interface ChaFileParameterEx {
  version: string;
  lastname: string;
  firstname: string;
  nickname: string;
  sex: number;
}

interface Card {
  extended_list: { [key: string]: PluginDataEx };
  char_info: ChaFileParameterEx;
  card_type: string;
  load_version: string;
  path: string;
  // 这里我省略了Extended、Image1和Image2，因为在你的JSON标记中，它们被设置为"-"，表示不会序列化。如果你在TS中需要它们，可以添加回来。
}

interface Response<T> {
  Code: number;
  Msg: string;
  Data: T;
}

type UploadInfoTemp = Card;
@Component
export default class CardUploadView extends Vue {
  file: File = new File([], "");
  auto_fill = false;
  title = "";
  plugin_list: string[] = [];
  zipmod_list: Map<string, any> = new Map();
  about = "";
  extendedListLength = 0;
  nonce = 0;
  file_name_ex = "";
  CardExist = false;
  original = false;
  select = null;
  loading = false;
  search = null;
  comment_ban = false;
  dialog = false;
  UploadInfoTemp: UploadInfoTemp = {
    extended_list: {},
    char_info: {
      version: "",
      lastname: "",
      firstname: "",
      nickname: "",
      sex: 0,
    },
    card_type: "",
    load_version: "",
    path: "",
  };
  selectedImage: string | ArrayBuffer | null = null;
  colors = ["green", "purple", "indigo", "cyan", "teal", "orange"];
  chips: string[] = [];
  items = [];
  tags: Map<string, any> = new Map();
  MainRule = [(v: string) => !!v || "This field is required"];

  mounted() {
    this.$store
      .dispatch("ex_me")
      .then((res: any) => {
        // eslint-disable-next-line no-empty
        if (res.code === 0) {
        } else {
          this.$router.push("/login");
        }
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  // 文件选择后执行的操作
  onFileSelected() {
    this.selectedImage = null;
    this.CardExist = false;
    this.file_name_ex = "";
    if (this.file) {
      const formData = new FormData();
      formData.append("card", this.file);
      this.$store
        .dispatch("upload_png", formData)
        .then((res: any) => {
          console.log(res);
          if (res.code === 0) {
            this.file_name_ex = "(已上传至缓存,等待数据提交)";
            this.UploadInfoTemp = JSON.parse(res.data);
            Object.keys(this.UploadInfoTemp.extended_list).forEach(
              (item: any) => {
                console.log(item);
                this.plugin_list.push(item);
              }
            );
            this.UploadInfoTemp.extended_list[
              "com.bepis.sideloader.universalautoresolver"
            ].RequiredZipmodGUIDs.forEach((item: any) => {
              console.log(item);
              this.zipmod_list.set(item.GUID, item);
            });
            this.autoFill();
          } else if (res.code === 56666) {
            this.file_name_ex = "(已在缓存找到,等待数据提交)";
            this.UploadInfoTemp = JSON.parse(res.data);
            Object.keys(this.UploadInfoTemp.extended_list).forEach(
              (item: any) => {
                console.log(item);
                this.plugin_list.push(item);
              }
            );
            this.UploadInfoTemp.extended_list[
              "com.bepis.sideloader.universalautoresolver"
            ].RequiredZipmodGUIDs.forEach((item: any) => {
              console.log(item);
              this.zipmod_list.set(item.GUID, item);
            });
            this.autoFill();
          } else if (res.code === 401) {
            //未登录
            this.$router.push("/login");
          } else {
            this.CardExist = true;
            this.UploadInfoTemp = res;
            this.file_name_ex = "(" + res.msg + ")";
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    this.selectedImage = URL.createObjectURL(this.file);
  }

  clear() {
    this.file = new File([], "");
    this.auto_fill = false;
    this.title = "";
    this.plugin_list = [];
    this.zipmod_list = new Map();
    this.about = "";
    this.extendedListLength = 0;
    this.nonce = 0;
    this.file_name_ex = "";
    this.CardExist = false;
    this.dialog = false;
    this.UploadInfoTemp = {
      extended_list: {},
      char_info: {
        version: "",
        lastname: "",
        firstname: "",
        nickname: "",
        sex: 0,
      },
      card_type: "",
      load_version: "",
      path: "",
    };
    this.selectedImage = null;
    this.chips = [];
  }

  autoFill() {
    if (this.auto_fill && this.UploadInfoTemp) {
      this.title =
        this.UploadInfoTemp.char_info.firstname +
        this.UploadInfoTemp.char_info.lastname;
    } else {
      this.title = "";
    }
  }

  remove(item: string) {
    this.chips.splice(this.chips.indexOf(item), 1);
  }
  get dark() {
    return this.$vuetify.theme.dark;
  }
  submit() {
    //遍历chips从tags中获取对应的tag_id并组成数组发
    //创建int 数组
    let tagsint: any[] = [];
    this.chips.forEach((item) => {
      tagsint.push(item);
    });
    this.$store
      .dispatch("upload_png_info", {
        md5: this.UploadInfoTemp.path,
        cardtage: tagsint,
        commentban: this.comment_ban,
        title: this.title,
        note: this.about,
      })
      .then((res: any) => {
        if (res.code === 0) {
          this.dialog = true;
        } else {
          this.dialog = false;
        }
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  @Watch("search")
  onSearchChange(newVal: string, oldVal: string) {
    newVal && newVal !== this.select && this.querySelections(newVal);
  }

  querySelections(v: string) {
    this.loading = true;
    const options = {
      params: { q: v },
    };
    this.$store
      .dispatch("ex_search_tags", options)
      .then((res: any) => {
        if (res.code === 0 && Array.isArray(res.data)) {
          // Extract the 'tt' values from each object in the data array
          this.items = res.data.map((item: { tt: string }) => {
            this.tags.set(item.tt, item);
            return item.tt;
          });
        }
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false; // Ensure loading is set to false even on error
      });
    // axios
    //   .request(options)
    //   .then((response) => {
    //     if (response.data.code === 0 && Array.isArray(response.data.data)) {
    //       // Extract the 'tt' values from each object in the data array
    //       this.items = response.data.data.map((item: { tt: string }) => {
    //         this.tags.set(item.tt, item);
    //         return item.tt;
    //       });
    //     }
    //     this.loading = false;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     this.loading = false; // Ensure loading is set to false even on error
    //   });
  }
}
</script>

<style scoped>
.image_card {
  padding: 5px;
}

.upload_box {
  display: flex;
  justify-content: center;
  height: 100%;
}

.elevation-12 {
  max-width: 900px;
  padding-top: 20px;
  padding-right: 40px;
  padding-left: 40px;
  width: 100%; /* Take up full width on smaller screens */
}

@media (max-width: 600px) {
  /* Styles for smaller screens (like phones) */
  .elevation-12 {
    padding-right: 10px;
    padding-left: 10px;
  }

  .image_card img {
    max-width: 100%;
    height: auto;
  }

  v-btn[x-large] {
    font-size: 1rem; /* Adjust button text size */
    padding: 12px 20px; /* Increase button size */
  }
}
</style>
