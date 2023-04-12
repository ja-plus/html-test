/* eslint-disable vue/one-component-per-file */ import { createVNode as _createVNode } from "vue";
import { defineComponent, h } from "vue";
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
        return _createVNode("div", {
            "id": "myDiv",
            "class": [
                "my-div",
                className
            ],
            "style": style,
            "onClick": this.handleClick
        }, [
            _createVNode(Comp, {
                "name": this.message
            }, null)
        ]);
    }
});
const Comp = defineComponent({
    props: [
        "name"
    ],
    render: ()=>_createVNode("div", null, [
            this.name
        ])
});

