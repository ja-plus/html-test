/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue';

export default defineComponent({
  data() {
    return {
      message: 'hello',
      model:'11'
    };
  },
  methods: {
    handleClick(e) {
      console.log('handle div click', e);
    },
  },
  render() {
    const style = {
      margin: '10px',
    };
    let a = {};
    a.b = 1;
    let b = a?.b;
    const className = 'active';
    const Child = {
     default: <span>slooot</span>
    }

    const t = () => 'ss'

    return (
      <div id="myDiv" class={['my-div', className]} style={style} onClick={this.handleClick}>
        <input v-model={this.message} v-model:a={this.model}></input>
        <Comp name={this.message}>
          {Child}
        </Comp>
        <Comp>
          {t()}
        </Comp>
      </div>
    );
  },
});

const Comp = defineComponent({
  props: ['name'],
  setup: (props,ctx) => {
    const a = ref(1);
    const b = ref(2);
    return () => <div v-model={a.value} v-model:b={b.value}>{props.name}{ctx.slots.default()}</div>
  },
});
