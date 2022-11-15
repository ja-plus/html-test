import { ref, computed, watch, toRefs } from 'vue';

export default function addCounter(props){
  // let prop = toRefs(props);
  const counter = ref(0);
  const counter2 = computed(() => counter.value * 2);
  watch(counter, (n, o) => {
    console.log('counter change:', n, o);
  });
  // watch(prop.user, (n, o) => {
  //   console.log('props.user change', n, o);
  //   counter.value++;
  // });
  return {
    counter,
    counter2,
  };
}