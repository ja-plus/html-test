<script setup>
// import HelloWorld from './components/HelloWorld.vue';
import VueUse from './components/VueUse.vue';
import VueI18n from './components/VueI18n.vue';
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();
// locale.value = 'zh-CN';
console.log(t('message.hello'), 'hello');
</script>

<template>
  <div>
    <header class="page-header">
      <div class="language">
        <span>{{ $t('message.language') }}: </span>
        <select v-model="locale">
          <option v-for="lc in $i18n.availableLocales" :key="`locale-${lc}`" :value="lc">
            {{ lc }}
          </option>
        </select>
      </div>
    </header>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
    <VueUse />
    <VueI18n />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #aaa;
  width: 100%;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
}
.page-header .language {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
</style>
