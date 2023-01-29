<template>
  <div>
    <h1>VueUse</h1>
    <p>useMouse: x:{{ x }},y:{{ y }}</p>
    <p>useMouse_debounce: x:{{ debounceMouse.x }},y:{{ debounceMouse.y }}</p>
    <p ref="outside" style="border: 1px solid" @click="outsideVal = 'inside'">{{ outsideVal }}</p>
    <div ref="draggable" :style="draggableStyle" class="draggable-div">
      <p>useDraggable</p>
      <p>x:{{ draggableX }}, y: {{ draggableY }}</p>
    </div>
  </div>
</template>
<script setup>
import { debounceFilter, useLocalStorage, useMouse, onClickOutside, useDraggable } from '@vueuse/core';
import { ref } from 'vue';
useLocalStorage('myLS', { a: 1 });
const { x, y } = useMouse();
const debounceMouse = useMouse({ eventFilter: debounceFilter(100) });
const outside = ref();
const outsideVal = ref('inside');
onClickOutside(outside, () => {
  outsideVal.value = 'click outside';
});

const draggable = ref();
/** 这里必须要用解构，否则style无法响应 */
const {
  style: draggableStyle,
  x: draggableX,
  y: draggableY,
} = useDraggable(draggable, {
  initialValue: { x: 40, y: 40 },
});
</script>
<style scoped>
.draggable-div {
  position: fixed;
  user-select: none;
  width: 200px;
  border-radius: 5px;
  background-color: antiquewhite;
  border: 2px solid indianred;
  cursor: grab;
}
.draggable-div:active {
  cursor: grabbing;
}
</style>
