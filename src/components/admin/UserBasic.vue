<template>
  <div class="table_class">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-class">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
<!--      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 90px" class="filter-item">-->
<!--        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />-->
<!--      </el-select>-->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="handleReset">
        重置
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <el-table
      :data="users"
      border
      stripe>
      <el-table-column
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        fit>
      </el-table-column>
      <el-table-column
        prop="name"
        label="真实姓名"
        fit>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        fit>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        fit>
      </el-table-column>
      <el-table-column
        prop="enabled"
        label="状态"
        fit>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户类型"
        fit>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        fit>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        fit>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small" @click="editUser(scope.row)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="small" @click="deleteUser(scope.row)">
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
    <user-edit @onSubmit="getTableData()" ref="userEdit"></user-edit>
  </div>
</template>

<script>
  import UserEdit from './UserEdit'
  export default {
    name: 'UserBasic',
    components:{UserEdit},
    data () {
      return {
        users: [],
        tableData: [],

        // 默认每页数据量
        pagesize: 5,
        // 当前页码
        currentPage: 1,
        // 查询的页码
        start: 1,
        // 默认数据总数
        totalCount: 20,

        listLoading: false,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['启用', '禁用'],
        listQuery: {
          page: 1,
          limit: 20,
          status: undefined,
          username: undefined,
          type: undefined,
          sort: '+id'
        },
        // addFlag: true
      }
    },
    created () {
      this.getTableData()
    },
    methods: {
      getTableData () {
        var that = this
        this.axios
          .get('/7979/user/getAllUsers', {
              params: {
                  pageNum: this.currentPage,
                  pageSize: this.pagesize
              }
          })
          .then(response => {
            let responseData = response.data.data.UserList
            let tableData = []
            for (var i in responseData) {
              tableData.push({
                id: responseData[i].userId,
                username: responseData[i].userName,
                name: responseData[i].realName,
                phone: responseData[i].teleNum,
                email: responseData[i].email,
                enabled: responseData[i].userStatus,
                type: responseData[i].userType,
                address: responseData[i].address,
                createTime: responseData[i].createTime,
              })
            }
            this.users = tableData
            this.totalCount = response.data.data.pagination.total
          })
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      },
      editUser (item) {
        this.$refs.userEdit.dialogFormVisible = true
        this.$refs.userEdit.addFlag = false

        this.$refs.userEdit.form = {
          userId: item.id,
          username: item.username,
          name: item.name,
          phone: item.phone,
          email: item.email,
          enabled: item.enabled,
          address: item.address,
          type: item.type,
          // custAcct: item.custAcct,
        }
      },
      handleCreate() {
        // this.resetTemp()
        // this.dialogStatus = 'create'
        this.$refs.userEdit.addFlag = true
        this.$refs.userEdit.dialogFormVisible = true
      },
      handleFilter() {
          var that = this
          this.axios
              .get('/7979/user/findAllUserByUsername', {
                  params: {
                      keyword: this.listQuery.username,
                      pageNum: this.currentPage,
                      pageSize: this.pagesize
                  }
              })
              .then(response => {
                  let responseData = response.data.data.UserList
                  let tableData = []
                  for (var i in responseData) {
                      tableData.push({
                          id: responseData[i].userId,
                          username: responseData[i].userName,
                          name: responseData[i].realName,
                          phone: responseData[i].teleNum,
                          email: responseData[i].email,
                          enabled: responseData[i].userStatus,
                          type: responseData[i].userType,
                          address: responseData[i].address,
                          createTime: responseData[i].createTime,
                      })
                  }
                  this.users = tableData
                  this.totalCount = response.data.data.pagination.total
              })
              .catch(function (error) { // 请求失败处理
                  console.log(error)
              })
      },
      handleReset() {
        this.listQuery.username = ''
      },
      deleteUser (item) {
          var that = this
          that.$alert('确定删除用户吗？', '删除', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              that.axios
                  .post('/7979/user/deleteUser?userId=' + item.id).then(resp => {
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
