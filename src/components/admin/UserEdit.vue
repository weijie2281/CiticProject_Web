<template>
  <div>
    <!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="员工编号" :label-width="formLabelWidth" prop="userId">
          <el-input v-model="form.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户账号" :label-width="formLabelWidth" prop="custAcct">
          <el-input v-model="form.custAcct" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="角色分配" label-width="120px" prop="roles">-->
<!--          <el-checkbox-group v-model="form.selectedRolesIds">-->
<!--            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.nameZh}}</el-checkbox>-->
<!--          </el-checkbox-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item prop="id" style="height: 0">-->
<!--          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
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
        form: {
          userId: '',
          username: '',
          name: '',
          phone: '',
          email: '',
          enabled: '',
          address: '',
          custAcct: '',
          type: '',
        },
        addFlag: true,
        formLabelWidth: '120px',
        options: [{
            value: 0,
            label: '普通用户'
        }, {
            value: 1,
            label: '管理员'
        }],
      }
    },
    created () {
    },
    methods: {
      clear () {
        this.form = {
          userId: '',
          username: '',
          name: '',
          phone: '',
          email: '',
          enabled: '',
          address: '',
          custAcct: '',
          type: '',
        }
      },
      onSubmit () {
        var that = this

        if (this.addFlag == true) {
            this.axios
                .post('/7979/login/register', {
                    userId: this.form.userId,
                    userName: this.form.username,
                    password: "123",
                    realName: this.form.name,
                    email: this.form.email,
                    teleNum: this.form.phone,
                    userType: this.form.type,
                    // userStatus: this.form.enabled,
                    address: this.form.address,
                    custAcct: this.form.custAcct
                })
                .then(resp => {
                    if (resp.data.code === 200) {
                        this.$emit('onSubmit')
                        this.dialogFormVisible = false
                        this.$alert('添加用户成功', '提示', {
                            confirmButtonText: '确定'
                        })
                    } else {
                        this.$alert('添加用户失败', '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                    // this.dialogFormVisible = false
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error)
                })

        } else {
            this.axios
                .post('/7979/user/update', {
                    userId: this.form.userId,
                    userName: this.form.username,
                    realName: this.form.name,
                    email: this.form.email,
                    teleNum: this.form.phone,
                    userType: this.form.type,
                    // userStatus: this.form.enabled,
                    address: this.form.address,
                    custAcct: this.form.custAcct
                })
                .then(response => {
                    if (response.data.code === 200) {
                        this.$emit('onSubmit')
                        this.dialogFormVisible = false
                        this.$message.success("更新成功")
                    }
                    else {
                        this.$message.warning(response.data.msg)
                    }
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error)
                })
        }

        // this.axios
        //     .post('/7979/login/register', {
        //         userId: this.form.userId,
        //         userName: this.form.username,
        //         password: "123",
        //         realName: this.form.name,
        //         email: this.form.email,
        //         teleNum: this.form.phone,
        //         // userStatus: this.form.enabled,
        //         address: this.form.address,
        //         custAcct: this.form.custAcct
        //     })
        //     .then(resp => {
        //         if (resp.data.code === 200) {
        //             this.$alert('添加用户成功', '提示', {
        //                 confirmButtonText: '确定'
        //             })
        //         } else {
        //             this.$alert(resp.data.msg, '提示', {
        //                 confirmButtonText: '确定'
        //             })
        //         }
        //         this.dialogFormVisible = false
        //     })
        //     .catch(function (error) { // 请求失败处理
        //         console.log(error)
        //     })
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


