<template>
  <div class="table_class">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-class">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" placeholder="账户状态" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加账户
      </el-button>
    </div>
    <el-table
      :data="account"
      border
      stripe>
      <el-table-column
        prop="acctId"
        label="账户Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="custName"
        label="客户名称"
        fit>
      </el-table-column>
      <el-table-column
        prop="acctType"
        label="账户类型"
        fit>
      </el-table-column>
      <el-table-column
        prop="custNum"
        label="客户号"
        fit>
      </el-table-column>
      <el-table-column
        prop="custAcct"
        label="客户账号"
        fit>
      </el-table-column>
      <el-table-column
        prop="ccyCode"
        label="币种"
        fit>
      </el-table-column>
      <el-table-column
        prop="acctStatus"
        label="账户状态"
        fit>
      </el-table-column>
      <el-table-column
        prop="unitCode"
        label="机构号"
        fit>
      </el-table-column>
      <el-table-column
        prop="acctBalc"
        label="余额"
        fit>
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="enabled"-->
<!--        label="状态"-->
<!--        fit>-->
<!--        <template slot-scope="scope">-->
<!--          <el-switch-->
<!--            v-model="scope.row.enabled"-->
<!--            active-color="#13ce66"-->
<!--            inactive-color="#ff4949"-->
<!--            :active-value="1"-->
<!--            :inactive-value="0">-->
<!--          </el-switch>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.acctStatus=='冻结'"
            type="text"
            size="small" @click="activeAccount(scope.row)">
            启用
          </el-button>
          <el-button
            v-if="scope.row.acctStatus=='启用'"
            style="color: orange"
            type="text"
            size="small" @click="lockAccount(scope.row)">
            冻结
          </el-button>
          <el-button
            type="text"
            size="small" @click="deleteAccount(scope.row)">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    <account-edit @onSubmit="getTableData()" ref="accountAdd"></account-edit>
  </div>
</template>

<script>
    import UserEdit from './UserEdit'
    import AccountEdit from "./AccountEdit";
    export default {
        name: 'AccountManage',
        components:{AccountEdit, UserEdit},
        data () {
            return {
                account: [],
                tableData: [],

                // 默认每页数据量
                pagesize: 5,
                // 当前页码
                currentPage: 1,
                // 查询的页码
                start: 1,
                // 默认数据总数
                totalCount: 20,

                statusOptions: ['启用', '禁用'],
                listQuery: {
                    page: 1,
                    limit: 20,
                    status: undefined,
                    username: undefined,
                    type: undefined,
                    sort: '+id'
                },
            }
        },
        created () {
            this.getTableData()
        },
        methods: {
            getTableData () {
                var that = this
                this.axios
                    .post('/7979/user/search')
                    .then(response => {
                        let responseData = response.data.data
                        let tableData = []
                        let acctStatusTmp = ''
                        for (var i in responseData) {
                            if (responseData[i].acctStatus === 0) {
                                acctStatusTmp = '启用'
                            }
                            if (responseData[i].acctStatus === 1) {
                                acctStatusTmp = '冻结'
                            }
                            tableData.push({
                                acctId: responseData[i].acctId,
                                custName: responseData[i].custName,
                                acctType: responseData[i].acctType,
                                custNum: responseData[i].custNum,
                                custAcct: responseData[i].custAcct,
                                acctSqnum: responseData[i].acctSqnum,
                                ccyCode: responseData[i].ccyCode,
                                acctAttr: responseData[i].acctAttr,
                                acctStatus: acctStatusTmp,
                                unitCode: responseData[i].unitCode,
                                lastUpdate: responseData[i].lastUpdate,
                                acctBalc: responseData[i].acctBalc,
                                opactDate: responseData[i].opactDate,
                            })
                            // console.log(responseData[i].roles)
                        }
                        this.account = tableData
                    })
                    .catch(function (error) { // 请求失败处理
                        // that.$message.warning('没有权限')
                        // that.$router.replace('/401')
                        console.log(error)
                    })
            },
            lockAccount (item) {
                var that = this
                that.$alert('确定冻结账户吗？', '冻结', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.axios
                        .post('/7979/user/lock?acctId=' + item.acctId).then(resp => {
                        if (resp && resp.data.code === 200) {
                            that.getTableData()
                            that.$message.success("冻结成功")
                        } else {
                            that.$message.success("冻结失败")
                        }
                    })
                        .catch(function (error) { // 请求失败处理
                            console.log(error)
                            that.$message.warning('失败')
                        })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            activeAccount (item) {
                var that = this
                that.$alert('确定启用账户吗？', '启用', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.axios
                        .post('/7979/user/enable?acctId=' + item.acctId).then(resp => {
                        if (resp && resp.data.code === 200) {
                            that.getTableData()
                            that.$message.success("启用成功")
                        } else {
                            that.$message.success("启用失败")
                        }
                    })
                        .catch(function (error) { // 请求失败处理
                            console.log(error)
                            that.$message.warning('失败')
                        })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            deleteAccount (item) {
                var that = this
                that.$alert('确定删除账户吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.axios
                        .post('/7979/user/delete?acctId=' + item.acctId).then(resp => {
                        if (resp && resp.data.code === 200) {
                            that.getTableData()
                            that.$message.success("删除成功")
                        } else {
                            that.$message.success("删除失败")
                        }
                    })
                        .catch(function (error) { // 请求失败处理
                            console.log(error)
                            that.$message.warning('失败')
                        })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            handleCreate() {
                // this.resetTemp()
                // this.dialogStatus = 'create'
                this.$refs.accountAdd.dialogFormVisible = true

                // this.$refs.accountAdd.form = {
                //     id: item.id,
                //     username: item.username,
                //     name: item.name,
                //     phone: item.phone,
                //     email: item.email,
                //     enabled: item.enabled,
                //
                //     acctId: item.acctId,
                //     custName: item.custName,
                //     acctType: item.acctType,
                //     custNum: item.custNum,
                //     custAcct: item.custAcct,
                //     acctSqnum: item.acctSqnum,
                //     ccyCode: item.ccyCode,
                //     acctAttr: item.acctAttr,
                //     acctStatus: item.acctStatus,
                //     unitCode: item.unitCode,
                //     lastUpdate: item.lastUpdate,
                //     acctBalc: item.acctBalc,
                //     opactDate: item.opactDate,
                // }
            },
            handleFilter() {
                // this.listQuery.page = 1
                // this.getList()
            },
            // 每页显示数据量变更
            handleSizeChange: function (val) {
                this.pagesize = val
                // this.getTableData(this.currentPage, this.pagesize)
                this.getTableData()
            },

            // 页码变更
            handleCurrentChange: function (val) {
                this.currentPage = val
                // this.getTableData(this.currentPage, this.pagesize)
                this.getTableData()
            },
        }
    }
</script>

<style scoped>

</style>
