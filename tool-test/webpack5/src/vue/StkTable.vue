<script setup>
import { onMounted, ref, computed } from 'vue';
const props = defineProps({
    virtual: {
        type: Boolean,
        default: true
    },
    columns: {
        type: Array
    },
    dataSource: {
        type: Array
    }
})
const tableContainer = ref();
const virtualScroll = ref({
    containerHeight: 0,
    startIndex: 0, // 数组开始位置
    rowHeight: 28,
    offsetTop: 0, // 表格定位上边距
    scrollTop: 0, // 纵向滚动条位置，用于判断是横向滚动还是纵向
});

const dataSourceCopy = computed(() => [...props.dataSource]);

const virtual_pageSize = computed(() => Math.ceil(virtualScroll.value.containerHeight / virtualScroll.value.rowHeight) + 1); // 这里最终+1，因为headless=true无头时，需要上下各预渲染一行。

const virtual_on = computed(() => props.virtual && dataSourceCopy.value.length > virtual_pageSize.value * 2)
const virtual_dataSourcePart = computed(() => virtual_on.value
    ? dataSourceCopy.value.slice(virtualScroll.value.startIndex, virtualScroll.value.startIndex + virtual_pageSize.value)
    : dataSourceCopy.value)
const virtual_offsetBottom = computed(() => virtual_on.value ? (dataSourceCopy.value.length - virtualScroll.value.startIndex - virtual_dataSourcePart.value.length) * virtualScroll.value.rowHeight : 0)


onMounted(() => {
    initVirtualScroll();
})

/**
   * 初始化虚拟滚动参数
   * @param {number} [height] 虚拟滚动的高度
   */
function initVirtualScroll(height) {
    initVirtualScrollY(height);
    // this.initVirtualScrollX();
}
/**
 * 初始化Y虚拟滚动参数
 * @param {number} [height] 虚拟滚动的高度
 */
function initVirtualScrollY(height) {
    if (virtual_on.value) {
        virtualScroll.value.containerHeight = typeof height === 'number' ? height : tableContainer.value?.offsetHeight;
        updateVirtualScrollY(tableContainer.value?.scrollTop);
    }
}
/** 通过滚动条位置，计算虚拟滚动的参数 */
function updateVirtualScrollY(sTop = 0) {
    const { rowHeight } = virtualScroll.value;
    const startIndex = Math.floor(sTop / rowHeight);
    Object.assign(virtualScroll.value, {
        startIndex,
        offsetTop: startIndex * rowHeight, // startIndex之前的高度
    });
}

function onTableScroll(e) {
    if (!e?.target) return;

    // 此处可优化，因为访问e.target.scrollXX消耗性能
    const { scrollTop, scrollLeft } = e.target;
    // 纵向滚动有变化
    if (scrollTop !== virtualScroll.value.scrollTop) virtualScroll.value.scrollTop = scrollTop;
    if (virtual_on.value) {
        updateVirtualScrollY(scrollTop);
    }
}
</script>
<template>
    <div class="stk-table" ref="tableContainer" @scroll="onTableScroll">
        <table class="stk-table-main">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col.dataIndex" :data-col-key="col.dataIndex">{{ col.title || '--' }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr :style="{ height: `${virtualScroll.offsetTop}px` }"></tr>
                <tr v-for="row in virtual_dataSourcePart" :key="row.id">
                    <td v-for="col in columns" :key="col.dataIndex">{{ row[col.dataIndex] || '--' }}</td>
                </tr>
                <tr :style="{ height: `${virtual_offsetBottom}px` }"></tr>
            </tbody>
        </table>
    </div>
</template>
