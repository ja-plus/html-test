<template lang="pug">
div height:
  input(type="range" min="100" max="1000" @input="e => props.height = e.target.value + 'px'") 
  | {{props.height}}
div width:
  input(type="range" min="100" max="2000"  @input="e => tableWidth = e.target.value + 'px'") 
  | {{tableWidth}}
div 
  button(@click="handleClearSorter") clearSorter
div(:style="{width: tableWidth}" style="padding:10px;")
  EasyTable(ref="easyTable" rowKey="name" :style="{height:props.height}" :columns="columns" :dataSource="dataSource" @current-change="onCurrentChange" @row-dblclick="onRowDblclick")
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
          fixed: 'left',
          width: '200px',
          // minWidth: '200px', // 组件处理固定列的minWidth = width
          sorter: true,
          customHeaderCell(column) {
            return h('span', column.title + '(render)');
          },
        },
        {
          title: 'Age',
          dataIndex: 'age',
          fixed: 'left',
          width: '100px',
          sorter(data, { order, column }) {
            // console.log(data, order, column);
            if (order === 'desc') return data.sort((a, b) => b.age - a.age);
            else if (order === 'asc') return data.sort((a, b) => a.age - b.age);
          },
          align: 'right',
          headerAlign: 'right',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          fixed: 'left',
          width: '100px',
          textOverflow: 'title',
          sorter: true,
          sortType: 'number', // 指定为数字排序
        },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Address', dataIndex: 'address' },
      ],
      dataSource: new Array(50).fill(0).map((it, i) => ({
        name: 'name' + i,
        age: parseInt(Math.random() * 100),
        email: 'add@sa.com',
        gender: Number(Math.random() * 100 - 50).toFixed(2),
        address: 'ahshshsshshhs',
      })),
      // dataSource: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.easyTable = this.$refs.easyTable;
    this.$refs.easyTable.setCurrentRow('name0');
    this.$refs.easyTable.setHighlightDimCell('name1', 'age');
    setInterval(() => {
      this.$refs.easyTable.setHighlightDimCell('name2', 'age');
      this.$refs.easyTable.setHighlightDimCell('name2', 'gender');
    }, 2000);
    setInterval(() => {
      this.$refs.easyTable.setHighlightDimRow('name3');
    }, 3000);
  },
  methods: {
    onCurrentChange(row) {
      console.log('current', row);
    },
    onRowDblclick(row) {
      console.log('row-dblclick', row);
    },
    handleClearSorter() {
      this.$refs.easyTable.resetSorter();
    },
  },
};
</script>

<style lang="less" scoped></style>
