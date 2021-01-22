<template>
  <div class="customerRecord">
    <header>客户档案</header>
    <div style="margin-bottom:20px;float:right;">
      <el-input v-model="tableDataName" placeholder="请输入客户名称" style="width:300px"></el-input>
      <el-button type="primary" @click="doFilter">搜索</el-button>
      <el-button type="primary" @click="addRow()" >新增</el-button>
    </div>
    <el-table :data="tableDataEnd" border style="width: 100%;margin-bottom:20px;">
      <el-table-column prop="num" label="序号" ></el-table-column>
      <el-table-column prop="name" label="客户名称" ></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="contact_information" label="联系方式"></el-table-column>
      <el-table-column prop="contact_place" label="联系地址"></el-table-column>
      <el-table-column prop="id_type" label="证件类型"></el-table-column>
      <el-table-column prop="id_no" label="证件号"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="checkRow(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" @click="editRow(scope.row)" size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalItems"></el-pagination>
    <!-- 查看详情 -->
    <el-dialog title="客户基本信息" align="center" :visible.sync="dialogCheckVisible">
      <el-form :model="rowInfo" label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model="rowInfo.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="rowInfo.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="rowInfo.contact_information" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="rowInfo.contact_place" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-input v-model="rowInfo.id_type" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="rowInfo.id_no" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="客户基本信息" align="center" :visible.sync="dialogEditVisible">
      <el-form ref="ruleForm" :model="rowInfo" label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model="rowInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="rowInfo.account"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="rowInfo.contact_information"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="rowInfo.contact_place"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-input v-model="rowInfo.id_type" ></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="rowInfo.id_no" ></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="客户基本信息" align="center" :visible.sync="dialogEditVisible">
      <el-form ref="ruleForm" :model="rowInfo" label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model="rowInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="rowInfo.account"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="rowInfo.contact_information"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="rowInfo.contact_place"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-input v-model="rowInfo.id_type" ></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="rowInfo.id_no" ></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableDataBegin: [
        {
          num: '1',
          name: '王小虎',
          account: '234677',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '2',
          name: '王小虎',
          account: '12345',
          contact_information:'15834056780',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '3',
          name: '张二虎',
          account: '345678',
          contact_information:'12347789043',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '4',
          name: '王小刚',
          account: '123467',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '5',
          name: '李小红',
          account: '234579',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '6',
          name: '王三虎',
          account: '23468',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '7',
          name: '武小虎',
          account: '23455',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '8',
          name: '王小虎',
          account: '12345',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '9',
          name: '王小虎',
          account: '12345',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '10',
          name: '王小虎',
          account: '12345',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
        },
        {
          num: '11',
          name: '王小虎',
          account: '12345',
          contact_information:'18203294078',
          contact_place:'上海',
          id_type: '身份证',
          id_no:'12345678910'
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
      rowInfo: {}
    }
  },
  created() {
    this.totalItems = this.tableDataBegin.length
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index])
      }
    } else {
      this.tableDataEnd = this.tableDataBegin
    }
  },
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tableDataEnd = []
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableDataBegin.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName) >= 0) {
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
          console.log(list[from])
          this.tableDataEnd.push(list[from])
        }
      }
    },
    //查看
    checkRow(row) {
      this.rowInfo = row
      this.dialogCheckVisible = true
    },
    //编辑
    editRow(row) {
      this.rowInfo = row
      this.dialogEditVisible = true
    },
    //表单提交
    submitForm() {
      //将更改的信息rowInfo传给后台触发页面刷新
      this.$router.go(0)
    },
    close() {
      this.dialogEditVisible = false
    },
    //删除
    deleteRow(i) {
      this.tableDataBegin.splice(i, 1)
      this.totalItems = this.tableDataBegin.length
      this.tableDataEnd = []
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index])
        }
      } else {
        this.tableDataEnd = this.tableDataBegin
      }
    },
    //新增
    addRow(){
      this.dialogEditVisible = true;
    }
  }
}
</script>

<style>
.customerRecord {
  padding: 100px;
}
.customerRecord header {
  margin-bottom: 30px;
  text-align: center;
  font-size: 26px;
}
</style>
