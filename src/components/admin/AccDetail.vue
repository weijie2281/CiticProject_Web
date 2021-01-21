<!--账户交易明细查询页-->
<template>
  <div class="table_class">

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-class">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>账户交易明细</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="filter-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item prop="accNo" label="账号" class="filter-item" required>
          <el-input type="number" v-model="ruleForm.accNo" maxlength="20" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="startDate" class="filter-item" label="开始日期" required>
          <el-date-picker v-model="ruleForm.startDate" value-format="yyyy-MM-dd" type="date" placeholder="开始日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate" class="filter-item" label="结束日期" required>
          <el-date-picker v-model="ruleForm.endDate" value-format="yyyy-MM-dd" type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button type="primary" @click="query()">查询</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
          <el-button type="warning" icon="el-icon-download" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--查询结果表-->
    <div class="tableData mt20 printArea">
      <el-table  :data="perTableData">
        <el-table-column  label="交易时间" prop="depTerm"></el-table-column>
        <el-table-column  label="收入（贷）" prop="tranAMT_C"> </el-table-column>
        <el-table-column  label="支出（借）" prop="tranAMT_D"></el-table-column>
        <el-table-column  label="余额" prop="tranBal">
          <template scope="scope">
                  <span>{{$tools.utils.currencyFormat(scope.row.tranBal)}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="对方账户" prop="qteAcctTPNo"></el-table-column>
        <el-table-column  label="对方户名" prop="recipAccoName"></el-table-column>
        <el-table-column  label="交易类型" prop="tranTP"></el-table-column>
      </el-table>
      <div class="tar mt10" v-if="monryTotal">
        <span style="color:#f18e00;" >总收入：{{inSumMoney}}</span>
        <span style="color:#f18e00;" >&nbsp&nbsp&nbsp总支出：{{outSumMoney}}</span>
      </div>
    </div>
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
  </div>

</template>
<script>
  export default {
    name: 'AccDetailQuery',
    components: {  },
    data() {
      return {
        form: {
          accNo: "",
          starDate: "",
          endDate: "",
        },
          transDetailList: [],
          downloadLoading: false,
          filename: '',
          autoWidth: true,
          ruleForm: {
              accNo: '',
              exportFormat:'',
              startDate:'',
              endDate:''
          },
          rules:{
              accNo: [{ required: true, message: '请输入账号', trigger: 'blur' }],
              exportFormat:[{ required: true, message: '请选择导出格式', trigger: 'change' }],
              startDate: [{required: true, validator:this.startDate}],
              endDate: [{required: true, validator:this.endDate}],
          },
          exportFormatOpt: [
              {value:'excel',label:'0'},
              {value:'pdf',label:'1'},
              {value:'csv',label:'2'}],
          // 默认每页数据量
          pagesize: 5,
          // 当前页码
          currentPage: 1,
          // 查询的页码
          start: 1,
          // 默认数据总数
          totalCount: 20,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async query() {
          this.parames.accNo = this.ruleForm.accNo
          this.parames.startDate = this.ruleForm.startDate,
              this.parames.endDate = this.ruleForm.endDate
          try {
              const res = await this.axios.get('/crud/admin/acc', { /////////////////////////////////////////////////
                  params: this.parames
              })
              if (res && res.status === 200) {
                  this.transDetailList = res.data.list
                  this.listLoading = false
                  /////////////////////////
                  // ///////////////////////////////////////////////////////////////遍历
              }
          } catch (err) {
              console.error(err)
          }

      },
      reset() {
          this.ruleForm = {
              accNo: '',
              exportFormat:'',
              startDate:'',
              endDate:''
          }
      },
      /** 查询账户列表 */
      async getList() {
        this.listLoading = true
        //发送请求获取账户列表数据
        const { res: data } = await this.$http.get('users', {
          params: this.queryParams})
          .then(response => {
            this.listLoading = false
            this.accList = res.data.users
            this.total = response.data.data.records
            this.listLoading = false
          })
          .catch(() => {
            this.accList = []
            this.total = 0
            this.listLoading = false
          })
      },
      //校验
      startDate (rule, value, callback) {
          if (!value) {
              callback(new Error('起始日期不能为空！'));
          } else { // 如果结束日期没选，cb
              if (!this.ruleForm.endDate) {
                  callback()
              } else { // 结束日期有，进行判断
                  if (this.compareDate(value, this.ruleForm.endDate)) { // 如果起始在结束之前
                      callback()
                  } else {
                      callback(new Error('起始日期不能在结束日期之后，请重新选择'))
                  }
              }
          }
      },
      endDate (rule, value, callback) {
          if (!value) {
              callback(new Error('结束日期不能为空！'));
          } else {
              if (!this.ruleForm.startDate) {
                  callback()
              } else { // 有起始日期
                  if (this.compareDate(this.ruleForm.startDate, value)) {
                      callback()
                  } else {
                      callback(new Error('结束日期不能在起始日期之前，请重新选择'))
                  }
              }
          }
      },
      //比较两个日期  start 起始日期 end   结束日期 @returns {boolean} true|false
      compareDate (start, end) {
          return new Date(end).getTime() > new Date(start).getTime()
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
