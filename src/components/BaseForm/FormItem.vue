<template>
  <el-form-item v-show="visible" v-bind="props" :ref="prop" >
    <el-input
      v-if="itemType === 'input'"
      v-model="value"
      v-bind="props"
      :type="inpType"
    />
    <el-input-number
      v-else-if="itemType === 'number'"
      v-model="value"
      v-bind="props"
    />
    <el-select
      v-else-if="itemType === 'select' && !remoteUrl"
      v-model="value"
      v-bind="props"
    >
      <el-option
        v-for="(option, optionIndex) in options"
        :key="optionIndex + '_local'"
        :value="(typeof option === 'object') ? option[valueKey || 'value'] : option"
        :label="(typeof option === 'object') ? option[labelKey || 'label'] : option"/>
    </el-select>
    <RemoteSelect
      v-else-if="itemType === 'select' && remoteUrl"
      :ref="prop + '_remoteSelect'"
      v-bind="props"
      @handleChange="remoteItemChange"
    />
    <el-date-picker
      v-else-if="itemType === 'date'"
      v-model="value"
      v-bind="props"
      type="date"
    />
    <el-date-picker
      v-else-if="itemType === 'daterange'"
      v-model="value"
      v-bind="props"
      type="daterange"
      @change="dateHandleChange"/>
    <el-radio-group
      v-else-if="itemType === 'radio'"
      v-model="value"
      v-bind="props"
    >
      <el-radio
        v-for="(option, opIndex) in options"
        :key="opIndex + '_radio'"
        v-bind="option"
        :value="(typeof option === 'object') ? option[valueKey || 'value'] : option"
        :label="(typeof option === 'object') ? option[labelKey || 'label'] : option"/>
    </el-radio-group>
    <remote-radio
      v-else-if="itemType === 'radio' && remoteUrl"
      :ref="prop + '_remoteRadio'"
      v-model="value"
      v-bind="props"
    />
    <el-checkbox-group
      v-else-if="itemType === 'checkbox' && remoteUrl"
      v-model="value"
      v-bind="props"
    >
      <el-checkbox
        v-for="(option, opIndex) in options"
        :key="opIndex + '_checkbox'"
        v-bind="option"
        :value="(typeof option === 'object') ? option[valueKey || 'value'] : option"
        :label="(typeof option === 'object') ? option[labelKey || 'label'] : option"/>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
import moment from 'moment'
import RemoteSelect from '@/components/RemoteSelect'
import { formItemProps } from './props'

export default {
  name: 'FormItem',
  components: {
    RemoteSelect
  },
  props: formItemProps,
  data() {
    const { defaultValue, $props, prop } = this
    const props = Array.isArray(prop) ? { ...$props, prop: prop[0] }: $props
    return {
      value: defaultValue,
      props
    }
  },
  // watch: {
  //   value(value) {
  //     this.$emit('handleChange', { [this.prop]: value })
  //   }
  // },
  mounted() {
    // 不侦听日期范围框变化
    const { prop } = this
    !Array.isArray(prop) && this.$watch('value', val => this.$emit('handleChange', { [prop]: val }))
  },
  methods: {
    // 远程下拉框改变值
    remoteItemChange(val) {
      this.value = val
    },
    dateHandleChange(date) {
      let dates = ['', '']
      const [startDateKey, endDateKey] = this.prop
      if (typeof date === 'string') {
        dates = date.split(' - ')
      } else if (date && date.hasOwnProperty('length')) {
        const [firstDate, secondDate] = date
        dates = [moment(firstDate).format('YYYY-MM-DD'), moment(secondDate).format('YYYY-MM-DD')]
      }
      const [startDate, endDate] = dates
      this.$emit('handleChange', { [startDateKey]: startDate, [endDateKey]: endDate })
    },
    resetVal(value = '') {
      const { $refs, prop, remoteUrl, itemType } = this
      $refs[prop].resetField()
      if (itemType === 'select' && remoteUrl) {
        $refs[`${prop}_remoteSelect`].resetVal(value)
      } else {
        this.value = value
      }
    }
  }
}
</script>

<style scoped>

</style>
