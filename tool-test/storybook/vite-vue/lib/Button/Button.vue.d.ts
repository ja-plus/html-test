import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    label: {
        type: __PropType<string>;
        required: true;
    };
    primary: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    size: {
        type: __PropType<"small" | "medium" | "large" | undefined>;
        required: false;
    };
    backgroundColor: {
        type: __PropType<string | undefined>;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: __PropType<string>;
        required: true;
    };
    primary: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    size: {
        type: __PropType<"small" | "medium" | "large" | undefined>;
        required: false;
    };
    backgroundColor: {
        type: __PropType<string | undefined>;
        required: false;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    primary: boolean | undefined;
}, {}>;
export default _sfc_main;
