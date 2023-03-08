/// <reference types="vite/client" />
declare module '*.vue' {
  import { Component } from 'vue';
  export default Component<any, any, any, ComputedOptions, MethodOptions>;
}
