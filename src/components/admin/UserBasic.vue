<template>
  <div class="table_class">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-class">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
<!--      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
<!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
<!--      </el-select>-->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
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
            size="small">
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
      }
    },
    created () {
      this.getTableData()
    },
    methods: {
      getTableData () {
        var that = this
        this.axios
          .get('/crud/admin/user')
          .then(response => {
            let responseData = response.data
            let tableData = []
            for (var i in responseData) {
              tableData.push({
                id: responseData[i].id,
                username: responseData[i].username,
                name: responseData[i].name,
                phone: responseData[i].phone,
                email: responseData[i].email,
                enabled: responseData[i].enabled,
                roles: responseData[i].roles,
              })
              // console.log(responseData[i].roles)
            }
            this.users = tableData
          })
          .catch(function (error) { // 请求失败处理
            // that.$message.warning('没有权限')
            that.$router.replace('/401')
            console.log(error)
          })
      },
      editUser (item) {
        this.$refs.userEdit.dialogFormVisible = true
        // console.log(item.username)
        let roleIds = []
        for (let i = 0; i < item.roles.length; i++){
          roleIds.push(item.roles[i].id)
        }
        console.log(item.roles)
        this.$refs.userEdit.form = {
          id: item.id,
          username: item.username,
          name: item.name,
          phone: item.phone,
          email: item.email,
          enabled: item.enabled,
          selectedRolesIds: roleIds,
        }
      },
      handleCreate() {
        // this.resetTemp()
        // this.dialogStatus = 'create'
        this.$refs.userEdit.dialogFormVisible = true
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
