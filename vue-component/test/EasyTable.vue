<template lang="pug">
div height:
  input(type="range" min="100" max="1000" @input="e => props.height = e.target.value + 'px'") 
  | {{props.height}}
div width:
  input(type="range" min="100" max="2000"  @input="e => tableWidth = e.target.value + 'px'") 
  | {{tableWidth}}
div(:style="{width: tableWidth}" style="padding:10px;")
  EasyTable(ref="easyTable" :height="props.height" :columns="columns" :dataSource="dataSource" @current-change="onCurrentChange")
    template(#table-header="{ column }") 
      span {{column.title}} (slot)
div columns:{{columns}}
//- div dataSource:{{dataSource}}
hr
div tableHeaders:{{easyTable.tableHeaders}}
div tableProps:{{easyTable.tableProps}}
</template>

<script>
import { h } from 'vue';
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
        {
          title: 'Name',
          dataIndex: 'name',
          /* fixed: 'left', */ width: '200px',
          minWidth: '200px',
          sorter: true,
          customHeaderCell(column) {
            return h('span', column.title + '(render)');
          },
        },
        { title: 'Age', dataIndex: 'age', /* fixed: 'left', */ width: '200px', minWidth: '200px', sorter: true },
        { title: 'Gender', dataIndex: 'gender' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Address', dataIndex: 'address' },
      ],
      dataSource: new Array(500)
        .fill(0)
        .map((it, i) => ({ name: 'name' + i, age: i, email: 'add@sa.com', gender: 'a', address: 'ahshshsshshhs' })),
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.easyTable = this.$refs.easyTable;
  },
  methods: {
    onCurrentChange(row) {
      console.log('current', row);
    },
  },
};
</script>

<style lang="less" scoped></style>
