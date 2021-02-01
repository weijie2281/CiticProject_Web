<template>
  <div class="tradeDetailBox">
    <span class="go_back" @click="goBack">返回上一页</span>
    <div class="title">交易明细</div>
    <div>
      <el-form class="el-form" ref="SearchForm" :model="SearchForm" :inline="true" label-width="100px"
               label-position="left">
        <!-- <el-form-item label="转入/转出" prop="tradeDetailFlag">
           <el-select v-model="SearchForm.accType" placeholder="全部收支类型" clearable>
             <el-option label="转出" value="转出"/>
             <el-option label="转入" value="转入"/>
           </el-select>
         </el-form-item>-->
        <el-form-item label="交易时间选择" prop="tradeDate">
          <el-select v-model="SearchForm.tradeDate" placeholder="全部">
            <el-option label="全部" value="全部"/>
            <el-option label="本月" value="本月"/>
            <el-option label="今年" value="今年"/>
          </el-select>
        </el-form-item>
        <el-form-item inline-message="inline-message">
          <el-button size="middle" type="primary" icon="el-icon-search" @click="onSearch(SearchForm)">搜索</el-button>
          <!--<el-button size="middle" type="primary" icon="el-icon-delete" @click="onReset">重置</el-button>
          &lt;!&ndash;  excel导出按钮  &ndash;&gt;
          <el-button size="middle" type="primary" @click="onExport">导出EXCEL</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="tradeStatistics">
      <div>
        <span>转入账户：{{accId}}</span>
      </div>
      <!--      <div>-->
      <!--        <span>当月收入总额 ：<b class="green" v-if="inMoney!==0">{{`+￥${inMoney}`}}</b>-->
      <!--        <b v-else>0</b>-->
      <!--        </span>-->
      <!--      </div>-->
    </div>
    <div class="TradeTable">
      <el-table
        :data="DetailDataPre"
        border
        :default-sort="{prop: 'tradeTime',order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="70px" align="center"/>
        <el-table-column label="交易流水号" prop="tradeNum" width="225px" align="center"/>
        <el-table-column label="转入账号" prop="tradeInAccNum" width="180px" align="center"/>
        <el-table-column label="转出账号" prop="tradeOutAccNum" width="180px" align="center"/>
        <el-table-column label="交易金额" prop="tradeMoney" width="130px" align="center"/>
        <el-table-column label="转入/转出" prop="tradeFlag" width="90px" align="center"/>
        <el-table-column label="交易状态" prop="tradeStatus" width="90px" align="center"/>
        <el-table-column label="交易时间" prop="tradeTime" width="150px" align="center" sortable/>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageObj1.currentPage"
          :page-sizes="[4, 8, 15, 20]"
          :page-size="pageObj1.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=pageObj1.totalCount>
        </el-pagination>
      </div>
    </div>
    <div class="tradeStatistics">
      <div>
        <span>转出账户：{{accId}}</span>
      </div>
      <!--      <div>-->
      <!--        <span>当月支出总额 ：<b class="red" v-if="outMoney!==0">{{`-￥${outMoney}`}}</b>-->
      <!--        <b v-else>0</b></span>-->
      <!--      </div>-->
    </div>
    <div class="TradeTable">
      <el-table
        :data="DetailDataEnd"
        border
        :default-sort="{prop: 'tradeTime',order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="70px" align="center"/>
        <el-table-column label="交易流水号" prop="tradeNum" width="225px" align="center"/>
        <el-table-column label="转入账号" prop="tradeInAccNum" width="180px" align="center"/>
        <el-table-column label="转出账号" prop="tradeOutAccNum" width="180px" align="center"/>
        <el-table-column label="交易金额" prop="tradeMoney" width="130px" align="center"/>
        <el-table-column label="交易状态" prop="tradeFlag" width="90px" align="center"/>
        <el-table-column label="转入/转出" prop="tradeStatus" width="90px" align="center"/>
        <el-table-column label="交易时间" prop="tradeTime" width="150px" align="center" sortable/>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChangeObj2"
          @current-change="handleCurrentChangeObj2"
          :current-page="pageObj2.currentPage"
          :page-sizes="[4, 8, 15, 20]"
          :page-size="pageObj2.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=pageObj2.totalCount>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TradeDetail",
    data() {
      return {
        pageObj1: {
          pageSize: 4,
          currentPage: 1,
          startPage: 1,
          totalCount: 20,
        },
        pageObj2: {
          pageSize: 4,
          currentPage: 1,
          startPage: 1,
          totalCount: 20,
        },
        SearchForm: {
          tradeDate: '全部'
        },
        accId: JSON.parse(sessionStorage.getItem('detail')),
        inMoney: 0,
        outMoney: 0,
        startTradeTime: '',
        endTradeTime: '',
        DetailDataEnd: [],
        DetailDataPre: [],
        DetailData: []
      }
    },
    created() {
      this.getDetailDataPre();
      this.getDetailDataEnd();
    },
    methods: {
      getDetailDataPre() {
        var _this = this;
        var data = {
          startPage: this.pageObj1.currentPage,
          mutiNum: this.pageObj1.pageSize,
          tradeInAccNum: JSON.parse(sessionStorage.getItem('detail')),
          startTradeTime: this.startTradeTime,
          endTradeTime: this.endTradeTime,
        };
        this.axios
          .post('/7979/trade/query', data)
          .then(resp => {
            if (resp && resp.status === 200) {
              // _this.transitionForms = resp.data
              const transitionForms = [];
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              this.pageObj1.pageSize = pagination.pageSize;
              this.pageObj1.currentPage = pagination.current;
              this.pageObj1.totalCount = pagination.total;
              for (var i in respForms) {
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus == 0 ? '成功' : '失败',
                  tradeFlag: respForms[i].tradeFlag == 1 ? '转出' : '转入',
                })
              }
              if (transitionForms.length > 0) {
                this.DetailDataPre = transitionForms;
              }else{
                this.DetailDataPre = [];
              }
            } else {
              console.log('----获取数据失败----')
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      getDetailDataEnd() {
        //加载整个页面
        var _this = this;
        var dataOut = {
          startPage: this.pageObj2.currentPage,
          mutiNum: this.pageObj2.pageSize,
          tradeOutAccNum: JSON.parse(sessionStorage.getItem('detail')),
          startTradeTime: this.startTradeTime,
          endTradeTime: this.endTradeTime,
        };
        this.axios
          .post('/7979/trade/query', dataOut)
          .then(resp => {
            if (resp && resp.status === 200) {
              // _this.transitionForms = resp.data
              const transitionForms = [];
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              this.pageObj2.pageSize = pagination.pageSize;
              this.pageObj2.currentPage = pagination.current;
              this.pageObj2.totalCount = pagination.total;
              for (var i in respForms) {
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus == 0 ? '成功' : '失败',
                  tradeFlag: respForms[i].tradeFlag == 1 ? '转出' : '转入',
                })
              }
              if (transitionForms.length > 0) {
                this.DetailDataEnd = [];
                this.DetailDataEnd = transitionForms;
              }else{
                this.DetailDataEnd = [];
              }
            } else {
              console.log('----获取数据失败----')
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      onSearch(SearchForm) {
        switch (SearchForm.tradeDate) {
          case '本月':
            this.startTradeTime = this.dateFormat(Date.now(), '月初');
            break;
          case '今年':
            this.startTradeTime = this.dateFormat(Date.now(), '年初');
            break;
          case '全部':
            this.startTradeTime = '';
            break;
        }
        this.endTradeTime = this.dateFormat(Date.now(), 'yyyy-MM-DD h:m:s');
        this.getDetailDataPre();
        this.getDetailDataEnd();
      },
      goBack() {
        this.$router.back();
      },
      // 每页显示数据量变更
      handleSizeChange: function (val) {
        this.pageObj1.pageSize = val;
        this.pageObj1.currentPage = 1;
        this.getDetailDataPre();
      },
      // 页码变更
      handleCurrentChange: function (val) {
        this.pageObj1.currentPage = val
        this.getDetailDataPre();
      },
      // 每页显示数据量变更
      handleSizeChangeObj2: function (val) {
        this.pageObj2.pageSize = val;
        this.pageObj2.currentPage = 1;
        this.getDetailDataEnd();
      },
      // 页码变更
      handleCurrentChangeObj2: function (val) {
        this.pageObj2.currentPage = val
        this.getDetailDataEnd();
      },
      dateFormat(date, format) {
        //  处理时间格式的函数
        if (date) {
          const d = new Date(date);
          const o = {
            yearData: d.getFullYear(),
            monthData: d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
            dateData: d.getDate() < 10 ? `0${d.getDate()}` : d.getDate(),
            hourData: d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(),
            minuteData: d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes(),
            secondData: d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
          };
          switch (format) {
            case 'yyyy-MM-DD h:m:s':
              return `${o.yearData}-${o.monthData}-${o.dateData} ${o.hourData}:${o.minuteData}:${o.secondData}`;
              break;
            case 'yyyyMMDD h:m:s':
              return `${o.yearData}${o.monthData}${o.dateData} ${o.hourData}:${o.minuteData}:${o.secondData}`;
              break;
            case '月初':
              // 月初
              return `${o.yearData}-${o.monthData}-01 00:00:00`;
              break;
            case '年初':
              // 年初
              return `${o.yearData}-01-01 00:00:00`;
              break;
          }
        } else {
          return this.$message(`暂无数据`);
        }
      }
    }
  }
</script>

<style scoped>
  .tradeDetailBox {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
  }

  .el-form {
    text-align: right;
    margin-right: 20px;
  }

  .TradeTable {
    margin: 20px;
  }

  .tradeStatistics {
    padding: 5px 20px 0 20px;
  }

  .tradeStatistics span {
    display: inline-block;
    font-size: 14px;
    text-align: left;
    padding-right: 20px;
    padding-bottom: 5px;
  }

  .tradeStatistics b {
    font-size: 14px;
    display: inline-block;
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }

  .page {
    text-align: center;
    margin: auto;
  }

  .go_back {
    float: right;
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    margin: 10px;
  }

</style>
