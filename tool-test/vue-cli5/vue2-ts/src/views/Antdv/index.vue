<template lang="pug">
  div
    img(src="https://next.antdv.com/assets/logo.1ef800a8.svg" alt="Ant design vue" srcset="" style="height:20px;")
    Button
    Table
</template>

<script lang="ts">
import Antdv from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Button from './Button.vue';
import Table from './Table.vue';
import { Component, Vue } from 'vue-property-decorator';
Vue.use(Antdv);

@Component({
  components: {
    Button,
    Table,
  },
})
export default class App extends Vue {}
</script>

<style></style>
