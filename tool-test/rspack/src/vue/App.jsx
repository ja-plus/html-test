import { defineComponent, ref } from 'vue';
import VueSFC from './VueSFC.vue';
import VueSFC_TS from './VueSFC.ts.vue';

export const App = defineComponent({
  name: 'App',
  setup() {
    const count = ref(1);
    return () => (
      <div>
        <h1>Rspack + Vue</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => count.value++}>count:{count.value}</button>
        </div>
        <VueSFC></VueSFC>
        <VueSFC_TS></VueSFC_TS>
      </div>
    );
  },
});
