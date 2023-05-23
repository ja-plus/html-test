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
export {
  _sfc_main as Button
};
