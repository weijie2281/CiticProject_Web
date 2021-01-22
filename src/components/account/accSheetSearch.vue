<template>
  <div class="accountInfoSearch">
    <header>对账单查询</header>
    <div style="margin: 100px 0;text-align: center;">
      <span class="cRed">*</span>
      <label style="margin-right:10px;font-size:16px;">账号</label>
      <el-input clearable prefix-icon="el-icon-search" v-model="tableDataName" maxlength="19" placeholder="请输入账号" style="width:280px;margin-right:30px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search" round>查询</el-button>
      <el-button type="warning" icon="el-icon-refresh-left" @click="reset" round>重置</el-button>
    </div>
    <!-- <div style="margin: 100px; text-align: center;" v-if="tableDataEnd.length == 1">
      <el-button type="primary" icon="el-icon-view" @click="submitPreview" round>预 览</el-button>
      <el-button type="info" icon="el-icon-download" @click="output" round>导出</el-button>
    </div>
    <div v-else>
      <div style="margin: 100px; font-size: 20px; text-align: center;">没有查到相关数据</div>
    </div>-->
    <el-dialog title="数据预览" :visible.sync="isPreview" append-to-body width="80%">
      <h3 class="mb15">
        <span class="mr15">
          收入总额:
          <span class="totalRevenue">{{tableData[0].totalRevenue}}</span>
        </span>
        <span class="mr15">
          支出总额:
          <span class="totalExpenditure">{{tableData[0].totalExpenditure}}</span>
        </span>
      </h3>
      <el-table id="table" :data="tableData" border style="width: 100%;margin-bottom:20px;">
        <el-table-column prop="balanceID" label="余额ID" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="accID" label="账户ID" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="tradeInMoney" label="转入金额" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: green;">{{scope.row.tradeInMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeOutMoney" label="转出金额" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: red;">{{scope.row.tradeOutMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalRevenue" label="收入总额" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: green;">{{scope.row.totalRevenue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalExpenditure" label="支出总额" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: red;">{{scope.row.totalExpenditure}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="acctBalc" label="余额" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="updateTime" label="改变时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <div style="overflow:hidden;">
        <el-button type="info" @click="output" round style="float:right;">导出</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        isPreview: false,
        tableDataName: '',
        tableData: [
          {
            balanceID: '客户1',
            accID: '123',
            createTime: '12345',
            tradeInMoney: '客户1',
            tradeOutMoney: '王小虎',
            totalRevenue: '12345',
            totalExpenditure: '客户1',
            acctBalc: '12345',
            updateTime: '客户1'
          }
        ]
      }
    },
    methods: {
      //查询
      search() {
        if (this.tableDataName == '') {
          this.$message.warning('查询条件不能为空！')
          return
        } else {
          //调查询接口TODO
          if (this.tableData[0].accID === this.tableDataName) {
            this.isPreview = true
          } else {
            this.$message.warning('没有数据')
            return
          }
        }
      },
      //重置
      reset() {
        this.tableDataName = ''
      },
      //导出excel表格
      output() {
        var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '对账单.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      }
    }
  }
</script>

<style>
  .accountInfoSearch {
    padding: 100px;
  }
  .accountInfoSearch header {
    margin-bottom: 30px;
    text-align: center;
    font-size: 26px;
  }
  .cRed {
    color: red;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .mr15 {
    margin-right: 15px;
  }
  .totalRevenue {
    margin-left: 15px;
    color: red;
  }
  .totalExpenditure {
    margin-left: 15px;
    color: green;
  }
</style>
