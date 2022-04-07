<template lang="pug">
div height:
  input(type="range" min="100" max="1000" @input="e => props.height = e.target.value + 'px'") 
  | {{props.height}}
div width:
  input(type="range" min="100" max="1000"  @input="e => tableWidth = e.target.value + 'px'") 
  | {{tableWidth}}
div(:style="{width: tableWidth}")
  EasyTable(ref="easyTable" :height="props.height" :columns="columns" :dataSource="dataSource")
div columns:{{columns}}
//- div dataSource:{{dataSource}}
hr
div tableHeaders:{{easyTable.tableHeaders}}
div tableProps:{{easyTable.tableProps}}
</template>

<script>
import EasyTable from '../src/EasyTable.vue';
export default {
  components: { EasyTable },
  props: {},
  data() {
    return {
      easyTable: {},
      tableWidth: '300px;',
      props: {
        height: '200px',
        // minWidth: 'auto',
      },
      columns: [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Age', dataIndex: 'age' },
      ],
      dataSource: new Array(100).fill(0).map((it, i) => ({ name: 'name', age: i, email: 'add@sa.com' })),
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.easyTable = this.$refs.easyTable;
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
