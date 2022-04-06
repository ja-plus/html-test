<template lang="pug">
div
    span a-range-picker:
    RangePicker
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RangePicker from './RangePicker.vue';
@Component({
  components: {
    RangePicker,
  },
})
export default class AntdvDatePicker extends Vue {}
</script>
