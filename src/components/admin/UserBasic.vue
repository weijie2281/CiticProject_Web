<template>
  <div class="table_class">
    <el-table
      :data="users"
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
        // value2: 1
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
            that.$message.warning('没有权限')
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
      }
    }
  }
</script>

<style scoped>

</style>
