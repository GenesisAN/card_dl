import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.lightBlue, // 主要颜色，用于导航栏、按钮等。
        secondary: colors.grey.darken1, // 次要颜色，用于浮动操作按钮、选择框等。
        accent: colors.shades.black, // 强调颜色，用于强调按钮、活动状态图标等。
        error: colors.red.accent3, // 错误颜色，用于错误提示、无效字段等。
        info: colors.blue.accent2, // 信息颜色，通常用于提示信息。
        success: colors.green.accent3, // 成功颜色，用于状态指示、复选框等。
        warning: colors.amber.base, // 警告颜色，用于警告提示信息。
        anchor: colors.blue.darken2, // 锚点颜色，用于链接文本。
      },
      dark: {
        primary: colors.shades.white, // 深蓝色作为夜间模式主题色
        secondary: colors.grey.darken3,
        accent: colors.shades.white,
        error: colors.red.accent4,
        info: colors.blue.accent3,
        success: colors.green.accent4,
        warning: colors.amber.base,
        background: colors.shades.black, // 设置夜间模式背景色
      },
    },
    options: {
      customProperties: true, // 使主题颜色能够作为 CSS 变量在组件中使用
    },
    dark: false, // 默认为白天模式
  },
});
