// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
// import Vue, { VNode } from 'vue';
// declare global {
//   namespace JSX {
//     interface Element extends VNode {}
//     interface ElementClass extends Vue {}
//     interface IntrinsicElements {
//       [elem: string]: any;
//     }
//   }
// }
