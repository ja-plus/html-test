import ExcelJS from 'exceljs';
// import png from '../header.png'
import { getImageBase64 } from './addTextToImage';
const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

/** */
function getCellRange(sheet: ExcelJS.Worksheet, start: string, end: string) {
    let colStart = start.charCodeAt(0) - 65;
    let colEnd = end.charCodeAt(0) - 65;
    const rowStart = parseInt(start.substring(1));
    const rowEnd = parseInt(end.substring(1));
    const cells = [];
    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            const cell = sheet.getCell(String.fromCharCode(j + 65) + i);
            cells.push(cell);
        }
    }
    return cells;

}
async function main() {

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    const worksheet = workbook.addWorksheet('My Sheet');
    // const pngBlob = await fetch(png).then(res => res.blob())

    // const base64 = await new Promise<string>(resolve => {
    //     const fr = new FileReader();
    //     fr.readAsDataURL(pngBlob);
    //     fr.onload = function (e: any) {
    //         resolve(e.target.result);
    //     }
    // });
    const base64 = getImageBase64()
    const imageId1 = workbook.addImage({
        base64,
        extension: "png",// 图片扩展名，支持“jpeg”，“png”，“gif”
    });

    worksheet.addImage(
        imageId1,
        `B2:O2`
    );

    // worksheet.getCell('G2').value = {
    //     'richText': [
    //         {
    //             'font': {
    //                 'size': 24,
    //                 'color': { argb:'ffffff'},
    //                 'name': 'Calibri',
    //                 'family': 2, 
    //                 'scheme': 'minor'
    //             },
    //             'text': 'IFinD 自选债监控报告（2023-01-15~2023-01-14）'
    //         },
    //     ]
    // };

    // // 按行的格式插入表头
    // worksheet.insertRow(
    //     17,// 行的位置
    //     ['Name', 'Age', 'City']
    // );
    // // 按行的格式插入表头
    // worksheet.insertRow(
    //     18,// 行的位置
    //     ['Name1', 'Age1', 'City1'],
    // );

    worksheet.getColumn('A').width = 5;
    worksheet.getColumn('B').width = 5;
    worksheet.getColumn('C').width = 10;
    worksheet.getColumn('O').width = 5;
    worksheet.getColumn('P').width = 5;
    worksheet.getRow(2).height = 50;
    worksheet.addTable({
        name: 'news',
        ref: 'C5',
        style: {
            // theme:''
            // showRowStripes: true
        },
        columns: [
            { name: '序号' },
            { name: '主体' },
            { name: 'e' },
            { name: '风险类别' },
            { name: 'e' },
            { name: '标题' },
            { name: 'e' },
            { name: 'e' },
            { name: 'e' },
            { name: 'e' },
            { name: 'e' },
            { name: '时间' },
        ],
        rows: [
            [1, '恒大地产集团有限公司', '', '市场风险-债券风险', '', 'xxxxx', ...new Array(5).fill(''), '2024-01-31']
        ]
    });

    const borderFill: ExcelJS.Fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'E3E3F0' },
    }
    const cellBOrder: Partial<ExcelJS.Borders> = {
        top: { style: 'thin', color: { argb: 'e3e3f0' } },
        bottom: { style: 'thin', color: { argb: 'e3e3f0' } },
        left: { style: 'thin', color: { argb: 'e3e3f0' } },
        right: { style: 'thin', color: { argb: 'e3e3f0' } }
    }
    // table border
    getCellRange(worksheet, 'B4', 'O4').forEach(cell => {
        cell.fill = borderFill;
        cell.border = cellBOrder
    });
    getCellRange(worksheet, 'B5', 'B11').forEach(cell => {
        cell.fill = borderFill;
        cell.border = cellBOrder
    });
    getCellRange(worksheet, 'O5', 'O11').forEach(cell => {
        cell.fill = borderFill;
        cell.border = cellBOrder
    });
    getCellRange(worksheet, 'C11', 'N11').forEach(cell => {
        cell.fill = borderFill;
        cell.border = cellBOrder
    });


    getCellRange(worksheet, 'C5', 'N5').forEach((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'fafafc' },
        }
        cell.border = cellBOrder
        cell.font = {
            color: {
                argb: '292933'
            }
        }
    })

    worksheet.getColumn('C').alignment = {
        horizontal: 'center',
        vertical: 'middle',
    }

    worksheet.mergeCells('D5:E5');
    worksheet.mergeCells('F5:G5');
    worksheet.mergeCells('H5:M5');
    worksheet.mergeCells('D6:E6');
    worksheet.mergeCells('F6:G6');
    worksheet.mergeCells('H6:M6');

    //导出表格数据
    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: EXCEL_TYPE });
        console.log(blob.stream(), 6664744);

        // 下载表格
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    });
}

const div = document.createElement('div');
const button = document.createElement('button');
button.innerText = '导出';
button.onclick = () => {
    main()
}
div.appendChild(button);
document.body.appendChild(div);