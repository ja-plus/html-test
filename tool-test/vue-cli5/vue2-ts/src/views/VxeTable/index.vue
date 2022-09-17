<template>
  <div>
    <!-- <vxe-table
      ref="xTable"
      :max-height="400"
      resizable
      border="inner"
      :tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }"
      :data="tableData"
    > -->
    <vxe-table
      ref="xTable"
      size="mini"
      :max-height="400"
      resizable
      border="inner"
      :data="tableData"
      :cell-class-name="cellClassName"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
    >
      <vxe-column field="name" title="labelName" tree-node />
      <vxe-column field="size" title="Size" />
      <vxe-column field="type" title="Type" />
      <vxe-column field="date" title="Date" />
    </vxe-table>
  </div>
</template>

<script lang="ts">
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import { Component, Vue, Ref } from 'vue-property-decorator';
Vue.use(VXETable);
@Component
export default class extends Vue {
  @Ref() xTable!: any;
  highlightRowsId = new Set<string>();
  tableData = [
    { id: 10000, parentId: null, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
    { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
    { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
    { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
    { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: null, date: '2021-04-01' },
    { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
    { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
    { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', size: 2048, date: '2020-11-01' },
    { id: 23677, parentId: 23666, name: 'Test10', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23671, parentId: 23677, name: 'Test11', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23672, parentId: 23677, name: 'Test12', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23688, parentId: 23666, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23681, parentId: 23688, name: 'Test14', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23682, parentId: 23688, name: 'Test15', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 24555, parentId: null, name: 'Test16', type: 'avi', size: 224, date: '2020-10-01' },
    { id: 24566, parentId: 24555, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 24577, parentId: 24555, name: 'Test18', type: 'js', size: 1024, date: '2021-06-01' },
  ];
  created(): void {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({ id: 24578 + i, parentId: null, name: 'Test' + (18 + i), type: 'js', size: 1024, date: '2021-06-01' });
    }
  }

  mounted() {
    let i = 0;
    setInterval(() => {
      this.xTable.insert({ id: i++, parentId: null, name: 'Test' + 18, type: 'js', size: 1024, date: '2021-06-01' }).then(({ row }) => {
        this.highlightRowsId.add(row._X_ROW_KEY);
      });
      // let j = i;
      // setTimeout(() => {
      //   this.highlightRowsId.delete(j);
      // }, 2000);
    }, 1000);
    // this.calcBackgroundOpacity();
  }

  cellClassName({ row, column }) {
    if (row.id === 10000 && column.property === 'name') {
      return 'highlight';
    }
    return '';
  }
  rowStyle({ row, column }) {
    if (row.id === 0) {
      // if (this.highlightRowsId.has(row._X_ROW_KEY)) {
      return { background: 'rgba(14, 152, 226, 0.9)' };
    }
    return '';
  }
  rowClassName({ row, column }) {
    if (this.highlightRowsId.has(row._X_ROW_KEY)) {
      return 'highlight-dim';
    }
    return '';
  }
  /**计算背景透明度 */
  // calcBackgroundOpacity() {
  //   /* window.requestAnimationFrame */ window.setInterval(() => {
  //     let doms = document.querySelectorAll<HTMLElement>('.highlight-dim');
  //     doms.forEach(dom => {
  //       let bg = dom.style.background;
  //       let i = bg.lastIndexOf(',');
  //       let opacity = bg.slice(i + 1);
  //       let opacityNum = parseFloat(opacity) - 0.1;
  //       if (opacityNum < 0) {
  //         opacityNum = 0;
  //         if (dom) this.highlightRowsId.delete(dom.getAttribute('rowid') as string);
  //       }
  //       dom.style.background = `rgba(14, 152, 226, ${opacityNum})`;
  //     });
  //   }, 200);
  // }
}
</script>

<style>
.highlight {
  background: cyan;
}
/* @keyframes highlightDim {
  from {
    background: rgba(14, 152, 226, 1);
  }
}
.highlight-dim {
  background: rgba(14, 152, 226, 0);
  animation: highlightDim 2s linear;
} */
</style>
