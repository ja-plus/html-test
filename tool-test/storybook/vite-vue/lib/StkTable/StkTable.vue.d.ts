/**
 * 对有序数组插入新数据
 * @param {object} sortState
 * @param {string} sortState.dataIndex 排序的列
 * @param {null|'asc'|'desc'} sortState.order 排序顺序
 * @param {'number'|'string'} [sortState.sortType] 排序方式
 * @param {object} newItem 要插入的数据
 * @param {Array} targetArray 表格数据
 */
export function insertToOrderedArray(sortState: {
    dataIndex: string;
    order: null | 'asc' | 'desc';
    sortType?: "string" | "number" | undefined;
}, newItem: object, targetArray: any[]): any[];
/**
 * @typedef SortOption
 * @prop {function|boolean} sorter
 * @prop {string} dataIndex
 * @prop {string} sortField
 * @prop {'number'|'string'} sortType
 */
/**
 * 表格排序抽离
 * 可以在组件外部自己实现表格排序，组件配置remote，使表格不排序。
 * 使用者在@sort-change事件中自行更改table props 'dataSource'完成排序。
 * TODO: key 唯一值，排序字段相同时，根据唯一值排序。
 * @param {SortOption} sortOption 列配置
 * @param {string|null} order 排序方式
 * @param {any} dataSource 排序的数组
 */
export function tableSort(sortOption: SortOption, order: string | null, dataSource: any): any[];
export default _sfc_main;
export type SortOption = {
    sorter: Function | boolean;
    dataIndex: string;
    sortField: string;
    sortType: 'number' | 'string';
};
declare const _sfc_main: import("vue").DefineComponent<{
    minWidth: {
        type: StringConstructor;
        default: string;
    };
    /** 表格最大宽度，设置max-content 使表格按设置的width来 */
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 主题，亮、暗
     */
    theme: {
        type: StringConstructor;
        default: string;
        validator: (v: unknown) => boolean;
    };
    /** 虚拟滚动 */
    virtual: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** x轴虚拟滚动 */
    virtualX: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表格列配置 */
    columns: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /** 表格数据源 */
    dataSource: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /** 行唯一键 */
    rowKey: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    /** 空值展示文字 */
    emptyCellText: {
        type: StringConstructor;
        default: string;
    };
    /** 暂无数据兜底高度是否撑满 */
    noDataFull: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否展示暂无数据 */
    showNoData: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否服务端排序，true则不排序数据 */
    sortRemote: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表头是否溢出展示... */
    showHeaderOverflow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表体溢出是否展示... */
    showOverflow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否增加行hover class */
    showTrHoverClass: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表头是否可拖动 */
    headerDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, {
    /** 是否展示横向滚动固定列的阴影
    showFixedLeftShadow: false,*/
    /** 当前选中的一行*/
    currentItem: {
        value: null;
    };
    /** 当前hover的行 */
    currentHover: {
        value: null;
    };
    /** 排序的列*/
    sortCol: null;
    sortOrderIndex: number;
    /** 排序切换顺序 */
    sortSwitchOrder: (string | null)[];
    tableHeaders: never[];
    /** 若有多级表头时，的tableHeaders */
    tableProps: never[];
    dataSourceCopy: readonly never[];
    /** 存放高亮行的对象*/
    highlightDimRows: Set<any>;
    /** 高亮后渐暗的行定时器 */
    highlightDimRowsTimeout: Map<any, any>;
    /** 是否正在计算高亮行的循环*/
    calcHighlightDimLoop: boolean;
    virtualScroll: {
        containerHeight: number;
        startIndex: number;
        rowHeight: number;
        offsetTop: number;
        scrollTop: number;
    };
    virtualScrollX: {
        containerWidth: number;
        startIndex: number;
        endIndex: number;
        offsetLeft: number;
        scrollLeft: number;
    };
    thDrag: {
        dragStartKey: null;
    };
    /**rowKey缓存 */
    rowKeyGenStore: WeakMap<object, any>;
}, {
    isLegacyMode(): boolean;
    /** 高亮颜色插值方法 */
    highlightInter(): any;
    /** 数据量大于2页才开始虚拟滚动*/
    virtual_on(): boolean;
    /** 虚拟滚动展示的行数 */
    virtual_pageSize(): number;
    /** 虚拟滚动展示的行 */
    virtual_dataSourcePart(): readonly never[];
    /** 虚拟表格定位下边距*/
    virtual_offsetBottom(): number;
    virtualX_on(): boolean;
    /** 横向虚拟滚动展示的列 */
    virtualX_columnPart(): readonly unknown[];
    /** 横向虚拟滚动，右边距 */
    virtualX_offsetRight(): number;
    /** 计算每个fixed:left列前面列的总宽度，fixed:right右边列的总宽度，用于定位 */
    fixedColumnsPositionStore(): {};
}, {
    /**
     * 初始化虚拟滚动参数
     * @param {number} height 虚拟滚动的高度
     */
    initVirtualScroll(height: number): void;
    initVirtualScrollY(height: any): void;
    initVirtualScrollX(): void;
    /** 通过滚动条位置，计算虚拟滚动的参数 */
    updateVirtualScrollY(sTop?: number): void;
    /** 通过横向滚动条位置，计算横向虚拟滚动的参数 */
    updateVirtualScrollX(sLeft?: number): void;
    /** 固定列的style */
    fixedStyle(tagType: any, col: any): {
        position: string;
        top: string;
        left: string;
        transform: string;
        zIndex: number;
        right: string;
    };
    /** 处理多级表头 */
    dealColumns(): void;
    /**
     * 行唯一值生成
     */
    rowKeyGen(row: any): any;
    /**
     * 表头点击排序
     * @param {boolean} options.force sort-remote 开启后是否强制排序
     * @param {boolean} options.emit 是否触发回调
     */
    onColumnSort(col: any, click?: boolean, options?: {}): void;
    /** 插入一行
    insertData(data) {
      if(!this.sortCol) return;
      const col = this.columns.find(it => it.dataIndex === this.sortCol);
      const sorter = col.sorter;
    },*/
    onRowClick(e: any, row: any): void;
    onRowDblclick(e: any, row: any): void;
    /** 表头行右键 */
    onHeaderMenu(e: any): void;
    /** 表体行右键 */
    onRowMenu(e: any, row: any): void;
    /** 单元格单击 */
    onCellClick(e: any, row: any, col: any): void;
    /** 表头单元格单击 */
    onHeaderCellClick(e: any, col: any): void;
    /** 滚动条监听 */
    onTableScroll(e: any): void;
    /** tr hover事件 */
    onTrMouseOver(e: any, item: any): void;
    /** th拖动释放时 */
    onThDrop(e: any): void;
    /** 开始拖动记录th位置 */
    onThDragStart(e: any): void;
    onThDragOver(e: any): void;
    /**
     * 计算高亮渐暗颜色的循环
     * FIXME: 相同数据源，相同引用的情况，将颜色值挂在数据源对象上，在多个表格使用相同数据源时会出问题。
     */
    calcHighlightLoop(): void;
    /**
     * 选中一行，
     * @param {string} rowKey
     * @param {boolean} option.silent 是否触发回调
     */
    setCurrentRow(rowKey: string, option?: {
        silent: boolean;
    }): void;
    /** 高亮一个单元格 */
    setHighlightDimCell(rowKeyValue: any, dataIndex: any): void;
    /**
     * 高亮一行
     * @param {Array<string|number>} rowKeyValues
     */
    setHighlightDimRow(rowKeyValues: Array<string | number>): void;
    /**
     * 设置表头排序状态
     * @param {string} dataIndex 列字段
     * @param {'asc'|'desc'|null} order
     * @param {object} option.sortOption 指定排序参数
     * @param {boolean} option.silent 是否触发回调
     * @param {boolean} option.sort 是否排序
     */
    setSorter(dataIndex: string, order: 'asc' | 'desc' | null, option?: {}): readonly never[];
    /** 重置排序 */
    resetSorter(): void;
    /** 滚动 */
    scrollTo(top?: number, left?: number): void;
    /** 获取当前状态的表格数据 */
    getTableData(): never[];
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("row-click" | "sort-change" | "current-change" | "row-dblclick" | "header-row-menu" | "row-menu" | "cell-click" | "header-cell-click" | "col-order-change" | "th-drop" | "th-drag-start" | "scroll")[], "row-click" | "sort-change" | "current-change" | "row-dblclick" | "header-row-menu" | "row-menu" | "cell-click" | "header-cell-click" | "col-order-change" | "th-drop" | "th-drag-start" | "scroll", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    minWidth: {
        type: StringConstructor;
        default: string;
    };
    /** 表格最大宽度，设置max-content 使表格按设置的width来 */
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 主题，亮、暗
     */
    theme: {
        type: StringConstructor;
        default: string;
        validator: (v: unknown) => boolean;
    };
    /** 虚拟滚动 */
    virtual: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** x轴虚拟滚动 */
    virtualX: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表格列配置 */
    columns: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /** 表格数据源 */
    dataSource: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /** 行唯一键 */
    rowKey: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    /** 空值展示文字 */
    emptyCellText: {
        type: StringConstructor;
        default: string;
    };
    /** 暂无数据兜底高度是否撑满 */
    noDataFull: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否展示暂无数据 */
    showNoData: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否服务端排序，true则不排序数据 */
    sortRemote: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表头是否溢出展示... */
    showHeaderOverflow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表体溢出是否展示... */
    showOverflow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否增加行hover class */
    showTrHoverClass: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 表头是否可拖动 */
    headerDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onRow-click"?: ((...args: any[]) => any) | undefined;
    "onSort-change"?: ((...args: any[]) => any) | undefined;
    "onCurrent-change"?: ((...args: any[]) => any) | undefined;
    "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
    "onHeader-row-menu"?: ((...args: any[]) => any) | undefined;
    "onRow-menu"?: ((...args: any[]) => any) | undefined;
    "onCell-click"?: ((...args: any[]) => any) | undefined;
    "onHeader-cell-click"?: ((...args: any[]) => any) | undefined;
    "onCol-order-change"?: ((...args: any[]) => any) | undefined;
    "onTh-drop"?: ((...args: any[]) => any) | undefined;
    "onTh-drag-start"?: ((...args: any[]) => any) | undefined;
    onScroll?: ((...args: any[]) => any) | undefined;
}, {
    columns: unknown[];
    dataSource: unknown[];
    minWidth: string;
    maxWidth: string;
    theme: string;
    virtual: boolean;
    virtualX: boolean;
    rowKey: string | Function;
    emptyCellText: string;
    noDataFull: boolean;
    showNoData: boolean;
    sortRemote: boolean;
    showHeaderOverflow: boolean;
    showOverflow: boolean;
    showTrHoverClass: boolean;
    headerDrag: boolean;
}, {}>;
