<template lang="pug">
  div
    img(src="https://next.antdv.com/assets/logo.1ef800a8.svg" alt="Ant design vue" srcset="" style="height:60px;")
    Button
    Table
    DatePicker
</template>

<script lang="ts">
import Antdv from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Button from './Button.vue';
import Table from './Table.vue';
import DatePicker from './DatePicker/index.vue';
import { Component, Vue } from 'vue-property-decorator';
Vue.use(Antdv);

@Component({
  components: {
    Button,
    Table,
    DatePicker,
  },
})
export default class App extends Vue {}
</script>

<style></style>
