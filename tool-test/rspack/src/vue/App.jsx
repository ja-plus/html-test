import { defineComponent, ref } from 'vue';

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
      </div>
    );
  },
});
