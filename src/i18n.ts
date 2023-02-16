import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";

// 使用VueI18n
Vue.use(VueI18n);

// 加载语言文件，并将它们转换为LocaleMessages类型的对象
function loadLocaleMessages(): LocaleMessages {
  // 从./locales文件夹中加载语言文件
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  // 创建一个用于存储语言文件的对象
  const messages: LocaleMessages = {};
  // 遍历语言文件，并将它们存储在messages对象中
  locales.keys().forEach((key) => {
    // 从文件名中提取语言
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  // 返回存储语言文件的对象
  return messages;
}

// 导出VueI18n实例
export default new VueI18n({
  // 使用环境变量设置当前语言，如果不存在则使用“en”
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  // 使用环境变量设置默认语言，如果不存在则使用“en”
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  // 使用加载的语言文件初始化VueI18n
  messages: loadLocaleMessages(),
});
