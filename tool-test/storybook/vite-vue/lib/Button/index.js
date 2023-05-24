import "./style.css";
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, toDisplayString } from "vue";
const button = "";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    label: {},
    primary: { type: Boolean, default: false },
    size: {},
    backgroundColor: {}
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const props = __props;
    const classes = computed(() => ({
      "storybook-button": true,
      "storybook-button--primary": props.primary,
      "storybook-button--secondary": !props.primary,
      [`storybook-button--${props.size || "medium"}`]: true
    }));
    const style = computed(() => ({
      backgroundColor: props.backgroundColor
    }));
    const onClick = () => {
      emit("click", 1);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: normalizeClass(classes.value),
        onClick,
        style: normalizeStyle(style.value)
      }, toDisplayString(_ctx.label), 7);
    };
  }
});
const borderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAABmJLR0QA/wD/AP+gvaeTAAADP0lEQVR42u2c3XHbMBCElxg34QrUQBpgnjNuQEoPLiVFSA2oAKYBpwA3IHUh5oGkLJICSQB7mzzcPnk049n5Dnf8AY4HJKp9w679gY/2DbvU/032ag67tvn50TYHe68CrirVCDf8BvAK4IqAujrj0wSqC9yXF1BX3482XoVcIdGo6Y0A4BU3NBYZ2Qdw7AU0FhnJ4NqUiZOVmoqakZMMnHsRM5LFtRrEFSNqIFcCSA0kk2uxnJ+kekzFpf2khONehaXN5opm4saVmiorIzdm4NwrIyMtuJ4GMdMoK5CZAcwKpBXXrJwTUj2mzaWdUMJxr42lbck1ysTClZpqMSMLM3DutZCR1lz3IJKNFgNJDuBiIBVc4cGoJNVjmpUAoYTjXpPSVnFVRis11RUBNd4PAD8D515AjV9HqLhecMPJ2AjoVu7UXT1aey9UJ9yGv+25AgL26FbPUtfOp9V4od0ruUJ1xicCagAXI6PLcBHuL/q2Xv3NRco1/OJ353wuf04kcI3eWIglcFl79SOW9r2Eo17GXP7uTODyXRwCV3Q/MaMEVks46pVe2qslrOTynW0Cl5+xELg2nfYtlEB2CUe94qWdXcLWXH7uLOa6G3oHxFgvyW7vB/S7McD5aArWZ943UxMCV1o5C0tMqVKu7W0kwtYOpRhc2x5xhI8dSrG41h+2hQ/ASjG5lttIhK0dSrG54hsQwk0BpSy4nm+FCbenlLLimreRCFs7lLLkGh8PCLfslbLm+jqoEh4eKaXgCg9GktYOpVRcldFKTSXPSCVXACpNG0nnI5SOK0hbO6TScQVla4cx0EjSlpXhF78753P5cyKBa9xGImztUMqay9+dCVy+i0PgireRCFs7lLLg8p1tApefsRC4trWRCFs7lGJx+bkzgWvzuTPwuHLVn1Sj/1mlXOltJN2XSonhz1OXIdUJaPfmC1bA5V1hBC6fRuLTSCgB9GkkRgFM4vJpJAQu/46FwOVfVBG4fBoJgcu/MiVw+ffOBC6fRkLg8mkkBC6fRkLg8mkkBC6fRsLgGn7xu3M+lz8nErh8GgmBy9+dCVy+i0Pg8mkkBC7f2fZpJIVePo2E4OXTSIhePo3k33P9BazYwTJP3WbOAAAAAElFTkSuQmCC";
export {
  _sfc_main as Button,
  borderImage as Image
};
