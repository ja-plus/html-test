<template lang="pug">
div
  div height:
    input(type="range" min="100" max="1000" @input="e => props.height = e.target.value + 'px'")
    | {{props.height}}
  div width:
    input(type="range" min="100" max="2000"  @input="e => tableWidth = e.target.value + 'px'" :value="parseInt(tableWidth)")
    | {{tableWidth}}

div(style="display:flex;")
  div
    button(@click="handleClearSorter") clearSorter
    button(@click="addRow()") pushRow
    button(@click="addRow(100)") push100Row
    button(@click="addRow(1,true)") unshiftRow
    button(@click="props.showOverflow=!props.showOverflow") showOverflow:{{props.showOverflow}}
    button(@click="props.showHeaderOverflow=!props.showHeaderOverflow") showHeaderOverflow:{{props.showHeaderOverflow}}
  div(style="margin-left:10px")
    div virtualScroll: {{$refs.easyTable&& $refs.easyTable.virtualScroll}}
    div virtual_pageSize: {{$refs.easyTable&& $refs.easyTable.virtual_pageSize}}

div(:style="{width: tableWidth}" style="padding:10px;")
  EasyTable(
    ref="easyTable" 
    rowKey="name" 
    noDataFull 
    virtual 
    sortRemote 
    :style="{height:props.height}" 
    v-bind="props"
    :columns="columns" 
    :dataSource="dataSource" 
    @current-change="onCurrentChange" 
    @row-menu="onRowMenu"
    @header-row-menu="onHeaderRowMenu"
    @row-click="onRowClick"
    @row-dblclick="onRowDblclick" 
    @sort-change="handleSortChange"
    @cell-click="onCellClick"
    @header-cell-click="onHeaderCellClick"
    @scroll="onTableScroll"
  )
    //- template(#table-header="{ column }")
    //-   span {{column.title}} (slot)
  //- EasyTableC(
  //-   ref="easyTableC" 
  //-   rowKey="name" 
  //-   noDataFull 
  //-   :style="{height:props.height}" 
  //-   :columns="columns" 
  //-   :dataSource="dataSource" 
  //-   @current-change="onCurrentChange" 
  //-   @row-dblclick="onRowDblclick"
  //- )
div(style="width:max-content")
  | 文档
  EasyTable(
    :columns="docTableColumns" 
    :dataSource="docTableData" 
  )

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
      tableWidth: '800px',
      props: {
        height: '200px',
        showOverflow: false,
        showHeaderOverflow: false,
        // minWidth: 'auto',
      },
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          fixed: 'left',
          width: '200px',
          headerClassName: 'my-th',
          className: 'my-td',
          // minWidth: '200px', // 组件处理固定列的minWidth = width
          sorter: true,
          customHeaderCell(column) {
            return h(
              'span',
              { style: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap' },
              column.title + '(render) text-overflow,',
            );
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
          // minWidth: '150px',
          sorter: true,
          sortType: 'number', // 指定为数字排序
        },
        { title: 'Email', dataIndex: 'email', minWidth: '100px', maxWidth: '100px' },
        /** overflow 必须设置maxWidth */
        { title: 'Address', dataIndex: 'address', minWidth: '100px', maxWidth: '100px' },
        { title: 'Long Title Long Title LongTitle', dataIndex: 'address', minWidth: '100px', maxWidth: '200px' },
        { title: 'col2', dataIndex: 'address' },
        // { title: 'col3', dataIndex: 'address' },
        // ...new Array(20).fill(0).map(() => ({ title: 'col3', dataIndex: 'address' })),
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
      docTableColumns: [
        {
          title: '字段',
          dataIndex: 'key',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
          title: '取值',
          dataIndex: 'value',
        },
      ],
      docTableData: [
        { key: 'columnOption:', desc: '', value: '' },
        { key: 'title:', desc: '名称' },
        { key: 'dataIndex:', desc: '数据key，需要唯一' },
        { key: 'fixed:', desc: '固定列', value: 'left' },
        { key: 'headerClassName:', desc: '一列的表头class' },
        { key: 'className:', desc: '一列的单元格class' },
        { key: 'width:', desc: '这列th/td 的宽度' },
        { key: 'minWidth:', desc: '这列th/td 的最小宽度。在总列宽不够table宽时，列宽被压缩的最小值' },
        { key: 'maxWidth:', desc: '这列th/td 的最大宽度。可被内容文字撑开的最大宽度。' },
        { key: 'sorter:', desc: '是否开启排序。可传方法' },
        { key: 'align:', desc: '表列对齐', value: '"left"|"center"|"right"' },
        { key: 'headerAlign:', desc: '表头对齐' },
        { key: 'customHeaderCell:', desc: '自定义表头渲染内容。同customCell' },
        {
          key: 'customCell:',
          desc: '自定义列td的渲染。接收一个方法，vue2需该方法return一个vue组件，也可返回jsx 如{render(h){return jsx},methods:... }',
        },
        { key: '------------', desc: '---------' },
        { key: 'TableEvents', desc: '', value: '' },
        { key: 'current-change', desc: '当前行改变', value: '(e:MouseEvent,row):void' },
        { key: 'row-menu', desc: '行右键菜单', value: '(e:MouseEvent,row):void' },
        { key: 'header-row-menu', desc: '表头行右键菜单', value: '(e:MouseEvent,row):void' },
        { key: 'row-click', desc: '行单击', value: '(e:MouseEvent,row):void' },
        { key: 'row-dblclick', desc: '行双击', value: '(e:MouseEvent,row):void' },
        { key: 'sort-change', desc: '筛选改变', value: '(e:MouseEvent,row,col):void' },
        { key: 'cell-click', desc: '单元格单击', value: '(e:MouseEvent,row,col):void' },
        { key: 'header-cell-click', desc: '表头单元格单击', value: '(e:MouseEvent,row,col):void' },
        { key: 'scroll', desc: '滚动', value: '(e:MouseEvent):void' },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.easyTable = this.$refs.easyTable;
    // this.$refs.easyTable.setCurrentRow('name0');
    // this.$refs.easyTable.setHighlightDimCell('add1', 'age');
    // setInterval(() => {
    //   this.$refs.easyTable.setHighlightDimCell('add1', 'age');
    //   this.$refs.easyTableC.setHighlightDimCell('add1', 'age');
    // }, 1500);
    // setInterval(() => {
    //   this.$refs.easyTable.setHighlightDimCell('add2', 'gender');
    //   this.$refs.easyTableC.setHighlightDimCell('add2', 'gender');
    // }, 2000);
    // setInterval(() => {
    //   this.$refs.easyTable.setHighlightDimRow('add0');
    //   this.$refs.easyTableC.setHighlightDimRow('add0');
    // }, 1000);
  },
  methods: {
    onCurrentChange(e, row) {
      console.log('current-changev', e, row);
    },
    onRowMenu(e, row) {
      console.log('row-menu:', e, row);
    },
    onHeaderRowMenu(e, row) {
      console.log('header-row-menu:', e, row);
    },
    onRowClick(e, row) {
      console.log('row-click:', e, row);
    },
    onRowDblclick(e, row) {
      console.log('row-dblclick:', e, row);
    },
    onCellClick(e, row, col) {
      e.stopPropagation();
      console.log('cell-click:', e, row, col);
    },
    onHeaderCellClick(e, row) {
      console.log('header-cell-click:', e, row);
    },
    onTableScroll(e) {
      console.log('scroll:', e);
    },
    handleClearSorter() {
      this.$refs.easyTable.resetSorter();
      this.$refs.easyTableC.resetSorter();
    },
    handleSortChange(col, order) {
      console.log('排序改变事件触发：', col, order);
    },
    addRow(num = 1, unshift) {
      let tmpIndex = [];
      for (let i = 0; i < num; i++) {
        let data = {
          name: 'add' + this.addIndex,
          age: parseInt(Math.random() * 100),
          email: 'add@sa.com',
          gender: Number(Math.random() * 100 - 50).toFixed(2),
          address: '电力、热力、燃气',
        };
        if (unshift) {
          this.dataSource.unshift(data);
        } else {
          this.dataSource.push(data);
        }
        tmpIndex.push(this.addIndex);
        this.addIndex++;
      }
      this.dataSource = [...this.dataSource]; // 没有监听deep

      this.$nextTick(() => {
        tmpIndex.forEach(addIndex => {
          this.$refs.easyTable.setHighlightDimRow('add' + addIndex);
          // this.$refs.easyTableC.setHighlightDimRow('add' + addIndex);
        });
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
