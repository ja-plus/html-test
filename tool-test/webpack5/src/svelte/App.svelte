<details open>
  <summary><h1>Svelte</h1></summary>
  <ChildComponent>
    <header slot="header">{name}</header>
    <span>
      header: <input type="text" bind:value={name}>
    <button on:click={count}>num: {num},doubleNum: {doubleNum}</button>
    arr:{arr}
    </span>
  </ChildComponent>
  <ChildComponent color="#fff">
    <header slot="header">SMUI</header>
    <div>
      <!--<Smui/>-->
    </div>
  </ChildComponent>
  <StkTable style="height:300px" columns={columns}></StkTable>
  <!-- <Button>carbon-components-svelte Button</Button> -->
</details>

<script>
  import ChildComponent from './childComponent.svelte'
  import StkTable from './StkTable.svelte'
  // import Smui from './smui.svelte';
  // import 'carbon-components-svelte/css/white.css';
  // import { Button } from "carbon-components-svelte"; // 啥也不是
  export let name = 'svelte';
  let num = 0;
  $: doubleNum = num * 2;
  $: {
    console.log('svelte:doubleNum', doubleNum)
  }
  let arr = []
  function count(){
    num++;
    arr = arr.concat([num]) // 赋值才能更新引用类型
  }

  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        fixed: 'left',
        width: '200px',
        headerClassName: 'my-th',
        className: 'my-td',
        sorter: true,
        customHeaderCell: props => {
            return h('span', { style: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap' }, props.col.title + '(render) text-overflow,');
        },
    },
    {
        title: 'Age',
        dataIndex: 'age',
        fixed: 'left',
        width: '100px', // 为确保横向滚动准确，列宽一定要固定，minWidth,maxWidth要相等
        sorter(data, { order, column }) {
            // console.log(data, order, column);
            if (order === 'desc') return data.sort((a, b) => b.age - a.age);
            else if (order === 'asc') return data.sort((a, b) => a.age - b.age);
            return data;
        },
        align: 'right',
        headerAlign: 'right',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        // fixed: 'right',
        width: '150px',
        // minWidth: '150px',
        sorter: true,
        sortType: 'number', // 指定为数字排序
    },
    {
        title: 'Email(sortBy:name)',
        dataIndex: 'email',
        width: '150px',
        sorter: true,
        sortField: 'name',
    },
    /** overflow 必须设置maxWidth */
    { title: 'Address', dataIndex: 'address', width: '100px' },
    { title: 'Address', dataIndex: 'address1', width: '100px' },
    { title: 'Address', dataIndex: 'address2', width: '100px' },
    { title: 'Address', dataIndex: 'address3', width: '100px' },
    {
        dataIndex: 'R',
        title: 'R',
        width: '50px',
        fixed: 'right',
    },
    {
        title: 'Operate',
        dataIndex: 'Operate',
        width: '150px',
        fixed: 'right',
        // customCell() {
        //     return (
        //         <button>
        //             <a href="#">+add</a>
        //         </button>
        //     );
        // },
    },
  ]
</script>