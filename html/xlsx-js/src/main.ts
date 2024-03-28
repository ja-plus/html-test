
import * as XLSX from 'xlsx-js-style';
// import png from '../header.png';

const tableHorizontalCellCount = 14;

const grayCellStyle = {
    alignment: {
        vertical: 'center'
    },
    font: {
        bold: true,
    },
    fill: {
        fgColor: {
            rgb: 'e3e3f0'
        },
    }
}

const headerCellStyle = {
    alignment: {
        vertical: 'center'
    },
    font: {
        bold: true,
    },
    fill: {
        fgColor: {
            rgb: 'fafafc'
        },
    },
    border: {
        top: { style: 'thin', color: { rgb: 'e3e3f0' } },
        bottom: { style: 'thin', color: { rgb: 'e3e3f0' } },
        left: { style: 'thin', color: { rgb: 'e3e3f0' } },
        right: { style: 'thin', color: { rgb: 'e3e3f0' } },
    },
}
const getHeaderCell = (v: string) => ({
    t: 's',
    v,
    s: headerCellStyle
})


const wb = XLSX.utils.book_new();

// wb.SheetNames.push('Sheet1');
const ws = XLSX.utils.aoa_to_sheet([
    [{}],
    [{}],
    [{}],
    [{}, {
        t: 's',
        v: '舆情新闻',
        s: grayCellStyle
    },
    ...new Array(tableHorizontalCellCount - 1).fill({ t: 'n', v: '', s: grayCellStyle })
        , {}
    ],
    [
        {},
        { t: 's', v: '', s: grayCellStyle },
        getHeaderCell('序号'),
        getHeaderCell('主体'),
        getHeaderCell(''),
        getHeaderCell('风险类别'),
        getHeaderCell(''),
        getHeaderCell('标题'),
        ...new Array(5).fill(0).map(() => getHeaderCell('')),
        getHeaderCell('时间'),
        { t: 's', v: '', s: grayCellStyle },
    ]
]);
/**合并单元格 */
ws['!merges'] = [
    XLSX.utils.decode_range('B2:O2'),
    XLSX.utils.decode_range('D5:E5'), // 主体
    XLSX.utils.decode_range('F5:G5'), // 风险类别
    XLSX.utils.decode_range('H5:M5'), // 标题
];
ws['!cols'] = [20, 20, 30].map(v => ({ wpx: v }));
ws['!rows'] = [20, 50, 20].map(v => ({ hpx: v }));

/** 不支持 */
// ws['!images'] = [
//     {
//         name: 'header',
//         data: png,
//         opts:{base64:true},
//         position: {
//             type:'twoCellAnchor',
//             attrs:{editAs:'oneCell'},
//             to:{col:2, row:2}
//         }
//     }
// ]

wb.SheetNames.push('Sheet1');
wb.Sheets['Sheet1'] = ws;

// XLSX.writeFile(wb, 'test.xlsx');