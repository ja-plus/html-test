<template>
  <details open>
    <summary><b>Table</b></summary>
    <el-input v-model="search"></el-input>
    <el-table
      :data="filteredTableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="date" label="date" sortable width="180" />
      <el-table-column prop="name" label="Name" sortable width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
      </el-table-column>
    </el-table>

    <!-- <el-table
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
    </el-table> -->
  </details>
</template>
<script lang="ts" setup>
import {computed, ref} from 'vue'
interface User {
  id: number
  date: string
  name: string
  hasChildren?: boolean
  children?: User[]
}
const search = ref('')
const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
    ])
  }, 1000)
}

const tableData: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'ddd',
        children: [
          {
            id: 311,
            date:'ssss',
            name: 'hahaha'
          }
        ]
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
  },
]
const filteredTableData: User[] = computed(() => {
  let data = JSON.parse(JSON.stringify(tableData))
  return data.filter(function ft(user:User) {
    if(user.children){
      user.children = user.children.filter(ft)
      if(user.children.length) return true
    }
    return user.name.indexOf(search.value) > -1
  })
})

// const tableData1: User[] = [
//   {
//     id: 1,
//     date: '2016-05-02',
//     name: 'wangxiaohu',
//   },
//   {
//     id: 2,
//     date: '2016-05-04',
//     name: 'wangxiaohu',
//   },
//   {
//     id: 3,
//     date: '2016-05-01',
//     name: 'wangxiaohu',
//     hasChildren: true,
//   },
//   {
//     id: 4,
//     date: '2016-05-03',
//     name: 'wangxiaohu',
//   },
// ]
</script>
