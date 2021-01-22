<template>
  <div>
    <!--    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
    <el-dialog
      title="添加账户"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="账户Id" :label-width="formLabelWidth" prop="acctId">
          <el-input v-model="form.acctId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" :label-width="formLabelWidth" prop="custName">
          <el-input v-model="form.custName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" :label-width="formLabelWidth" prop="acctType">
          <el-input v-model="form.acctType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户号" :label-width="formLabelWidth" prop="custNum">
          <el-input v-model="form.custNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户账号" :label-width="formLabelWidth" prop="custAcct">
          <el-input v-model="form.custAcct" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="币种" :label-width="formLabelWidth" prop="ccyCode">
          <el-input v-model="form.ccyCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户状态" :label-width="formLabelWidth" prop="acctStatus">
          <el-input v-model="form.acctStatus" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构号" :label-width="formLabelWidth" prop="unitCode">
          <el-input v-model="form.unitCode" autocomplete="off"></el-input>
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
        name: 'AccountEdit',
        components: {},
        data () {
            return {
                dialogFormVisible: false,
                form: {
                    acctId: '',
                    custName: '',
                    acctType: '',
                    custNum: '',
                    custAcct: '',
                    acctSqnum: '',
                    ccyCode: '',
                    acctAttr: '',
                    acctStatus: '',
                    unitCode: '',
                    lastUpdate: '',
                    acctBalc: '',
                    opactDate: '',
                },
                formLabelWidth: '120px'
            }
        },
        created () {
        },
        methods: {
            clear () {
                this.form = {
                    acctId: '',
                    custName: '',
                    acctType: '',
                    custNum: '',
                    custAcct: '',
                    acctSqnum: '',
                    ccyCode: '',
                    acctAttr: '',
                    acctStatus: '',
                    unitCode: '',
                    lastUpdate: '',
                    acctBalc: '',
                    opactDate: '',
                }
            },
            onSubmit () {
                var that = this
                this.axios
                    .post('/7979/user/add', {
                        acctId: this.form.acctId,
                        custName: this.form.custName,
                        acctType: this.form.acctType,
                        custNum: this.form.custNum,
                        custAcct: this.form.custAcct,
                        // acctSqnum: this.form.acctSqnum,
                        acctSqnum: '11',
                        ccyCode: this.form.ccyCode,
                        // acctAttr: this.form.acctAttr,
                        acctAttr: '11',
                        acctStatus: this.form.acctStatus,
                        unitCode: this.form.unitCode,
                        // lastUpdate: this.form.lastUpdate,
                        lastUpdate: '11',
                        // acctBalc: this.form.acctBalc,
                        acctBalc: '11',
                        // opactDate: this.form.opactDate,
                        opactDate: '11',
                        password: '11',
                        salt: '11',
                    }).then(resp => {
                    if (resp && resp.data.code === 200) {
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


