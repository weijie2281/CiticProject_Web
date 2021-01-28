<template>
  <div class="customerRecord">
    <header>客户档案</header>
    <div style="margin-bottom:20px;float:right;">
      <el-input v-model="tableDataName" placeholder="请输入客户名称" style="width:300px"></el-input>
      <el-button type="primary" @click="doFilter">搜索</el-button>
      <el-button type="primary" @click="addRow()" >新增</el-button>
    </div>
    <el-table :data="tableDataEnd" border style="width: 100%;margin-bottom:20px;">
      <el-table-column prop="num" label="客户号" ></el-table-column>
      <el-table-column prop="name" label="客户名称" ></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="contact_information" label="联系方式"></el-table-column>
      <el-table-column prop="contact_place" label="联系地址"></el-table-column>
      <el-table-column prop="id_type" label="证件类型"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="checkRow(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" @click="editRow(scope.row)" size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="overflow:hidden;">
        <el-button type="info" @click="output" round style="float:right;">导出</el-button>
    </div>
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
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="客户基本信息" align="center" :visible.sync="dialogAddVisible">
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
        <div>
          <el-button type="primary" @click="close">提交</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
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
      tableDataName: '',
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      dialogCheckVisible: false,
      dialogEditVisible: false,
      dialogAddVisible:false,
      rowInfo: {}
    }
  },
  created() {
    this.axios
      .post('/crud/customer/query',{customer:{}})
      .then(resp => {
       if (resp && resp.status === 200) {
         //.post('/crud/customer/query',{customer:{}})
          console.log('----获取数据成功----')
          this.tableDataBegin = resp.data.data.list
          console.log(resp.data.data)
          this.totalItems = this.tableDataBegin.length
          if (this.totalItems > this.pageSize) {
           for (let index = 0; index < this.pageSize; index++) {
              this.tableDataEnd.push(this.tableDataBegin[index])
            }
          } else {
            this.tableDataEnd = this.tableDataBegin
          }
          let responseData = resp.data.data.list
          console.log(responseData)
          let tableData = []
          for (var i in responseData) {
            tableData.push({
              num: responseData[i].custNo,
              name: responseData[i].contactName,
              account: responseData[i].creditCode,
              contact_information: responseData[i].contactNo,
              contact_place: responseData[i].address,
              id_type:responseData[i].idType,
              })
              // console.log(responseData[i].roles)
            }
            this.tableDataEnd = tableData
        } else {
          console.log('----获取数据失败----')
        }
      })
      .catch(function (error) {
        console.log(error)
      });
    //this.totalItems = this.tableDataBegin.length
    //if (this.totalItems > this.pageSize) {
    //  for (let index = 0; index < this.pageSize; index++) {
    //    this.tableDataEnd.push(this.tableDataBegin[index])
    //  }
    //} else {
    //  this.tableDataEnd = this.tableDataBegin
    //}

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
      this.dialogAddVisible = false
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
      this.axios
      .post('/crud/customer/delete',{customer:{custId:this.tableDataEnd[i].num}})
      .then(resp => {
       if (resp && resp.status === 200) {
         console.log('----删除数据成功----')
       } else {
          console.log('----获取数据失败----')
        }
      })
      .catch(function (error) {
        console.log(error)
      });
    //删除数据是提示信息
    this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    //重新刷新页面
    this.axios
      .post('/crud/customer/query',{customer:{}})
      .then(resp => {
       if (resp && resp.status === 200) {
          let responseData = resp.data.data.list
          console.log(responseData)
          let tableData = []
          for (var i in responseData) {
            tableData.push({
              num: responseData[i].custNo,
              name: responseData[i].contactName,
              account: responseData[i].creditCode,
              contact_information: responseData[i].contactNo,
              contact_place: responseData[i].address,
              id_type:responseData[i].idType,
              })
              // console.log(responseData[i].roles)
            }
            this.tableDataEnd = tableData
        } else {
          console.log('----获取数据失败----')
        }
      })
      .catch(function (error) {
        console.log(error)
      });
    },
    //新增
    addRow(){
      this.dialogAddVisible = true;
    },
    //数据导出
    output(){
        var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
        var wbout = XLSrite(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
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
.customerRecord {
  padding: 100px;
}
.customerRecord header {
  margin-bottom: 30px;
  text-align: center;
  font-size: 26px;
}
</style>
