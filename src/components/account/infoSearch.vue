<template>
  <div class="accountInfoSearch">
    <header>账户余额查询</header>
    <el-button type="info" icon="el-icon-download" @click="output" round style="float:left;">导出</el-button>
    <div style="margin-bottom:20px;float:right;">
      <span class="cRed">*</span>
      <label style="margin-right:10px;font-size:16px;">账号</label>
      <el-input clearable prefix-icon="el-icon-search" v-model="tableDataName" placeholder="请输入账号" type="number" maxlength="19" style="width:280px;margin-right:30px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search" round>查询</el-button>
      <el-button type="warning" icon="el-icon-refresh-left" @click="reset" round>重置</el-button>
    </div>
    <el-table id="table" :data="tableDataEnd" @selection-change="handleSelectionChange" border stripe fit highlight-current-row style="width: 100%;margin-bottom:20px;">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="custAcct" label="客户账号" width="180" align="center" sortable="true">
        <template slot-scope="scope">{{ scope.row.custAcct | accNoFormat}}</template>
      </el-table-column>
      <el-table-column prop="acctType" label="账户类型" align="center">
        <template slot-scope="scope" class="acctType">
          <el-tag v-if="scope.row.acctType == '0'" style="color: red">单位</el-tag>
          <el-tag v-else-if="scope.row.acctType == '1'" style="color: orange">个人</el-tag>
          <el-tag v-else style="color: green">企业</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ccyCode" label="币种" align="center"></el-table-column>
      <el-table-column prop="accAttr" label="账户性质" align="center" :formatter="accAttrformat"></el-table-column>
      <el-table-column prop="accBal" label="余额" align="center" sortable="true">
      </el-table-column>
      <el-table-column prop="last_update" label="上次更新时间" width="200" align="center" sortable="true">
        <template slot-scope="scope">{{ scope.row.last_update}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="accDetail(scope.row)" type="text" size="small">查看账户详情</el-button>
          <el-button @click="transDetail(scope.row)" type="text" size="small">查看交易详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalItems"></el-pagination>
    <!-- 查看详情 -->
    <el-dialog title="账户基本信息" align="center" :visible.sync="dialogCheckVisible">
      <el-form :model="rowInfo" label-width="80px">
        <el-form-item label="账户ID">
          <el-input v-model="rowInfo.accID" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户类型">
          <el-input v-model="rowInfo.accType" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户号">
          <el-input v-model="rowInfo.custNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="币种">
          <el-input v-model="rowInfo.ccyCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户性质">
          <el-input v-model="rowInfo.accAttr" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户状态">
          <el-input v-model="rowInfo.accStatus" disabled></el-input>
        </el-form-item>
        <el-form-item label="机构号">
          <el-input v-model="rowInfo.unitCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="上次更新时间">
          <el-input v-model="rowInfo.last_update" disabled></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="rowInfo.accBal" disabled></el-input>
        </el-form-item>
        <el-form-item label="开户时间">
          <el-input v-model="rowInfo.opactDate" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      tableDataBegin: [
        {
          acctID: '1',
          custAcct: '1234567888',
          acctType: 0,
          ccyCode: '123154567866768787987987878',
          accAttr: '0',
          accBal: '1233445.23',
          last_update: '1491559642000'
        },
        {
          acctID: '123154567866768787987987878',
          custAcct: '1234567888',
          acctType: 0,
          ccyCode: '123154567866768787987987878',
          accAttr: '1',
          accBal: '1233445.23',
          last_update: '1491559642000'
        },
        {
          acctID: '123154567866768787987987878',
          custAcct: '1234567888',
          acctType: 1,
          ccyCode: '123154567866768787987987878',
          accAttr: '2',
          accBal: '1233445.23',
          last_update: '1491559642000'
        },
        {
          acctID: '123154567866768787987987878',
          custAcct: '1234567888',
          acctType: 1,
          ccyCode: '123154567866768787987987878',
          accAttr: '3',
          accBal: '1233445.23',
          last_update: '1491559642000'
        },
        {
          acctID: '123154567866768787987987878',
          custAcct: '123154567866768787987987878',
          acctType: 1,
          ccyCode: '123154567866768787987987878',
          accAttr: '1',
          accBal: '1233445.23',
          last_update: '1491559642000'
        },
        {
          acctID: '123154567866768787987987878',
          custAcct: '123154567866768787987987878',
          acctType: 0,
          ccyCode: '123154567866768787987987878',
          accAttr: '2',
          accBal: '1233445.23',
          last_update: '1491559642000'
        },
        {
          acctID: '123154567866768787987987878',
          custAcct: '0',
          acctType: 0,
          ccyCode: '123154567866768787987987878',
          accAttr: '王小虎',
          accBal: '1233445.23',
          last_update: '1491559642000'
        }
      ],
      tableDataName: '',
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      dialogCheckVisible: false,
      dialogEditVisible: false,
      rowInfo: {},
      multipleSelection: []
    }
  },
  created() {
    this.axios
//      .post('/account/accountIndex')
//      .then(resp => {
//        if (resp && resp.code === 200) {
//          this.tableDataBegin = resp.data
//          this.totalItems = this.tableDataBegin.length
//          if (this.totalItems > this.pageSize) {
//            for (let index = 0; index < this.pageSize; index++) {
//              this.tableDataEnd.push(this.tableDataBegin[index])
//            }
//          } else {
//            this.tableDataEnd = this.tableDataBegin
//          }
//        } else {
//          console.log('----获取数据失败----')
//        }
//      })
//      .catch(function (error) {
//        console.log(error)
//      });
    this.totalItems = this.tableDataBegin.length
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index])
      }
    } else {
      this.tableDataEnd = this.tableDataBegin
    }
  },
  filters: {
    dateFormat(row, column) { //格式化时间戳/////////////////////////////////////////////////////////////////
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
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
    currencyTypeFormat(cryTypeCode) {
      let cryType = "_";
      switch (cryTypeCode) {
        case '0':
          cryType = "人民币"
          break
        case '1':
          cryType = "港元"
          break
        case '2':
          cryType = "美元"
          break
        case '3':
          cryType = "欧元"
          break
        case '4':
          cryType = "英镑"
          break
        case '5':
          cryType = "日元"
          break
        case '6':
          cryType = "新加坡币"
          break
      }
      return cryType
    }
  },
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    search() {
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tableDataEnd = []
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableDataBegin.forEach((value, index) => {
        if (value.custAcct) {
          if (value.custAcct.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      //页面数据改变重新统计数据数量和当前页
      this.currentPage = 1
      this.totalItems = this.filterTableDataEnd.length
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      //页面初始化数据需要判断是否检索过
      this.flag = true
    },
    handleCurrentChange(val) {
      this.currentPage = val
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataBegin)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    },
    //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize
      let to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
    },
    //重置
    reset() {
      this.tableDataName = ''
      this.totalItems = this.tableDataBegin.length
      this.tableDataEnd = []
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index])
        }
      } else {
        this.tableDataEnd = this.tableDataBegin
      }
      this.flag = false
    },
    //导出excel表格
    output() {
      console.log(this.multipleSelection)
      var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //查看
    accDetail(row) {
      this.rowInfo = row
      this.dialogCheckVisible = true
    },
    transDetail(row) {
      this.$router.push({name:'TradeMain', params:{'row': row}})
    },
    accAttrformat(row, column) {
      switch (row.accAttr) {
        case '0':
          return "基本账户";
          break;
        case '1':
          return "一般账户";
          break;
        case '2':
          return "I 类账户";
          break;
        default:
          return "II 类账户";
      }
    },
//    amountFormat(s, n) { //格式化金额，隔3位加，
//      if (!s) return ''
//      n = n > 0 && n <= 20 ? n : 2
//      if (s.indexOf('.') === -1) {
//        s = parseFloat((s + '').replace(/[^\d]/g, '')).toFixed(2) + ''
//      }
//      let l = s.split('.')[0].split('').reverse(),
//        r = s.split('.')[0],
//        t = ''
//      for (let i = 0; i < l.length; i++) {
//        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) != l.length ? ',' : '')
//      }
//      t = t.split('').reverse().join('')
//      return r ? t + '.' + r.substr(0, 2) : t
//    }
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
</style>
