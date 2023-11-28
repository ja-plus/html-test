import { Component, VNode } from 'vue';

type Sorter = boolean | Function;
export type StkTableColumn<T> = {
  dataIndex: keyof T;
  title?: string;
  align?: 'right' | 'left' | 'center';
  headerAlign?: 'right' | 'left' | 'center';
  sorter?: Sorter;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  className?: string;
  sortField?: keyof T;
  sortType?: 'number' | 'string';
  fixed?: 'left' | 'right' | null;
  customCell?: Component | VNode;
  customHeaderCell?: Component | VNode;
  children?: StkTableColumn<T>[];
};

export type SortOption = {
  sorter: Sorter;
  dataIndex: string;
  sortField: string;
  sortType: 'number' | 'string';
};

export type SortState = {
  dataIndex: string;
  order: null | 'asc' | 'desc';
  sortType?: 'number' | 'string';
};

export type StkProps = {
  width: string;

  /** 最小表格宽度 */
  minWidth: string;

  /** 表格最大宽度*/
  maxWidth: string;

  /** 是否隐藏表头 */
  headless: boolean;

  /** 主题，亮、暗 */
  theme: string;

  /** 虚拟滚动 */
  virtual: boolean;

  /** x轴虚拟滚动 */
  virtualX: boolean;

  /** 表格列配置 */
  columns: StkTableColumn<any>[];

  /** 表格数据源 */
  dataSource: any[];

  /** 行唯一键 */
  rowKey: string | Function;

  /** 列唯一键 */
  colKey: string | Function;

  /** 空值展示文字 */
  emptyCellText: string;

  /** 暂无数据兜底高度是否撑满 */
  noDataFull: boolean;

  /** 是否展示暂无数据 */
  showNoData: boolean;

  /** 是否服务端排序，true则不排序数据 */
  sortRemote: boolean;

  /** 表头是否溢出展示... */
  showHeaderOverflow: boolean;

  /** 表体溢出是否展示... */
  showOverflow: boolean;

  /** 是否增加行hover class */
  showTrHoverClass: boolean;

  /** 表头是否可拖动 */
  headerDrag: boolean;

  /**
   * 给行附加className<br>
   * FIXME: 是否需要优化，因为不传此prop会使表格行一直执行空函数，是否有影响
   */
  rowClassName: Function;

  /**
   * 列宽是否可拖动<br>
   * **不要设置**列minWidth，**必须**设置width<br>
   * 列宽拖动时，每一列都必须要有width，且minWidth/maxWidth不生效。table width会变为"fit-content"。
   */
  colResizable: boolean;

  /** 可拖动至最小的列宽 */
  colMinWidth: number;
};
