export const stkTableColumns = [
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
    ... new Array(10).fill(0).map((it,i) => {
        return {
            title: 'other'+i,
            dataIndex: 'other'+i
        }
    })
]
export const stkTableData = new Array(1000).fill(0).map((it, i) => {
    return {
        id: i + 'id',
        name: 'name' + i,
    };
})