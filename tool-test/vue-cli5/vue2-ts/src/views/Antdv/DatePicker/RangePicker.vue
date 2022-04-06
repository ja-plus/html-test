<template lang="pug">
a-range-picker(
  :defaultValue='defaultValue',
  :disabledDate='disabledDate',
  @calendarChange='calendarChange',
  @change='change'
)
</template>
<script lang="ts">
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AntdvRangePicker extends Vue {
  defaultValue = [moment().subtract(1, 'years'), moment()];
  enabledDateRange: [moment.MomentInput, moment.MomentInput] = [moment(), moment()];
  disabledDate(currentDate: moment.Moment) {
    return !currentDate.isBetween('2021-04-06', '2023-04-06');
    // return currentDate.isBetween(...this.enabledDateRange);
  }
  calendarChange(dates: [moment.Moment, moment.Moment], dateString: [string, string]) {
    if (dates[0]) {
      this.enabledDateRange = [dates[0].subtract(1, 'years'), dates[0].add(1, 'years')];
    }
    console.log(
      'calendarChange:',
      dates.map(it => it.format('YYYY-MM-DD')),
      dateString,
    );
  }
  change(dates: [moment.Moment, moment.Moment], dateString: [string, string]) {
    console.log('change: ', dates, dateString);
  }
}
</script>
