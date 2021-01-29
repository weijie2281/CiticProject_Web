<template>
  <div class="accountDetail">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="go_back" @click="goBack()">返回上一页</span>
        <div class="title">账户基本信息</div>
        <!--<span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="detailBox">
        <el-form label-position="right" class="el-form" ref="DetailForm" :model="DetailForm" :inline="true"
                 label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="账户类型 :" prop="acctType">
                <span>{{DetailForm.acctType}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户号 :" prop="custNum">
                <span>{{DetailForm.custNum}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户名称 :" prop="custName">
                <span>{{DetailForm.custName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户账号 :" prop="custAcct">
                <span>{{DetailForm.custAcct}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="账号序号 :" prop="acctSqNum">
                <span>{{DetailForm.acctSqNum}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="币种 :" prop="ccyCode">
                <span>{{DetailForm.ccyCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="账户性质 :" prop="acctAttr">
                <span>{{DetailForm.acctAttr}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户状态 :" prop="acctStatus">
                <span>{{DetailForm.acctStatus}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构名称 :" prop="UnitCode">
                <span>{{DetailForm.test}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上次更新时间 :" prop="lastUpdate">
                <span>{{DetailForm.lastUpdate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="余额 :" prop="acctBalc">
                <span>{{DetailForm.acctBalc}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户日期 :" prop="opactDate">
                <span>{{DetailForm.opactDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>


  </div>
</template>

<script>
  export default {
    name: "AccountDetail",
    data() {
      return {
        // 上一级数据
        formData: JSON.parse(sessionStorage.getItem('detail')),
        // 页面显示数据
        DetailForm: {
          acctType: '',
          custNum: '',
          custName: '',
          custAcct: '',
          acctSqNum: '',
          ccyCode: '',
          acctAttr: '',
          acctStatus: '',
          UnitCode: '',
          lastUpdate: '',
          acctBalc: '',
          opactDate: '',
        }
      }
    },
    created() {
      console.log('this.DetailForm',this.formData);
      this.getFormData();
    },
    methods: {
      goBack() {
        // 返回上一页
        this.$route.back();
      },
      getFormData(){



      }
    }
  }
</script>

<style scoped>
  .accountDetail {
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
  }

  .title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
  }

  .go_back {
    float: right;
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    margin: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 20px;

  }

  .detailBox {
    margin: 20px;
    padding-left: 50px;

  }

  .el-form {
    /*width: 50%;*/
  }

  .el-form span {
    text-align: left;
    font-size: 16px;
  }

</style>
