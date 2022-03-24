<template lang="pug">
div 
  span inputData:
  input(v-model='inputData')
  button(@click='callRefFunc') callRefFunc
  div getComputedValue: {{ computedVal }}
  div setComputedValue:
    input(v-model='computedVal')
  div childVModel:
    input(v-model='childValue')
  hr
  Child(
    ref='childComp',
    v-model='childValue',
    :name='name',
    :inputData.sync='inputData',
    @btn-click='btnClick',
    @btnClick2='btnClick2',
    @btnClick3='btnClick3'
  )
</template>

<script lang="ts">
import Child from './Child.vue';
import { Component, Provide, Ref, Vue, Watch } from 'vue-property-decorator';
// import { mapActions } from 'vuex';
import store from './store';
@Component({
  components: {
    Child,
  },
  // methods:{
  //     ...mapActions(['updateInputText'])
  // }
})
export default class extends Vue {
  name = 'propName';
  inputData = '1';
  childValue = '1';
  /* @Provide() 括号不填为'provide' */
  @Provide() provide = 'provideVal';
  @Ref('childComp') readonly childRef!: Child;

  @Watch('inputData')
  updateStoreCount(value: string): void {
    // this.updateInputText(value)

    store.commit('increment');
    store.dispatch('updateInputText', value);
  }

  // computed写法
  get computedVal(): string {
    return this.name + '_' + this.inputData;
  }
  // 可以set computed属性 来更新
  set computedVal(val: string) {
    const splitted = val.split('_');
    this.name = splitted[0];
    this.inputData = splitted[1];
  }

  callRefFunc(): void {
    // 有代码提示！ 好
    this.childRef.refFunc();
  }

  btnClick(value: string, e: PointerEvent): void {
    console.log('receive emit event:', value, e);
  }

  btnClick2(value: number): void {
    console.log('revice emit evnet2:', value);
  }
  btnClick3(value: string): void {
    console.log('revice emit evnet3:', value);
  }
}
</script>
<!--
<script lang="ts">
import Vue from 'vue';
import Child from './Child.vue';
import store from './store';
export default Vue.extend({
  components: {
    Child,
  },
  provide: {
    provide: 'provideVal',
  },
  data() {
    return {
      name: 'propName',
      inputData: '1',
      childValue: '1',
    };
  },
  computed: {
    computedVal: {
      get() {
        return this.name + '_' + this.inputData; // 类型问题
      },
      set(val: string) {
        const splitted = val.split('_');
        this.name = splitted[0];
        this.inputData = splitted[1];
      },
    },
  },
  watch: {
    inputData(val: string) {
      store.commit('increment'); // 没有代码提示
      store.dispatch('updateInputText', val); // 没有代码提示
    },
  },
  methods: {
    callRefFunc(): void {
      this.$refs.childComp.refFunc(); // 没有代码提示
    },

    btnClick(value: string, e: PointerEvent): void {
      console.log('receive emit event:', value, e);
    },

    btnClick2(value: number): void {
      console.log('revice emit evnet2:', value);
    },
    btnClick3(value: string): void {
      console.log('revice emit evnet3:', value);
    },
  },
});
</script>
-->
<style lang="less" scoped></style>
