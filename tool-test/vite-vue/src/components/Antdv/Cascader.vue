<template>
    <h3>Cascader</h3>
    <a-cascader :options="options" :show-search="{ filter }" placeholder="Please select" @change="onChange" expandTrigger="hover"/>
</template>
<script>
export default {
    data() {
        return {
            options: [
                {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                        {
                            value: 'hangzhou',
                            label: 'Hangzhou',
                            children: [
                                {
                                    value: 'xihu',
                                    label: 'West Lake',
                                },
                                {
                                    value: 'xiasha',
                                    label: 'Xia Sha',
                                    disabled: true,
                                },
                            ],
                        },
                        {
                            label:'jinhua',
                            value:'1101010'
                        }
                    ],
                },
                {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [
                        {
                            value: 'nanjing',
                            label: 'Nanjing',
                            children: [
                                {
                                    value: 'zhonghuamen',
                                    label: 'Zhong Hua men',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        onChange(value, selectedOptions) {
            console.log(value, selectedOptions);
        },
        filter(inputValue, path) {
            return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
        },
    },
};
</script>
