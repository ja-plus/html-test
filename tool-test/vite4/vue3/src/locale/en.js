const enStore = JSON.parse(window.localStorage.getItem('vue-i18n') || '{}');

export const en = {
  ...enStore,
  hello: 'hello',
  language: 'Language',
};
