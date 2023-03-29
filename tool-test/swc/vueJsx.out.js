/* eslint-disable vue/one-component-per-file */ import { defineComponent, h } from "vue";
export default defineComponent({
    data () {
        return {
            message: "hello"
        };
    },
    methods: {
        handleClick (e) {
            console.log("handle div click", e);
        }
    },
    render () {
        const style = {
            margin: "10px"
        };
        const className = "active";
        return /*#__PURE__*/ React.createElement("div", {
            id: "myDiv",
            class: [
                "my-div",
                className
            ],
            style: style,
            onClick: this.handleClick
        }, /*#__PURE__*/ React.createElement(Comp, {
            name: this.message
        }));
    }
});
const Comp = defineComponent({
    props: [
        "name"
    ],
    render: ()=>/*#__PURE__*/ React.createElement("div", null, this.name)
});

