<template>
  <div>
    <!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
<!--          <span v-model="form.username"></span>-->
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="form.selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.nameZh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="enabled" style="height: 0">
          <el-input type="hidden" v-model="form.enabled" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'UserEdit',
    components: {},
    data () {
      return {
        dialogFormVisible: false,
        roles: '',
        form: {
          id: '',
          username: '',
          name: '',
          phone: '',
          email: '',
          enabled: '',
          selectedRolesIds: '',
        },
        formLabelWidth: '120px'
      }
    },
    created () {
      this.getRolesData()
    },
    methods: {
      clear () {
        this.form = {
          id: '',
          username: '',
          name: '',
          phone: '',
          email: '',
          enabled: '',
          selectedRolesIds: '',
        }
      },
      getRolesData () {
        this.axios
          .get('/crud/admin/role')
          .then(resp => {
          if (resp && resp.status === 200) {
            this.roles = resp.data
          }
        })
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      },
      onSubmit () {
        var that = this
        let roles = []
        for (let i = 0; i < this.form.selectedRolesIds.length; i++) {
          for (let j = 0; j < this.roles.length; j++) {
            if (this.form.selectedRolesIds[i] === this.roles[j].id) {
              roles.push(this.roles[j])
            }
          }
        }
        this.axios
          .post('/crud/updateUser', {
            id: this.form.id,
            username: this.form.username,
            name: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            enabled: this.form.enabled,
            roles: roles
          }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
          .catch(function (error) { // 请求失败处理
            console.log(error)
            that.$message.warning('失败')
          })
      }
    }
  }
</script>

<style scoped>
  .el-icon-circle-plus-outline {
    /*position: absolute;*/
    margin: 50px 0 0 20px;
    font-size: 100px;
    float: left;
    cursor: pointer;
  }
</style>


