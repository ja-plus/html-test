/* eslint-disable vue/one-component-per-file */
import { defineComponent, h } from 'vue';

export default defineComponent({
  data() {
    return {
      message: 'hello',
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
    const className = 'active';
    return (
      <div id="myDiv" class={['my-div', className]} style={style} onClick={this.handleClick}>
        <Comp name={this.message}></Comp>
      </div>
    );
  },
});

const Comp = defineComponent({
  props: ['name'],
  render: () => <div>{this.name}</div>,
});
