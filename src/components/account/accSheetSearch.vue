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
    <el-dialog title="数据预览" :visible.sync="isPreview" append-to-body width="80%">
      <h3 class="mb15">
        <span class="mr15">
          客户账号:
          <span class="totalRevenue">{{tableData.custAcct}}</span>
        </span>
        <span class="mr15">
          客户名称:
          <span class="totalRevenue">{{tableData.custName}}</span>
        </span>
      </h3>
      <el-table id="table" :data="tableData.statement" border style="width: 100%;margin-bottom:20px;">
        <el-table-column prop="balanceId" label="余额ID" align="center" sortable :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="acctId" label="账户ID" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="140px" align="center" sortable :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="tradeInMoney" label="转入金额" align="center" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: green;">+{{scope.row.tradeInMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeOutMoney" label="转出金额" align="center" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: red;">-{{scope.row.tradeOutMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalRevenue" label="收入总额" align="center" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: green;">+{{scope.row.totalRevenue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalExpenditure" label="支出总额" align="center" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: red;">-{{scope.row.totalExpenditure}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="acctBalc" label="余额" align="center" sortable></el-table-column>
        <el-table-column prop="updateTime" label="改变时间" width="140px" align="center" sortable></el-table-column>
        <el-table-column prop="tradeDescription" label="交易描述" align="center" :show-overflow-tooltip="true"></el-table-column>
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
        tableData: {
//          statement: [{
//            acctBalc: 123.000,
//            acctId: '2',
//            acctSqnum: '000001',
//            balanceFlag: 0,
//            balanceId: '1',
//            tradeInMoney: 123.000,
//            tradeOutMoney: 1.000,
//            tradeDescription: '无',
//            createTime: 1557238891,
//            custAcct: '222222',
//            totalExpenditure: 100.000,
//            totalRevenue: 20.000,
//            updateTime: 1557238891
//          },
//            {
//              acctBalc: 124.000,
//              acctId: '2',
//              acctSqnum: '000001',
//              balanceFlag: 1,
//              balanceId: '2',
//              createTime: 1557238891,
//              custAcct: '222222',
//              totalExpenditure: 25.000,
//              totalRevenue: 2.000,
//              updateTime: 1557238891,
//              tradeInMoney: 123.000,
//              tradeOutMoney: 1.000,
//              tradeDescription: '',
//            }],
//          custNum: '22222',
//          custAcct: '222222',
//          custName: 'test'
        }
      }
    },
    methods: {
      formatDate(row, column) {
        if (row && row != "") {
          var date = row.length === 10 ? new Date(row * 1000) : new Date(row);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          return Y + M + D + h + m + s;
        }
        return "-";
      },
      moneyFormat(money) { //金额三位加,
        if (money && money != null) {
          money = String(money);
          var left = money.split('.')[0], right = money.split('.')[1];
          right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
          var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
          return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
        } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
          return '0.00';
        } else {
          return '';
        }
      },
      accNoFormat(str) { //账号四位空格
        if (!str) return str
        let s = ''
        for (let i = 0, len = str.length; i < len; i++) {
          if (i !== 0 && i % 4 === 0) {
            s = s + ' '
          }
          s = s + str[i]
        }
        return s
      },
      //查询
      search() {
        if (this.tableDataName == '') {
          this.$message.warning('查询条件不能为空！')
          return
        } else {
          //调查询接口TODO
          this.axios
            // .post('/crud/account/statement', {"custAcct": this.tableDataName})
            .post('/7979/account/statement', {"custAcct": this.tableDataName})
            .then(resp => {
              // if (resp && resp.status === 200) {
              if (resp && resp.data.code === 200) {
                this.tableData = resp.data.data
                this.tableData.custAcct = this.tableData.custAcct.replace(/s*/g, '')
                if (this.tableData.custAcct === this.tableDataName) {
                  this.tableData.custAcct = this.accNoFormat(this.tableData.custAcct) //客户账号
                  this.tableData.statement.forEach((value, index) => {
                    value.createTime = this.formatDate(value.createTime) //创建时间
                    value.updateTime = this.formatDate(value.updateTime) //创建时间
                    value.acctBalc = this.moneyFormat(value.acctBalc) //余额
                    value.totalExpenditure = this.moneyFormat(value.totalExpenditure) //支出总额
                    value.totalRevenue = this.moneyFormat(value.totalRevenue) //收入总额
                    value.tradeInMoney = this.moneyFormat(value.tradeInMoney) //转入金额
                    value.tradeOutMoney = this.moneyFormat(value.tradeOutMoney) //转出金额
                  })
                  this.isPreview = true
                } else {
                  this.$message.warning('没有数据')
                  return
                }
              } else {
                console.log('----获取数据失败----')
                this.$message.warning(resp.data.message);
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
//        if (this.tableDataName == '') {
//          this.$message.warning('查询条件不能为空！')
//          return
//        } else {
//          //调查询接口TODO
//          if (this.tableData.custAcct === this.tableDataName) { //搜索到该字段
//            this.tableData.custAcct = this.accNoFormat(this.tableData.custAcct) //客户账号
//            this.tableData.statement.forEach((value, index) => {
//              value.createTime = this.formatDate(value.createTime) //创建时间
//              value.updateTime = this.formatDate(value.updateTime) //创建时间
//              value.acctBalc = this.moneyFormat(value.acctBalc) //余额
//              value.totalExpenditure = this.moneyFormat(value.totalExpenditure) //支出总额
//              value.totalRevenue = this.moneyFormat(value.totalRevenue) //收入总额
//              value.tradeInMoney = this.moneyFormat(value.tradeInMoney) //转入金额
//              value.tradeOutMoney = this.moneyFormat(value.tradeOutMoney) //转出金额
//            })
//            this.isPreview = true
//          } else {
//            this.$message.warning('没有数据')
//            return
//          }
//        }
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
</style>
