import { Component } from 'vue';
export type StkTableColumn<T> = {
  dataIndex: keyof T;
  title?: string;
  align?: 'right' | 'left' | 'center';
  headerAlign?: 'right' | 'left' | 'center';
  sorter?: boolean | function;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  className?: string;
  sortField?: keyof T;
  sortType?: 'number' | 'string';
  fixed?: 'left' | null;
  customCell?: (col: StkTableColumn<T>, item: T) => Component;
  customHeaderCell?: (col: StkTableColumn<T>) => Component;
};
