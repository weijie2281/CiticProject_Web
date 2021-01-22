<template>
  <div class="searchBar">
    <el-form class="el-form" :rules="ruleForm" ref="form" :model="form" label-width="90px"
             label-position="left">
      <el-row :gutter="24">
        <el-col :span="16">
          <el-form-item label="交易流水号" prop="tradeNum">
            <el-input
              prefix-icon="el-icon-search"
              v-model="form.tradeNum"
              placeholder="请输入交易流水号"
              clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="转入账号" prop="tradeInAccNum">
            <el-input
              prefix-icon="el-icon-search"
              v-model="form.tradeInAccNum"
              placeholder="请输入转入账号"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转出账号" prop="tradeOutAccNum">
            <el-input
              prefix-icon="el-icon-search"
              v-model="form.tradeOutAccNum"
              placeholder="请输入转出账号"
              clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <el-form-item label="交易日期" prop="startTradeTime">
            <el-date-picker
              type="date"
              placeholder="请选择开始日期"
              v-model="form.startTradeTime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsStart"
              style="width: 200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="至" prop="endTradeTime" label-width="25px">
            <el-date-picker
              type="date"
              placeholder="请选择结束日期"
              v-model="form.endTradeTime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsEnd"
              style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <el-form-item label="金额范围" prop="startMoney">
            <el-input v-model="form.startMoney"
                      placeholder="0.00"
                      clearable
                      style="width: 200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="至" prop="endMoney" label-width="25px">
            <el-input v-model="form.endMoney" placeholder="0.00" clearable style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button size="middle" type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
        <el-button size="middle" type="primary" icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--  excel导出按钮  -->
        <el-button size="middle" type="primary" @click="onExport">导出EXCEL</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: "TradeSearch",
    data() {
      var validateAcc = (rule, value, callback) => {
        if (/[^\d]/g.test(value)) {
          this.$refs['form'].resetFields();
          return callback(new Error('只能输入数字'))
        }
      };
      var validateMoney = (rule, value, callback) => {
        if (!(/^\d+(\.(\d{0,2}))?$/g.test(value))) {
          this.$refs['form'].resetFields();
          return callback(new Error('只能输入整数和两位小数'))
        }
      };
      return {
        // 查询字段：交易流水号，转入账号，转出账号，交易时间，交易金额
        form: {
          tradeNum:'',
          tradeInAccNum:'',
          tradeOutAccNum:'',
          startTradeTime: '',
          endTradeTime: '',
          startMoney: '',
          endMoney: ''
        },
        ruleForm: {
          tradeInAccNum: [
            {validator: validateAcc, trigger: 'blur'}
          ],
          tradeOutAccNum: [
            {validator: validateAcc, trigger: 'blur'}
          ],
          startMoney: [
            {validator: validateMoney, trigger: 'blur'}
          ],
          endMoney: [
            {validator: validateMoney, trigger: 'blur'}
          ],
        },
        pickerOptionsStart: {
          disabledDate: time => {
            let endDateVal = this.form.endTradeTime;
            let endDate = new Date(endDateVal).getTime();
            if(endDateVal){
              return time.getTime()>endDate;
            }else{
              return time.getTime()>Date.now();
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let startDateVal = this.form.startTradeTime;
            let startDate = new Date(startDateVal).getTime();
            if(startDateVal){
              return time.getTime()>Date.now()||time.getTime()<startDate;
            }else{
              return time.getTime()>Date.now();
            }
          }
        }
      }
    },
    methods: {
      onSearch() {
        // 查询
        this.$emit('onSearch');
      },
      onReset() {
        // 重置
        this.$refs['form'].resetFields();
        this.$emit('onReset')
      },
      onExport() {
        // 导出excel
        this.$emit('onExport')
      }
    }
  }
</script>

<style scoped>
  .searchBar {

  }

  .el-form {
    width: 700px;
    padding: 20px;
    margin: auto;
  }
</style>
