
<!--<template>-->
  <!--<el-form-->
    <!--ref="form"-->
    <!--:model="params"-->
    <!--:inline="inline"-->
    <!--:label-width="labelWidth ? (labelWidth + 'px') : ''"-->
    <!--@submit.native.prevent="searchHandler()">-->
    <!--<el-form-item-->
      <!--v-for="(formItem, index) in showForms"-->
      <!--:key="index"-->
      <!--v-bind="formItem"-->
      <!--:prop="formItem.itemType != 'daterange' ? formItem.prop : (datePrefix + index)"-->
    <!--&gt;-->
      <!--<el-input-->
        <!--v-loading="getLoading[formItem.loadingKey]"-->
        <!--v-if="formItem.itemType === 'input' || formItem.itemType === undefined"-->
        <!--v-model="params[formItem.modelValue]"-->
        <!--v-bind="formItem"-->
        <!--:type="formItem.inpType === undefined ? 'text' : formItem.inpType"-->
      <!--/>-->
      <!--<el-input-number-->
        <!--v-loading="getLoading[formItem.loadingKey]"-->
        <!--v-if="formItem.itemType === 'number'"-->
        <!--v-model="params[formItem.modelValue]"-->
        <!--v-bind="formItem"-->
      <!--/>-->
      <!--<el-select-->
        <!--v-loading="getLoading[selectOptionPrefix+index]"-->
        <!--v-else-if="formItem.itemType === 'select' && !formItem.remoteUrl"-->
        <!--v-model="params[formItem.modelValue]"-->
        <!--v-bind="formItem"-->
        <!--@change="formItem.change ? formItem.change($event, formItem):''">-->
        <!--<el-option-->
          <!--v-for="(option, optionIndex) in formItem.options"-->
          <!--:key="optionIndex + '_local'"-->
          <!--:value="(typeof option === 'object') ? option[formItem.valueKey || 'value'] : option"-->
          <!--:label="(typeof option === 'object') ? option[formItem.labelKey || 'label'] : option"/>-->
      <!--</el-select>-->
      <!--<remote-select-->
        <!--v-else-if="formItem.itemType === 'select' && formItem.remoteUrl"-->
        <!--:ref="formItem.prop"-->
        <!--:loadingkey="selectOptionPrefix+index"-->
        <!--:formitem="formItem"-->
        <!--@transcode="insetRemoteSelect"-->
      <!--/>-->
      <!--<el-date-picker-->
        <!--v-else-if="formItem.itemType === 'date'"-->
        <!--v-model="params[formItem.modelValue]"-->
        <!--v-bind="formItem"-->
        <!--:picker-options="formItem.pickerOptions || {}"-->
        <!--type="date"-->
      <!--/>-->
      <!--<el-date-picker-->
        <!--v-else-if="formItem.itemType === 'daterange'"-->
        <!--v-model="params[formItem.modelValue]"-->
        <!--v-bind="formItem"-->
        <!--type="daterange"-->
        <!--@change="date => changeDate(date, formItem.prop[0], formItem.prop[1])" />-->
    <!--</el-form-item>-->
    <!--<el-form-item label="">-->
      <!--<el-button-->
        <!--:size="size"-->
        <!--:loading="submitLoading"-->
        <!--type="primary"-->
        <!--@click="searchHandler">-->
        <!--{{ submitBtnText }}-->
      <!--</el-button>-->
      <!--<el-button-->
        <!--v-if="showResetBtn"-->
        <!--:plain="true"-->
        <!--:size="size"-->
        <!--:loading="submitLoading"-->
        <!--type="primary"-->
        <!--@click="resetForm">-->
        <!--{{ resetBtnText }}-->
      <!--</el-button>-->
    <!--</el-form-item>-->
  <!--</el-form>-->
<!--</template>-->

<!--<script>-->
<!--import remoteSelect from '../RemoteSelect/index.vue'-->
<!--import { parseTime } from '@/utils/date'-->
<!--import { request } from '@/utils/request'-->

<!--export default {-->
  <!--name: 'ElSearchForm',-->
  <!--components: {-->
    <!--remoteSelect-->
  <!--},-->
  <!--props: formProps,-->
  <!--data() {-->
    <!--const { forms, fuzzy } = this.$props-->
    <!--const datePrefix = 'daterange-prefix'-->
    <!--const selectOptionPrefix = 'select-option-prefix'-->
    <!--const dataObj = {-->
      <!--selectOptions: {}-->
    <!--}-->

    <!--const params = {}-->
    <!--const format = {}-->
    <!--const fuzzyOps = {}-->
    <!--forms.forEach((v, i) => {-->
      <!--const propType = typeof v.prop-->
      <!--if (propType === 'string') {-->
        <!--v.modelValue = v.prop-->
        <!--params[v.prop] = v.defaultValue !== undefined ? v.defaultValue : ''-->
        <!--fuzzyOps[v.prop] = v.fuzzy ? v.fuzzy : fuzzy-->
        <!--if (v.format) {-->
          <!--format[v.prop] = v.format-->
        <!--}-->
      <!--} else if (propType === 'object' && Object.prototype.toString.call(v.prop) === '[object Array]') {-->
        <!--v.prop.forEach((vv, index) => {-->
          <!--params[vv] = parseTime(v.defaultVaule[index], v.parseRule ? v.parseRule : '')-->
          <!--if (v.format) {-->
            <!--format[vv] = v.format-->
          <!--}-->
          <!--fuzzyOps[vv] = v.fuzzy ? v.fuzzy : fuzzy-->
        <!--})-->
      <!--}-->
      <!--if (v.itemType === 'daterange') {-->
        <!--params[datePrefix + i] = v.defaultVaule ? v.defaultVaule : ''-->
        <!--v.modelValue = datePrefix + i-->
      <!--}-->
    <!--})-->

    <!--return {-->
      <!--params,-->
      <!--datePrefix,-->
      <!--selectOptionPrefix,-->
      <!--...dataObj,-->
      <!--format,-->
      <!--fuzzyOps,-->
      <!--requestSetting: {}-->
    <!--}-->
  <!--},-->
  <!--computed: {-->
    <!--itemStyle() {-->
      <!--const { itemWidth } = this-->
      <!--if (itemWidth) {-->
        <!--return `width: ${itemWidth}px;`-->
      <!--}-->
      <!--return ''-->
    <!--},-->
    <!--showForms() {-->
      <!--const defaultSetting = { size: 'mini' }-->
      <!--return this.forms.filter(item => item.visible === undefined || item.visible === true).map(item => {-->
        <!--return { ...defaultSetting, ...item }-->
      <!--})-->
    <!--},-->
    <!--getLoading() {-->
      <!--return this.$store.getters.loading-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--isArray(value) {-->
      <!--return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]'-->
    <!--},-->
    <!--insetRemoteSelect(obj) {-->
      <!--this.params = Object.assign(this.params, obj)-->
    <!--},-->
    <!--searchHandler() {-->
      <!--this.getParams((error, params) => {-->
        <!--if (!error) {-->
          <!--const { submitHandler } = this-->
          <!--console.log(this)-->
          <!--debugger-->
          <!--if (submitHandler) {-->
            <!--submitHandler(params)-->
          <!--} else {-->
            <!--throw new Error('Need to set attribute: submitHandler !')-->
          <!--}-->
        <!--}-->
      <!--})-->
    <!--},-->
    <!--getParamFuzzy() {-->
      <!--return this.fuzzyOps-->
    <!--},-->
    <!--getParams(callback) {-->
      <!--this.$refs['form'].validate(valid => {-->
        <!--if (valid) {-->
          <!--const { params, datePrefix, format } = this-->
          <!--const formattedForm = {}-->
          <!--Object.keys(params).forEach(v => {-->
            <!--if (v.indexOf(datePrefix) === -1) {-->
              <!--formattedForm[v] = format[v] ? format[v](params[v], v) : params[v]-->
            <!--}-->
          <!--})-->
          <!--if (callback) callback(null, formattedForm)-->
        <!--} else {-->
          <!--if (callback) callback(new Error())-->
        <!--}-->
      <!--})-->
    <!--},-->
    <!--resetForm() {-->
      <!--this.$refs['form'].resetFields()-->
      <!--const { forms } = this.$props-->
      <!--forms.map(form => {-->
        <!--if (form.itemType === 'select' && form.remoteUrl) {-->
          <!--this.$refs[form.prop][0].reset()-->
        <!--}-->
      <!--})-->
    <!--},-->
    <!--changeDate(date, startDate, endDate) {-->
      <!--let dates-->
      <!--if (date === null) {-->
        <!--this.params[startDate] = ''-->
        <!--this.params[endDate] = ''-->
        <!--return-->
      <!--}-->
      <!--if (typeof date === 'string') {-->
        <!--dates = date.split(' - ')-->
      <!--} else if (date && date.hasOwnProperty('length')) {-->
        <!--const firstDate = date[0]-->
        <!--const secondDate = date[1]-->
        <!--dates = [-->
          <!--`${firstDate.getFullYear()}-${('0' + (firstDate.getMonth() + 1)).substr(-2)}-${('0' + firstDate.getDate()).substr(-2)}`,-->
          <!--`${secondDate.getFullYear()}-${('0' + (secondDate.getMonth() + 1)).substr(-2)}-${('0' + secondDate.getDate()).substr(-2)}`-->
        <!--]-->
      <!--}-->

      <!--this.params[startDate] = dates[0]-->
      <!--this.params[endDate] = dates[1]-->
    <!--}-->

  <!--}-->
<!--}-->
<!--</script>-->
