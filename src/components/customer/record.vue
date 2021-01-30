<template>
  <div class="customerRecord">
    <header>客户档案</header>
    <div style="margin-bottom:20px;float:right;">
      <el-input v-model="tableDataName" placeholder="请输入客户名称" style="width:300px"></el-input>
      <el-button type="primary" @click="doFilter">搜索</el-button>
      <el-button type="primary" @click="return_page">重置</el-button>
      <el-button type="primary" @click="addRow()" >新增</el-button>
    </div>
    <el-table id="table" :data="tableDataEnd" border style="width: 100%;margin-bottom:20px;">
      <el-table-column prop="custId" label="序号" width="50"></el-table-column>
      <el-table-column prop="custNo" label="客户号" width="70"></el-table-column>
      <el-table-column prop="custName" label="客户姓名" ></el-table-column>
      <el-table-column prop="creditCode" label="身份证号"></el-table-column>
      <el-table-column prop="contactName" label="联系人"></el-table-column>
      <el-table-column prop="contactNo" label="联系电话"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="idType" label="身份类型"></el-table-column>
      <el-table-column prop="idNo" label="idNo"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
    <el-dialog title="客户基本信息详情" align="center" :visible.sync="dialogCheckVisible">
      <el-form :model="rowInfo" label-width="80px">
        <el-form-item label="序号">
          <el-input v-model="rowInfo.custId" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户号">
          <el-input v-model="rowInfo.custNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="rowInfo.custName" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="rowInfo.creditCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="rowInfo.contactName" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="rowInfo.contactNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="rowInfo.address" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份类型">
          <el-input v-model="rowInfo.idTpye" disabled></el-input>
        </el-form-item>
        <el-form-item label="idNo">
          <el-input v-model="rowInfo.idNo" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改客户基本信息" align="center" :visible.sync="dialogEditVisible">
      <el-form ref="ruleForm" :model="rowInfo" label-width="80px">
        <el-form-item label="序号">
          <el-input v-model="rowInfo.custId" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户号">
          <el-input v-model="rowInfo.custNo" ></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="rowInfo.custName" ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="rowInfo.creditCode" ></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="rowInfo.contactName" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="rowInfo.contactNo" ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="rowInfo.address" ></el-input>
        </el-form-item>
        <el-form-item label="身份类型">
          <el-input v-model="rowInfo.idTpye" ></el-input>
        </el-form-item>
        <el-form-item label="idNo">
          <el-input v-model="rowInfo.idNo" ></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="submitForm_edit('ruleForm')">提交</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="新增客户基本信息" align="center" :visible.sync="dialogAddVisible">
      <el-form ref="ruleForm1" :model="ruleForm1" label-width="80px">
        <!-- <el-form-item label="序号">
          <el-input v-model="rowInfo.custId" ></el-input>
        </el-form-item> -->
        <el-form-item label="客户号">
          <el-input v-model="ruleForm1.custNo" ></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="ruleForm1.custName" ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="ruleForm1.creditCode" ></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="ruleForm1.contactName" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="ruleForm1.contactNo" ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="ruleForm1.address" ></el-input>
        </el-form-item>
        <el-form-item label="身份类型">
          <el-input v-model="ruleForm1.idTpye" ></el-input>
        </el-form-item>
        <el-form-item label="idNo">
          <el-input v-model="ruleForm1.idNo" ></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="submitForm_add('ruleForm1')">提交</el-button>
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
      ruleForm1:{
        //custId: this.rowInfo.custId,
        custNo: '',
        custName: '',
        creditCode: '',
        contactName: '',
        contactNo: '',
        address: '',
        idType: '',
        idNo:'',
      },
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
    this.getpage()
  },
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      // alert(this.tableDataName.custName)
      // this.axios
      // .post('/crud/customer/query',{customer:{custName:this.tableDataName.custName}})
      // .then(resp => {
      //  if (resp && resp.status === 200) {
      //    //.post('/crud/customer/query',{customer:{}})
      //     console.log('----查询数据成功----')
         
      //     let responseData = resp.data.data.list
      //     // console.log(responseData)
      //     let tableData = []
      //     for (var i in responseData) {
      //       tableData.push({
      //         //custId: responseData[i].custId,
      //         //custName: responseData[i].custName,
      //         //creditCode: responseData[i].creditCode,
      //         //contactName: responseData[i].contactName,
      //         //address: responseData[i].address,
      //         //idNo:responseData[i].idNo,
      //         })
      //         // console.log(responseData[i].roles)
      //       }
      //     this.tableDataEnd = tableData
      //     //获取数据后填充页面
      //   } else {
      //     console.log('----获取数据失败----')
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error)
      // });
      this.tableDataEnd = []
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableDataBegin.forEach((value, index) => {
        if (value.custName) {
          if (value.custName.indexOf(this.tableDataName) >= 0) {
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
    submitForm_add() {
      //alert(this.rowInfo.custId)
      //alert(this.rowInfo.idNo)
      //将更改的信息rowInfo传给后台触发页面刷新
      this.$router.go(0)
      this.axios
          .post('/7979/customer/add', {
            //custId: this.rowInfo.custId,
            custNo: this.ruleForm1.custNo,
            custName: this.ruleForm1.custName,
            creditCode: this.ruleForm1.creditCode,
            contactName: this.ruleForm1.contactName,
            contactNo: this.ruleForm1.contactNo,
            address: this.ruleForm1.address,
            idType: this.ruleForm1.idType,
            idNo:this.ruleForm1.idNo,
          }).then(resp => {
          //  alert("hhhh")
          if (resp && resp.status === 200) {
            console.log('----新增数据成功----')
            this.dialogAddVisible = false
            this.$emit('onSubmit')
          }
        })
          .catch(function (error) { // 请求失败处理
            console.log(error)
            that.$message.warning('失败')
          })
    },
    //表单编辑
    submitForm_edit() {
      //alert(this.rowInfo.custId)
      //alert(this.rowInfo.idNo)
      //将更改的信息rowInfo传给后台触发页面刷新
      this.$router.go(0)
      this.axios
          .post('/7979/customer/edit', {
            custId: this.rowInfo.custId,
            custNo: this.rowInfo.custNo,
            custName: this.rowInfo.custName,
            creditCode: this.rowInfo.creditCode,
            contactName: this.rowInfo.contactName,
            contactNo: this.rowInfo.contactNo,
            address: this.rowInfo.address,
            idType: this.rowInfo.idType,
            idNo:this.rowInfo.idNo,
          }).then(resp => {
          if (resp && resp.status === 200) {
            console.log('----新增数据成功----')
            this.dialogAddVisible = false
            this.$emit('onSubmit')
          }
        })
          .catch(function (error) { // 请求失败处理
            console.log(error)
            that.$message.warning('失败')
          })
    },
    close() {
      this.dialogEditVisible = false
      this.dialogAddVisible = false
    },
    //删除
    deleteRow(i) {
      //this.tableDataBegin.splice(i, 1)
      //this.totalItems = this.tableDataBegin.length
      //this.tableDataEnd = []
      //if (this.totalItems > this.pageSize) {
      //  for (let index = 0; index < this.pageSize; index++) {
      //    this.tableDataEnd.push(this.tableDataBegin[index])
      //  }
      //} else {
      //  this.tableDataEnd = this.tableDataBegin
      //}

      // this.tableDataBegin.splice((this.currentPage - 1) * this.pageSize + i, 1)
      //   this.currentPage = 1
      //   this.totalItems = this.tableDataBegin.length
      //   this.tableDataEnd = []
      //   if (this.totalItems > this.pageSize) {
      //   for (let index = 0; index < this.pageSize; index++) {
      //     this.tableDataEnd.push(this.tableDataBegin[index])
      //   }
      // } else {
      //   this.tableDataEnd = this.tableDataBegin
      // }
      //custId:this.tableDataBegin[(this.currentPage - 1) * this.pageSize + i].custId
      this.axios
      .post('/7979/customer/delete',{custId:this.tableDataBegin[(this.currentPage - 1) * this.pageSize + i].custId})
      .then(resp => {
      //alert(this.tableDataBegin[(this.currentPage - 1) * this.pageSize + i].custId)
       if (resp && resp.status === 200) {
         console.log(resp)
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
     this.getpage()
     
    },
    //新增
    addRow(){
      this.dialogAddVisible = true
      this.ruleForm1 = {}
    },
    getpage(){
      this.axios
      .post('/7979/customer/query',{customer:{}})
      .then(resp => {
       if (resp && resp.status === 200) {
         //.post('/crud/customer/query',{customer:{}})
          console.log('----获取数据成功----')
         
          let responseData = resp.data.data.list
          // console.log(responseData)
          let tableData = []
          for (var i in responseData) {
            tableData.push({
              //custId: responseData[i].custId,
              //custName: responseData[i].custName,
              //creditCode: responseData[i].creditCode,
              //contactName: responseData[i].contactName,
              //address: responseData[i].address,
              //idNo:responseData[i].idNo,
              })
              // console.log(responseData[i].roles)
            }
            this.tableDataEnd = tableData
          //获取数据后填充页面
          this.tableDataEnd=[]
          this.tableDataBegin = resp.data.data.list
          console.log(this.tableDataBegin)
          this.totalItems = this.tableDataBegin.length
          if (this.totalItems > this.pageSize) {
           for (let index = 0; index < this.pageSize; index++) {
              this.tableDataEnd.push(this.tableDataBegin[index])
            }
          } else {
            this.tableDataEnd = this.tableDataBegin
          }
        } else {
          console.log('----获取数据失败----')
        }
      })
      .catch(function (error) {
        console.log(error)
      });
    },
    //搜索返回
    return_page(){
      this.tableDataName =''
      this.tableDataEnd=[]
      this.getpage()
    },
    //数据导出
    output(){
        var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '客户表.xlsx')
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
