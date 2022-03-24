<template>
  <h1>hello world</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'a',
    },
  },
  emits: {
    emitFunc(payload: string) {
      return payload.length > 0;
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    let str = this.name;
    console.log(str);
    this.$emit('emitFunc', 123); // 没有类型验证？
  },
  mounted() {},
  methods: {},
});
</script>
