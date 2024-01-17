<script lang="ts" setup>
import dayjs from 'dayjs';
</script>
<template>
  <a-date-picker style="width: 200px" :disabled-date="(current:any) => dayjs(current).isBefore(dayjs())" />
</template>
