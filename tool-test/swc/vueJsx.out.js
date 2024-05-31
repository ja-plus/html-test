/* eslint-disable vue/one-component-per-file */ import "core-js/modules/es.regexp.to-string.js";
import { createTextVNode as _createTextVNode, createVNode as _createVNode, isVNode as _isVNode, vModelText as _vModelText, withDirectives as _withDirectives } from "vue";
function _isSlot(s) {
    return typeof s === "function" || ({}).toString.call(s) === "[object Object]" && !_isVNode(s);
}
import { defineComponent, h, ref } from 'vue';
export default defineComponent({
    data () {
        return {
            message: 'hello',
            model: '11'
        };
    },
    methods: {
        handleClick (e) {
            console.log('handle div click', e);
        }
    },
    render () {
        var _slot;
        var style = {
            margin: '10px'
        };
        var a = {};
        a.b = 1;
        var b = a === null || a === void 0 ? void 0 : a.b;
        var className = 'active';
        var Child = {
            default: _createVNode("span", null, [
                _createTextVNode("slooot")
            ])
        };
        var t = ()=>'ss';
        return _createVNode("div", {
            "id": "myDiv",
            "class": [
                'my-div',
                className
            ],
            "style": style,
            "onClick": this.handleClick
        }, [
            _withDirectives(_createVNode("input", {
                "onUpdate:modelValue": ($event)=>this.message = $event,
                "onUpdate:a": ($event)=>this.model = $event
            }, null), [
                [
                    _vModelText,
                    this.message
                ],
                [
                    _vModelText,
                    this.model,
                    "a"
                ]
            ]),
            _createVNode(Comp, {
                "name": this.message
            }, _isSlot(Child) ? Child : {
                default: ()=>[
                        Child
                    ]
            }),
            _createVNode(Comp, null, _isSlot(_slot = t()) ? _slot : {
                default: ()=>[
                        _slot
                    ]
            })
        ]);
    }
});
var Comp = defineComponent({
    props: [
        'name'
    ],
    setup: (props, ctx)=>{
        var a = ref(1);
        var b = ref(2);
        return ()=>_withDirectives(_createVNode("div", {
                "onUpdate:modelValue": ($event)=>a.value = $event,
                "onUpdate:b": ($event)=>b.value = $event
            }, [
                props.name,
                ctx.slots.default()
            ]), [
                [
                    _vModelText,
                    a.value
                ],
                [
                    _vModelText,
                    b.value,
                    "b"
                ]
            ]);
    }
});

