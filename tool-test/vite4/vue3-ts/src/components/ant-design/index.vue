<template>
  <div>
    ant-design
    <DatePicker :locale="locale" :show-today="false" size="small">
      <template #suffixIcon>
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" class="">
          <g stroke="none" stroke-width="1" fill="currentColor">
            <g id="icon_rili">
              <g>
                <path
                  d="M3.00522612,2.23388217 C2.86715493,2.23388217 2.75522612,2.34581098 2.75522612,2.48388217 L2.75522612,13.5161178 C2.75522612,13.654189 2.86715493,13.7661178 3.00522612,13.7661178 L13.0052261,13.7661178 C13.1432973,13.7661178 13.2552261,13.654189 13.2552261,13.5161178 L13.2552261,2.48388217 C13.2552261,2.34581098 13.1432973,2.23388217 13.0052261,2.23388217 L3.00522612,2.23388217 Z"
                  stroke="currentColor"
                  fill="transparent"
                  stroke-width="1.5"
                  transform="translate(8.005226, 8.000000) rotate(-270.000000) translate(-8.005226, -8.000000) "
                ></path>
                <g transform="translate(3.747167, 1.500000)">
                  <rect x="0.771277979" y="6" width="6.98893289" height="1.5"></rect>
                  <rect x="1" y="0" width="1.5" height="2.1599904"></rect>
                  <rect x="6.48893289" y="0" width="1.5" height="2.1599904"></rect>
                </g>
                <g transform="translate(3.747167, 10.000000)"><rect x="0.771277979" y="0" width="6.98155482" height="1.5"></rect></g>
                <line x1="2.41998226" y1="6" x2="13.59047" y2="6" stroke="currentColor" stroke-width="1.5"></line>
              </g>
            </g>
          </g>
        </svg>
      </template>
    </DatePicker>
    <Select
      size="small"
      style="width: 100px"
      :options="[
        { label: '年', value: '1' },
        { label: '月', value: '2' },
        { label: '日', value: '3' },
      ]"
    >
      <template #suffixIcon>
        <svg
          viewBox="0 0 1024 1024"
          data-icon="caret-down"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          class=""
        >
          <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
        </svg>
      </template>
    </Select>
  </div>
</template>
<script lang="ts" setup>
import { DatePicker, Select } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
// import 'ant-design-vue/dist/antd.dark.css';
import './ths-style.less';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  weekStart: 7, // 设置一周开始时间为周日
});
// import 'ant-design-vue/es/date-picker/style/index.css';
</script>
