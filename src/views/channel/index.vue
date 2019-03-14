<template>
  <div class="container">
    <div class="center">
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
          class="box">
          <h2>{{ item.label }}</h2>
          <div>
            <p><span>线索数量</span><span @click="go('listManage',{type:'clue'})">{{ item.clue }}</span></p>
            <p><span>名单数量</span><span @click="go({startTime:2,endTime:3})">{{ item.name }}</span></p>
            <p><span>约课数量</span><span @click="go({status:2})">{{ item.orderCourse }}</span></p>
            <p><span>签单数量</span><span @click="go({status:'clue'})">{{ item.pay }}</span></p>
          </div>
        </li>
      </ul>
      <div class="operate-table box">
        <h2>您有未及时跟进的渠道：{{ tableData.length }}位</h2>
        <div class="table">
          <el-table :data="tableData">
            <el-table-column
              prop="name"
              label="姓名"
            />
            <el-table-column
              prop="date"
              label="原定跟进日期"
            />
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleFollow(scope.row)">跟进</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
const list = [
  { label: '本月', type: 'month', clue: '', name: '', orderCourse: '', pay: '' },
  { label: '本周', type: 'week', clue: '', name: '', orderCourse: '', pay: '' }
]

export default{
  name: 'ChannelIndex',
  components: { },
  data() {
    return {
      list,
      tableData: [{
        name: '宋克寒1',
        date: '2016-05-02 14:23:09'
      }, {
        name: '宋克寒2',
        date: '2016-05-02 14:23:09'
      }]
    }
  },
  computed: {

  },
  mounted() {
    // 更新数量
    const data = { month: { clue: 1, name: 2, orderCourse: 3, pay: 4 }, week: { clue: 5, name: 6, orderCourse: 7, pay: 8 }}
    this.list = this.list.map((item, index) => ({ ...item, ...data[item.type] }))
  },
  methods: {
    handleFollow(row) {

    },
    go(name, params) {
      this.$router.push({ name, params })
    }
  }

}

</script>

<style lang='scss' scoped>

.container{
  min-height:calc(100vh - 84px);
  background:#f2f2f2;
  width:100%;
  padding:20px;
  box-sizing:border-box;
  .box{
    background: #fff;
    padding-bottom:20px;
    box-shadow: 0 0 12px #00000021;
    border-radius:4px;
    margin-bottom:20px;
    h2{
      font-size:22px;
      padding-left:10px;
      line-height:50px;
      border-left:5px solid #f5a623;
    }
  }
  ul{
    font-size:0;
    li{
      font-size:14px;
      width:calc(50% - 10px);
      display: inline-block;
      margin-left:20px;
      &:first-child{
        margin-left:0;
      }
      div{
        padding:0 40px;
        p{
          font-size:14px;
          line-height:40px;
          height:40px;
          overflow: hidden;
          border-top:1px solid #f2f2f2;
          &:first-child{
            border:none;
          }
          span{
            display: inline-block;
            width:50%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding:0 20px;
            color:#c87d00;
            text-align:right;
            &:first-child{
              color:#4a4a4a;
              text-align:left;
            }
            &:last-child{
              cursor:pointer;
              &:hover{
                opacity: 0.7;
              }
            }
          }
        }
      }

    }
}
  .operate-table{
    .table{
      padding:0 40px;
    }
  }
}

</style>
