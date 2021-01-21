<template>
  <div class="table_class">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-class">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-input v-model="listQuery.permissionName" placeholder="菜单名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      :data="permissionData"
      border
      stripe>
      <el-table-column
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="权限名"
        fit>
      </el-table-column>
      <el-table-column
        prop="desc"
        label="权限描述"
        fit>
      </el-table-column>
      <el-table-column
        prop="url"
        label="权限url"
        fit>
      </el-table-column>

      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small" @click="editRole(scope.row)">
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
    <role-edit @onSubmit="getTableData()" ref="roleEdit"></role-edit>
  </div>
</template>

<script>
  import RoleEdit from './RoleEdit'
  export default {
    name: 'PermissionManagement',
    components:{RoleEdit},
    data () {
      return {
        permissionData: [],
        tableData: [],
        // 默认每页数据量
        pagesize: 5,
        // 当前页码
        currentPage: 1,
        // 查询的页码
        start: 1,
        // 默认数据总数
        totalCount: 20,

        listLoading: true,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['启用', '禁用'],
        listQuery: {
          page: 1,
          limit: 20,
          permissionName: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
      }
    },
    created () {
      this.getTableData()
    },
    methods: {
      getTableData () {
        var that = this
        this.axios
          .get('/crud/admin/permission')
          .then(response => {
            let responseData = response.data
            let tableData = []
            for (var i in responseData) {
              tableData.push({
                id: responseData[i].id,
                name: responseData[i].name,
                desc: responseData[i].desc,
                url: responseData[i].url,
              })
              // console.log(responseData[i].roles)
            }
            this.permissionData = tableData
          })
          .catch(function (error) { // 请求失败处理
            that.$message.warning('error')
            console.log(error)
          })
      },
      editRole (item) {
        this.$refs.roleEdit.dialogFormVisible = true
        // console.log(item.username)
        let permissionIds = []
        for (let i = 0; i < item.permissions.length; i++){
          permissionIds.push(item.permissions[i].id)
        }
        let menuIds = []
        for (let i = 0; i < item.menus.length; i++) {
          menuIds.push(item.menus[i].id)
          for (let j = 0; j < item.menus[i].children.length; j++) {
            menuIds.push(item.menus[i].children[j].id)
          }
        }
        // console.log(item.roles)
        this.$refs.roleEdit.form = {
          id: item.id,
          name: item.name,
          nameZh: item.nameZh,
          selectedPermissionsIds: permissionIds,
          selectedMenusIds: menuIds,
        }
        // if (this.$refs.roleEdit.$refs.tree) {
        //   this.$refs.roleEdit.$refs.tree.setCheckedKeys(menuIds)
        // }
      },
      handleCreate() {
        // this.resetTemp()
        // this.dialogStatus = 'create'
        this.$refs.roleEdit.dialogFormVisible = true
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

