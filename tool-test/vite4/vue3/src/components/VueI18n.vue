<template>
  <div>
    <hr />
    <h2>Vue-i18n</h2>
    <p>{{ myT('hello') }}</p>
    <p>{{ myT('你好') }}</p>
  </div>
</template>
<script setup>
import { myT } from '../locale';
</script>
