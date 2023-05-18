import type { Meta, StoryObj } from '@storybook/vue3';

import StkTable from './StkTable.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/StkTable',
  component: StkTable,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  args: {
    rowKey: 'name',
    columns: [
      { dataIndex: 'name', title: 'name' },
      { dataIndex: 'age', title: 'age', sorter: true },
      { dataIndex: 'gender', title: 'gender' },
    ],
    dataSource: [
      { name: 'Tom', age: 1 },
      { name: 'Jerry', age: 2 },
      { name: 'Kitty', age: 3 },
      { name: 'Stiven', age: 4 },
    ],
  }, // default value
} satisfies Meta<typeof StkTable>;

export default meta;

type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const StkTableLight: Story = {
  args: {
    rowKey: 'name',
    columns: [
      { dataIndex: 'name', title: 'name' },
      { dataIndex: 'age', title: 'age', sorter: true },
      { dataIndex: 'gender', title: 'gender' },
    ],
    dataSource: [
      { name: 'Tom', age: 1 },
      { name: 'Jerry', age: 2 },
      { name: 'Kitty', age: 3 },
      { name: 'Stiven', age: 4 },
    ],
  },
};
export const StkTableDark: Story = {
  args: {
    theme: 'dark',
    rowKey: 'name',
    columns: [
      { dataIndex: 'name', title: 'name' },
      { dataIndex: 'age', title: 'age', sorter: true },
      { dataIndex: 'gender', title: 'gender' },
    ],
    dataSource: [
      { name: 'Tom', age: 1 },
      { name: 'Jerry', age: 2 },
      { name: 'Kitty', age: 3 },
      { name: 'Stiven', age: 4 },
    ],
  },
};
export const StkTableEmpty: Story = {
  args: {
    rowKey: 'name',
    columns: [
      { dataIndex: 'name', title: 'name' },
      { dataIndex: 'age', title: 'age', sorter: true },
      { dataIndex: 'gender', title: 'gender' },
    ],
    dataSource: [],
  },
  render: (args: any) => ({
    setup() {
      return () => <StkTable style="height:200px;box-shadow:0 0 10px #aaa" />;
    },
  }),
};
