<template>
  <div class="table_class">
    <el-table
      :data="roles"
      stripe>
      <el-table-column
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名"
        fit>
      </el-table-column>
      <el-table-column
        prop="nameZh"
        label="角色描述"
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
    <role-edit @onSubmit="getTableData()" ref="roleEdit"></role-edit>
  </div>
</template>

<script>
  import RoleEdit from './RoleEdit'
  export default {
    name: 'UserRole',
    components:{RoleEdit},
    data () {
      return {
        roles: [],
      }
    },
    created () {
      this.getTableData()
    },
    methods: {
      getTableData () {
        var that = this
        this.axios
          .get('/crud/admin/role')
          .then(response => {
            let responseData = response.data
            let tableData = []
            for (var i in responseData) {
              tableData.push({
                id: responseData[i].id,
                name: responseData[i].name,
                nameZh: responseData[i].nameZh,
                permissions: responseData[i].permissions,
                menus: responseData[i].menus,
              })
              // console.log(responseData[i].roles)
            }
            this.roles = tableData
          })
          .catch(function (error) { // 请求失败处理
            that.$message.warning('没有权限')
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
      }
    }
  }
</script>

<style scoped>

</style>

