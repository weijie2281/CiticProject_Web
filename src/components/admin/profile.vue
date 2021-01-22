<template>
  <div class="table_class">
    <div class="profile-header">
      <h1>个人信息</h1>
    </div>
    <div class="profile-container">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="员工编号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off" :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off" :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="账户" :label-width="formLabelWidth" prop="custAcct">
          <el-input v-model="form.custAcct" autocomplete="off" :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off" :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off" :disabled="!editFlag"></el-input>
        </el-form-item>
<!--        <el-form-item label="角色分配" label-width="120px" prop="roles">-->
<!--          <el-checkbox-group v-model="form.selectedRolesIds">-->
<!--            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.nameZh}}</el-checkbox>-->
<!--          </el-checkbox-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item prop="id" style="height: 0">-->
<!--          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item prop="enabled" style="height: 0">-->
<!--          <el-input type="hidden" v-model="form.enabled" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item style="float: right">
          <el-button type="primary" @click="editProfile" v-if="!editFlag">修改个人信息</el-button>
          <el-button type="warning" @click="saveProfile" v-if="editFlag">保存</el-button>
          <el-button type="primary" @click="editPassword">修改密码</el-button>
        </el-form-item>
      </el-form>
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="onSubmit">确 定</el-button>-->
<!--      </div>-->
      <el-dialog
        title="修改密码"
        :visible.sync="dialogFormVisible"
        @close="clear">
        <el-form v-model="form" style="text-align: left" ref="dataForm">
<!--          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">-->
<!--            <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="旧密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
            <el-input v-model="form.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import RoleEdit from './RoleEdit'
    export default {
        name: 'profile',
        components:{RoleEdit},
        data () {
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    id: '',
                    username: '',
                    name: '',
                    phone: '',
                    email: '',
                    enabled: '',
                    userType: '',
                    userStatus: '',
                    custAcct: '',
                    address: '',
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                },
                formLabelWidth: '120px',
                editFlag: false
            }
        },
        created () {
            this.getTableData()
        },
        methods: {
            getTableData () {
                var that = this
                console.log("123131", this.$store.state.user.userId)
                this.axios
                    .post('/7979/user/profile/' + this.$store.state.user.username)
                    .then(response => {
                        let responseData = response.data.data
                        // console.log(responseData)
                        this.form.id = responseData.userId,
                        this.form.username = responseData.userName,
                        this.form.email = responseData.email,
                        this.form.phone = responseData.teleNum,
                        this.form.name = responseData.realName
                        this.form.custAcct = responseData.custAcct,
                        this.form.address = responseData.address
                    })
                    .catch(function (error) { // 请求失败处理
                        that.$message.warning('error')
                        console.log(error)
                    })
            },
            savePassword () {
                var _this = this
                this.axios
                    .post('/7979/user/setting?password=' + this.form.password + '&newPassword=' + this.form.newPassword + '&confirmPassword=' + this.form.confirmPassword)
                    .then(response => {
                        if (response.data.code === 200) {
                            _this.dialogFormVisible = false;
                            _this.$message.warning("更新成功")
                        }
                        else {
                            _this.$message.warning(response.data.msg)
                        }
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error)
                    })
            },
            editProfile () {
                this.editFlag = true;
            },
            saveProfile () {
                var _this = this
                this.axios
                    .post('/7979/user/update', {
                        userId: this.form.id,
                        userName: this.form.username,
                        email: this.form.email,
                        teleNum: this.form.phone,
                        realName: this.form.name,
                        custAcct: this.form.custAcct,
                        address: this.form.address
                    })
                    .then(response => {
                        if (response.data.code === 200) {
                            _this.editFlag = false;
                            _this.$message.warning("更新成功")
                        }
                        else {
                            _this.$message.warning(response.data.msg)
                        }
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error)
                    })
                // this.editFlag = false;
            },
            editPassword () {
                this.dialogFormVisible = true;
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
        }
    }
</script>

<style scoped>

</style>

