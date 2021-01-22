<template>
  <div class="tradeDetailBox">
    <span class="go_back" @click="goBack">返回上一页</span>
    <div class="title">交易明细</div>
    <!--custAcct: "1234567888"-->
    <!--    <div>-->
    <!--      <el-form class="el-form" ref="SearchForm" :model="SearchForm" :inline="true" label-width="100px"-->
    <!--               label-position="left">-->
    <!--        <el-form-item label="转入/转出" prop="tradeDetailFlag">-->
    <!--          <el-select v-model="SearchForm.accType" placeholder="全部收支类型" clearable>-->
    <!--            <el-option label="转出" value="转出"/>-->
    <!--            <el-option label="转入" value="转入"/>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="交易时间选择" prop="tradeDetailDate">-->
    <!--          <el-select v-model="SearchForm.tradeDate" placeholder="本月" clearable>-->
    <!--            <el-option label="本月" value="本月"/>-->
    <!--            <el-option label="上月" value="上月"/>-->
    <!--            <el-option label="今年" value="今年"/>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item inline-message="inline-message">-->
    <!--          <el-button size="middle" type="primary" icon="el-icon-search" @click="onSearch(form)">搜索</el-button>-->
    <!--          <el-button size="middle" type="primary" icon="el-icon-delete" @click="onReset">重置</el-button>-->
    <!--          &lt;!&ndash;  excel导出按钮  &ndash;&gt;-->
    <!--          <el-button size="middle" type="primary" @click="onExport">导出EXCEL</el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </div>-->
    <div class="tradeStatistics">
      <div>
        <span>转入账户：{{accId}}</span>
      </div>
      <div>
        <span>当月收入总额 ：<b class="green" v-if="inMoney!==0">{{`+￥${inMoney}`}}</b>
        <b v-else>0</b>
        </span>
      </div>
    </div>
    <div class="TradeTable">
      <el-table
        :data="DetailDataPre"
        border
        :default-sort="{prop: 'time',order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="70px" align="center"/>
        <el-table-column label="交易流水号" prop="tradeNum" width="260px" align="center"/>
        <el-table-column label="转入账号" prop="tradeInAccNum" width="200px" align="center"/>
        <el-table-column label="转出账号" prop="tradeOutAccNum" width="200px" align="center"/>
        <el-table-column label="交易金额" prop="tradeMoney" width="140px" align="center"/>
        <el-table-column label="交易状态" prop="tradeStatus" width="100px" align="center"/>
        <el-table-column label="交易时间" prop="tradeTime" width="160px" align="center" sortable/>
      </el-table>
    </div>
    <div class="tradeStatistics">
      <div>
        <span>转出账户：{{accId}}</span>
      </div>
      <div>
        <span>当月支出总额 ：<b class="red" v-if="outMoney!==0">{{`-￥${outMoney}`}}</b>
        <b v-else>0</b></span>
      </div>
    </div>
    <div class="TradeTable">
      <el-table
        :data="DetailDataEnd"
        border
        :default-sort="{prop: 'time',order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="70px" align="center"/>
        <el-table-column label="交易流水号" prop="tradeNum" width="260px" align="center"/>
        <el-table-column label="转入账号" prop="tradeInAccNum" width="200px" align="center"/>
        <el-table-column label="转出账号" prop="tradeOutAccNum" width="200px" align="center"/>
        <el-table-column label="交易金额" prop="tradeMoney" width="140px" align="center"/>
        <el-table-column label="交易状态" prop="tradeStatus" width="100px" align="center"/>
        <el-table-column label="交易时间" prop="tradeTime" width="160px" align="center" sortable/>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TradeDetail",
    data() {
      return {
        SearchForm: {
          accType: '',
          tradeDate: ''
        },
        currentPage: 1,
        pageSize: 10,
        accId: JSON.parse(sessionStorage.getItem('detail')),
        inMoney: 0,
        outMoney: 0,
        DetailDataEnd: [],
        DetailDataPre: [],
        DetailData: []
      }
    },
    created() {
      this.getDetailData();
    },
    methods: {
      getDetailData() {
        //加载整个页面
        var _this = this;
        var data = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          tradeInAccNum: JSON.parse(sessionStorage.getItem('detail')),
        };
        console.log('11111111111', data.tradeInAccNum);
        this.axios
          .post('/crud/trade/query', data)
          .then(resp => {
            if (resp && resp.status === 200) {
              console.log('查询详情', resp.data.data)
              // _this.transitionForms = resp.data
              const transitionForms = [];
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              this.pageSize = pagination.pageSize;
              this.currentPage = pagination.current;
              for (var i in respForms) {
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus == 0 ? '成功' : '失败',
                })
                this.inMoney = this.inMoney+respForms[i].tradeMoney;
              }
              if (transitionForms.length > 0) {
                this.DetailDataPre = [];
                this.DetailDataPre = transitionForms;
                console.log('this.DetailDataPre', this.DetailDataPre);
              }
            } else {
              console.log('----获取数据失败----')
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        var dataOut = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          tradeOutAccNum: JSON.parse(sessionStorage.getItem('detail')),
        };
        this.axios
          .post('/crud/trade/query', dataOut)
          .then(resp => {
            if (resp && resp.status === 200) {
              console.log('查询详情', resp.data.data)
              // _this.transitionForms = resp.data
              const transitionForms = [];
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              this.pageSize = pagination.pageSize;
              this.currentPage = pagination.current;
              for (var i in respForms) {
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus == 0 ? '成功' : '失败',
                })
                this.outMoney = this.outMoney+respForms[i].tradeMoney;
              }
              if (transitionForms.length > 0) {
                this.DetailDataEnd = [];
                this.DetailDataEnd = transitionForms;
                console.log('DetailData', this.DetailDataEnd);
              }
            } else {
              console.log('----获取数据失败----')
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      goBack() {
        this.$router.back();
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
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
    text-align: center;
  }

  .abbreviation {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 20px;
    position: relative;
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
