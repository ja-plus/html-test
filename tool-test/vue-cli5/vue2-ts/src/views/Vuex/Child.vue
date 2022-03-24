<template lang="pug">
div
  div 
    b Child:
  div v-model value:
    input(v-model='modelVal')
  div inject.provide: {{ provide }}, alias: {{ provideAlias }}
  div store.count: {{ count }}
  div store.inputText: {{ inputText }}
  div prop.name: {{ name }}
  div prop.inputData.sync:
    input(v-model='inputDataSync')
  div
    button(@click='btnClick') Emit
</template>
<script lang="ts">
import { Component, Emit, Inject, Prop, PropSync, VModel, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import store from './store';
@Component({
  // props:{ name:String },// invalid
  // computed: {
  //   ...mapState(['count', 'inputText']),
  // },
})
export default class Child extends Vue {
  @Inject() provide!: string;
  @Inject('provide') provideAlias!: string;

  @Prop({ type: String, default: 'defaultName' }) readonly name: string | undefined;
  @PropSync('inputData', { type: String, default: 'no data' }) readonly inputDataSync: string | undefined;

  @VModel({ type: String }) modelVal!: string;

  get count(): number {
    return store.state.count;
  }
  get inputText(): string {
    return store.state.inputText;
  }

  @Emit()
  btnClick(e: PointerEvent): string {
    this.emitFunc(12); // 将emit封装为一个方法
    return 'emit btn click'; // emit return中的内容
  }
  @Emit('btnClick2')
  emitFunc(num: number): number {
    this.$emit('btnClick3', '不用装饰器emit'); // 可以直接使用原来的？
    return num;
  }

  /**
   * 供父组件调用的ref 方法
   * @param {String} text 传入的参数
   */
  refFunc(text?: string): string {
    console.log('refFunc 被调用');
    return text || '';
  }
}
</script>
