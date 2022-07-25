<template lang="pug">
div height:
  input(type="range" min="100" max="1000" @input="e => props.height = e.target.value + 'px'")
  | {{props.height}}
div width:
  input(type="range" min="100" max="2000"  @input="e => tableWidth = e.target.value + 'px'" :value="parseInt(tableWidth)")
  | {{tableWidth}}
div 
  button(@click="handleClearSorter") clearSorter
  button(@click="addRow") addRow
div(:style="{width: tableWidth}" style="padding:10px;")
  EasyTable(ref="easyTable" rowKey="name" noDataFull :style="{height:props.height}" :columns="columns" :dataSource="dataSource" @current-change="onCurrentChange" @row-dblclick="onRowDblclick")
    template(#table-header="{ column }") 
      span {{column.title}} (slot)
  EasyTableC(ref="easyTableC" rowKey="name" noDataFull :style="{height:props.height}" :columns="columns" :dataSource="dataSource" @current-change="onCurrentChange" @row-dblclick="onRowDblclick")

div columns:{{columns}} 
//- div dataSource:{{dataSource}}
hr
div tableHeaders:{{easyTable.tableHeaders}}
div tableProps:{{easyTable.tableProps}}
</template>

<script>
import { h } from 'vue';
import EasyTable from '../src/EasyTable.vue';
import EasyTableC from '../src/EasyTable_compatible.vue'; // 兼容版本 fixedLeft
export default {
  components: { EasyTable, EasyTableC },
  props: {},
  data() {
    return {
      easyTable: {},
      tableWidth: '500px',
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
          // fixed: 'left',
          width: '150px',
          minWidth: '150px',
          textOverflow: 'title',
          sorter: true,
          sortType: 'number', // 指定为数字排序
        },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Address', dataIndex: 'address' },
        { title: 'col1', dataIndex: 'address' },
        { title: 'col2', dataIndex: 'address' },
        { title: 'col3', dataIndex: 'address' },
      ],
      // dataSource: new Array(4).fill(0).map((it, i) => ({
      //   name: 'name' + i,
      //   age: parseInt(Math.random() * 100),
      //   email: 'add@sa.com',
      //   gender: Number(Math.random() * 100 - 50).toFixed(2),
      //   address: 'ahshshsshshhs',
      // })),
      addIndex: 0,
      dataSource: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.easyTable = this.$refs.easyTable;
    // this.$refs.easyTable.setCurrentRow('name0');
    // this.$refs.easyTable.setHighlightDimCell('add1', 'age');
    setInterval(() => {
      this.$refs.easyTable.setHighlightDimCell('add1', 'age');
      this.$refs.easyTableC.setHighlightDimCell('add1', 'age');
    }, 1500);
    setInterval(() => {
      this.$refs.easyTable.setHighlightDimCell('add2', 'gender');
      this.$refs.easyTableC.setHighlightDimCell('add2', 'gender');
    }, 2000);
    setInterval(() => {
      this.$refs.easyTable.setHighlightDimRow('add0');
      this.$refs.easyTableC.setHighlightDimRow('add0');
    }, 1000);
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
      this.$refs.easyTableC.resetSorter();
    },
    addRow() {
      this.dataSource.push({
        name: 'add' + this.addIndex,
        age: parseInt(Math.random() * 100),
        email: 'add@sa.com',
        gender: Number(Math.random() * 100 - 50).toFixed(2),
        address: 'add',
      });
      this.dataSource = [...this.dataSource]; // 没有监听deep
      const addIndex = this.addIndex;
      this.addIndex++;
      this.$nextTick(() => {
        this.$refs.easyTable.setHighlightDimRow('add' + addIndex);
        this.$refs.easyTableC.setHighlightDimRow('add' + addIndex);
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
