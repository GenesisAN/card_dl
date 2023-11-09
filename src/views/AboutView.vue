<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card class="pa-5">
          <v-card-title class="text-h4 d-flex justify-center"
            >关于本网站
          </v-card-title>
          <v-card-text class="text-h6">
            <p>本网站是一个正在开发中的公益性非盈利项目</p>
            <p>许多警告，错误处理，故障提示，包括基础功能，还在开发中。</p>
            <p>
              如果您遇到任何问题或有任何建议，欢迎随时反馈给我，我会尽快处理和改进。
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn href="mailto: admin@kkgkd.com"
              >联系我
              <v-icon>mdi-email</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-icon>mdi-emoticon-cool</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card class="pa-5">
          <v-card-title class="text-h5">待实现功能清单：</v-card-title>
          <v-card-text>
            <ul>
              <li>
                <v-icon color="green">mdi-toy-brick-outline</v-icon>
                <span>基础功能</span>
                <ul>
                  <li>Mod下载</li>
                  <li>卡片更新Tag</li>
                  <li>回复提醒</li>
                  <li>@提醒</li>
                  <li>个人资料编辑</li>
                  <li>权限管理</li>
                  <li>流量限制</li>
                </ul>
              </li>
              <li>
                <v-icon color="red">mdi-alert-circle-outline</v-icon>
                <span>错误处理</span>
                <ul>
                  <li>请求异常提醒</li>
                </ul>
              </li>
              <li>
                <v-icon color="blue">mdi-shield-bug-outline</v-icon>
                <span>BUG修复</span>
                <ul>
                  <li>暂无</li>
                </ul>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="“ts”"></script>
