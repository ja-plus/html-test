import { createI18n } from 'vue-i18n';
import { en } from './en';
export const i18n = createI18n({
  legacy: false,
  locale: 'en',

  //   fallbackLocale: 'en',
  formatFallbackMessages: true,
  messages: {
    en,
    zh: {
      hello: '你好',
      language: '语言',
    },
  },
});

export function myT(text) {
  if (!en[text]) {
    resolveTranslation(text);
  }
  return i18n.global.t(text);
}

let debounceTimeout = 0;
/** @type {Set<string>} */
let textCache = new Set();
function resolveTranslation(text) {
  textCache.add(text);
  if (debounceTimeout) return;
  debounceTimeout = requestIdleCallback(() => {
    const textArr = [...textCache];
    // 兜底
    // let noneMessage = {};
    // textArr.forEach(k => (noneMessage[k] = '-'));
    // i18n.global.mergeLocaleMessage('en', noneMessage);

    getTranslation(textArr).then(resultArr => {
      let message = {};
      textArr.forEach((k, i) => {
        message[k] = resultArr[i];
      });

      i18n.global.mergeLocaleMessage('en', message);

      const store = JSON.stringify(i18n.global.messages.value.en);
      window.localStorage.setItem('vue-i18n', store);

      debounceTimeout = 0;
      textCache.clear();
    });
  });
}
/**
 * @param {string[]} textArr
 * @returns
 */
function getTranslation(textArr) {
  return new Promise(resolve => {
    window.setTimeout(() => {
      let text = JSON.stringify(textArr);
      let result = JSON.parse(text);
      let resultArr = result.map(it => it + '--en');
      resolve(resultArr);
    }, 500);
  });
}
