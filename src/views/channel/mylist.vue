<template>
  <div class="app-container">
    <div class="filter-container mylist">
      <search-table-pagination
        ref="searchTable"
        :data="tableData"
        :page-sizes="[5, 10]"
        :columns="columns"
        :form-options="formOptions"
        :url="url"
        border
        type="local">
        <template slot="append">
          <el-table-column label="其他">
            <template slot-scope="scope">
              <div class="right">
                <div class="detail">
                  <p>
                    <span class="name">{{ scope.row.filename }}</span>
                    <span>{{ scope.row.type }}</span>
                    <span>总{{ scope.row.nums }}条</span>
                    <span>上传人：{{ scope.row.uploadman }}</span>
                  </p>
                  <p>
                    <span>销售成功 {{ scope.row.success }}条</span>
                    <span>在销售 {{ scope.row.saling }}条</span>
                    <span>失败 {{ scope.row.fail }}条</span>
                    <span>未销售 {{ scope.row.left }}条</span>
                  </p>
                </div>
                <div class="operate">
                  <el-button
                    size="mini"
                  >修改等级</el-button>
                  <el-button
                    size="mini"
                  >查看详情</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                  >导出</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </template>
      </search-table-pagination>
    </div>
  </div>
</template>

<script>
import SearchTablePagination from '@/components/SearchTablePagination'

const formOptions = {
  inline: true,
  showResetBtn: true,
  submitBtnText: '查询',
  resetBtnText: '重置',
  size: 'mini',
  forms: [
    { prop: 'filename', label: '文件名' },
    { prop: 'wx2', label: '渠道客户', itemType: 'select', options: [{ label: '全部', value: '0' }, { label: '未分配', value: '2' }, { label: '已分配', value: '3' }] }
  ]
}

const columns = [
  { prop: 'time', label: '时间', width: 190 }
]

export default{
  name: 'Management',
  components: { SearchTablePagination },
  data() {
    return {
      loading: false,
      dialogFormVisible: true,
      formOptions,
      url: ['channel', 'getData'],
      columns,
      tableData: [
        { time: '2018-09-01 12:12:12', filename: '数据1', type: '线索A', nums: 73, uploadman: '宋柯翰1', success: 12, saling: 12, fail: 0, left: 0 },
        { time: '2028-09-03 02:02:02', filename: '数据2', type: '线索B', nums: 234, uploadman: '宋柯翰2', success: 13, saling: 1, fail: 1, left: 0 },
        { time: '2018-09-01 12:12:12', filename: '数据1', type: '线索A', nums: 73, uploadman: '宋柯翰1', success: 12, saling: 12, fail: 0, left: 0 },
        { time: '2018-09-01 12:12:12', filename: '数据1', type: '线索A', nums: 73, uploadman: '宋柯翰1', success: 12, saling: 12, fail: 0, left: 0 },
        { time: '2018-09-01 12:12:12', filename: '数据1', type: '线索A', nums: 73, uploadman: '宋柯翰1', success: 12, saling: 12, fail: 0, left: 0 },
        { time: '2018-09-01 12:12:12', filename: '数据1', type: '线索A', nums: 73, uploadman: '宋柯翰1', success: 12, saling: 12, fail: 0, left: 0 },
        { time: '2018-09-01 12:12:12', filename: '数据1', type: '线索A', nums: 73, uploadman: '宋柯翰1', success: 12, saling: 12, fail: 0, left: 0 },
        { time: '2018-09-01 12:12:12', filename: '数据1', type: '线索A', nums: 73, uploadman: '宋柯翰1', success: 12, saling: 12, fail: 0, left: 0 }
      ]
    }
  },
  computed: {

  },

  mounted() {
  },
  methods: {

  }

}

</script>
<style lang='scss'>
.mylist{
  .el-form{
    text-align:center;
    margin-top:10px;
  }
 .el-table{
    border:none;
    margin-top:20px;
    .el-table__header-wrapper{
      display: none;
    }
    tr,td,{
      border:none;
      padding-top:4px;
      padding-bottom:20px;
    }
    .el-table__row{
      td{
        .cell{
          padding-left:20px;
        }
      }
      td:first-child{
        position:relative;
        .cell{
          position: absolute;
          top: 0;
          left: 0;
          font-size: 16px;
          color: #333;
          width: 100%;
          height: 100%;
          text-align:left;
          padding-left:10px;
          &:before{
            content:'';
            width:8px;
            height:8px;
            border-radius:50%;
            overflow: hidden;
            position: absolute;
            top:0;
            right:0;
            background: #ccc;
          }
          &:after{
            content:'';
            width:1px;
            height:100%;
            position: absolute;
            top:0;
            right:4px;
            background: #ccc;
          }
        }
      }
    }
    .right{
        border:1px solid #ccc;
        padding:10px 20px;
        overflow: hidden;
        .detail{
          width:70%;
          float:left;
          p{
            margin-top:7px;
            span{
              display: inline-block;
              margin-right:20px;
            }
            .name{
              width:50%;
            }
            &:last-child{
              color:#ff7800;
            }
          }
        }
        .operate{
          margin-top:14px;
        }
      }
  }
  .el-table--border::after, .el-table--group::after,.el-table::before{
    display: none;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background: none;
  }
}

</style>
