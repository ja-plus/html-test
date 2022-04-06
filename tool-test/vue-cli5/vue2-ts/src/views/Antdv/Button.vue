<template>
  <div>
    <a-button type="primary"> Primary Button </a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed"> Dashed Button </a-button>
    <a-button type="text"> Text Button </a-button>
    <a-button type="link"> Link Button </a-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AntdvButton extends Vue {}
</script>
