<template>
  <el-radio-group
    v-model="formItem"
    @change="radioChange"
  >
    <template v-for="(op, opIndex) in radioOptions">
      <el-radio
        v-if="saleResultMsg"
        :key="opIndex + '_radio'"
        :ref="op.id"
        :label="op.dictitemDesc">
        {{ op.dictitemDesc }}
      </el-radio>
    </template>
  </el-radio-group>
</template>
<script>
import props from './props'
import { request } from '@/utils/request'

export default {
  name: 'RemoteRadio',
  props,
  data() {
    return {
      radioOptions: [],
      formItem: [],
      saleResultMsg: false
    }
  },
  computed: {
    getLoading() {
      return this.$store.getters.loading
    }
  },
  mounted() {
    const { formitem: { radioUrl, resultHandler, radioParams = {} }, loadingkey } = this.$props
    console.log(this.$props)
    this.formItem = this.$props.formitem
    // debugger
    this.getRemoteRadio(radioUrl, radioParams, loadingkey, resultHandler)
  },
  methods: {
    getRemoteRadio(url, radioParams, datakey, resultHandler) {
      request(url, radioParams, { loadkey: datakey }).then(response => {
        if (response) {
          this.radioOptions = response.data
        }
      })
    },
    radioChange(value) {
      this.$emit('radioselect', value)
    }
  }
}
</script>
