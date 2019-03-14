<template>
    <div class="container">
        <div>
            <search-table-pagination
                :columns="listQuerytOptions.columns"
                :form-options="listQuerytOptions.formOptions"
                :showPagination="true"
                :data="blackListData"
                url="channel_blackList"
                >
                <div class="operation" slot="">
                    <el-button
                    v-bind="baseSetting.button"
                    type="success"
                    plain
                    icon="el-icon-circle-plus"
                    >新增</el-button>
                    <el-button
                    v-bind="baseSetting.button"
                    type="primary"
                    plain
                    icon="el-icon-circle-plus"

                    >解除</el-button>
                </div>
            </search-table-pagination>
        </div>
    </div>
</template>
<script>
    import SearchTablePagination from '@/components/SearchTablePagination'
    import { reqInit } from '@/utils/request'
    const request = reqInit('channel')
    // 黑名单查询配置信息
    const listQuerytOptions = {
        formOptions: {
            forms: [
            { prop: 'listPhone', label: '手机号', width: 180 },
            { prop: 'listWechat', label: '微信号', width: 180 },
            { prop: ['createTimeStart', 'creatTimeEnd'], label: '创建日期', itemType: 'daterange', parseRule: 'YYYY-MM-DD' },
            ]
        },
        columns: [
            { type: 'selection', width: 40 },
            { prop: 'srcKeyId', label: '来源表主键', width: 100 },
            { prop: 'telphone', label: '手机号码', width: 150 },
            { prop: 'wechat', label: '微信', width: 150 },
            { prop: 'operaTypeStr', label: '操作类型', width: 200 },
            { prop: 'sourceStr', label: '数据来源', width: 150 },
            { prop: 'reason', label: '置入原因', width: 150 },
            { prop: 'createName', label: '创建人', width: 150 },
            { prop: 'createTime', label: '创建时间', width: 200 },

        ]
    }
    export default{
        name:'blackList',
        components:{SearchTablePagination},
        data(){
            return{
                listQuerytOptions,
                blackListData:[]
            }
        },
        computed:{
            baseSetting() {
                return this.$store.getters.baseSetting
            }
        },
        beforeCreate(){

        },
        mounted(){
            this.getBlackList()
        },
        methods:{
            getBlackList(){
                const params = {
                    pageSize:20,
                    pageNo:1,
                    telphone:'',
                    wechat:'',
                    creatTimeStart:'',
                    creatTimeEnd:''
                }
                request('blackList', params, { loadKey: 'blackList' }).then(res => {
                    this.blackListData = res.data.list
                })
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
        .operation{
            margin-top: 10px;
        }
    }
</style>
