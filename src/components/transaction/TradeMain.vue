<template>
  <div class="transaction">
    <!-- 搜索功能 -->
    <Trade-search
      class="searchBar"
      @onSearch="searchResult"
      @onReset="resetResult"
      @onExport="exportExcel"
      ref="searchBar"/>
    <!--  交易细节  -->
    <div class="TradeTable">
      <el-table
        :data="tradeData"
        border
        :default-sort="{prop: 'time',order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="70px" align="center"/>
        <el-table-column label="交易流水号" prop="tradeNum" width="260px" align="center"/>
        <el-table-column label="转入账号" prop="tradeInAccNum" width="200px" align="center"/>
        <el-table-column label="转出账号" prop="tradeOutAccNum" width="200px" align="center"/>
        <el-table-column label="交易金额" prop="tradeMoney" width="140px" align="center"/>
        <!--<el-table-column label="交易描述" prop="tradeDescription" width="150px" align="center">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.tradeDescription" placement="top" popper-class="tooltip">
              <div class="abbreviation">
                {{scope.row.tradeDescription}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>-->
        <el-table-column label="交易状态" prop="tradeStatus" width="100px" align="center"/>
        <el-table-column label="交易时间" prop="tradeTime" width="160px" align="center" sortable/>
      </el-table>
      <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total=this.tradeData.length>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import TradeSearch from "./TradeSearch";

  export default {
    name: "TradeMain",
    components: {TradeSearch},
    data() {
      return {
        // 金额范围
        minMoney: 0.00,
        // 默认每页数据量
        pageSize: 10,
        // 当前页码
        currentPage: 1,
        // 查询的页码
        start: 1,
        // 默认数据总数
        totalCount: 20,
        // 查询后返回的数据，后续替换为tradeData
        // transitionForms: [],
        // 表格中的数据
        tradeData:[],
        /*tradeData: [
          // 交易流水号，转入转出账号，交易金额，交易时间，交易状态
          // tradeNum、tradeInAccNum、tradeOutAccNum、TradeMoney、TradeTime、TradeStatus
          {
            tradeNum: '123456789123456789123456789123456789',
            tradeInAccNum: '12312341234123412341',
            tradeOutAccNum: '12312341234123412341',
            tradeMoney: '999999999.00',
            tradeTime: '2021-01-19',
            tradeStatus: '成功',
            tradeDescription: '备注11111111111111111111111111111111111111111111111111111111111111111' +
              '111111e22222222222222222222221'
          }
        ],*/
      }
    },
    mounted: function () {
      this.getTradeData();
    },
    methods: {
      getTradeData() {
        //加载整个页面
        var _this = this;
        var data = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        };
        this.axios
          .post('/crud/trade/query', data)
          .then(resp => {
            if (resp && resp.status === 200) {
              console.log('全查询',resp.data.data)
              // _this.transitionForms = resp.data
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              const transitionForms=[];
              this.pageSize = pagination.pageSize;
              this.currentPage = pagination.current;
              for(var i in respForms){
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus==0?'成功':'失败',
                })
              }
              if (transitionForms.length>0){
                this.tradeData=[];
                this.tradeData=transitionForms;
              }
              console.log('this.tradeData',this.tradeData)
            } else {
              console.log('----获取数据失败----')
            }
          })
          .catch(function (error) {
            console.log('getTradeData',error)
          });
      },
      searchResult() {
        //查询
        var _this = this;
        var form = this.$refs.searchBar.form;
        // 对金额范围进行限制
        if(form.endMoney&&form.endMoney>_this.maxMoney){
          this.$message.error(`输入金额超出最大额度`);
          return false;
        }
        if(form.startMoney&&form.startMoney>_this.maxMoney){
          this.$message.error(`输入金额超出最大额度`);
          return false;
        }
        if(form.startMoney &&  form.endMoney){
          if(form.startMoney>form.endMoney){
            this.$message.error(`输入最大金额应大于最小金额`);
            return false;
          }
        }
        var data = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          //交易流水号
          tradeNum: form.tradeNum,
          // 转入账号
          tradeInAccNum: form.tradeInAccNum,
          // 转出账号
          tradeOutAccNum: form.tradeOutAccNum,
          // 时间范围
          startTradeTime: form.startTradeTime,
          endTradeTime: form.endTradeTime ? form.endTradeTime : this.dateFormat(Date.now(), 'yyyy-MM-DD'),
          // 金额范围
          startMoney: form.startMoney ? form.startMoney : this.minMoney,
          endMoney: form.endMoney ? form.endMoney : this.maxMoney,
        };
        console.log('data',data)
        this.axios
          .post('/crud/trade/query', data)
          .then(resp => {
            if (resp && resp.status === 200) {
              console.log('resp.data',resp.data.data.tradeDetailParamList);
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              const transitionForms=[];
              this.pageSize = pagination.pageSize;
              this.currentPage = pagination.current;
              for(var i in respForms){
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus==0?'成功':'失败',
                })
              }
              if (transitionForms.length>0){
                this.tradeData=[];
                this.tradeData=transitionForms;
              }
              console.log('this.tradeData',this.tradeData)
            } else {
              console.log('----searchResult false----');
              this.$message.warning('查询失败');
            }
          })
          .catch(function (error) {
            console.log('searchResult',error)
          });
      },
      resetResult() {
        //  重置
        console.log('重置');
        this.getTradeData();
      },
      exportExcel() {
        //  导出Excel
        var _this = this;
        var form = this.$refs.searchBar.form;
        if(form.endMoney&&form.endMoney>_this.maxMoney){
          this.$message.error(`输入金额超出最大额度`);
          return false;
        }
        if(form.startMoney&&form.startMoney>_this.maxMoney){
          this.$message.error(`输入金额超出最大额度`);
          return false;
        }
        if(form.startMoney &&  form.endMoney){
          if(form.startMoney>form.endMoney){
            this.$message.error(`输入最大金额应大于最小金额`);
            return false;
          }
        }
        var data = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          //交易流水号
          tradeNum: form.tradeNum,
          // 转入账号
          tradeInAccNum: form.tradeInAccNum,
          // 转出账号
          tradeOutAccNum: form.tradeOutAccNum,
          // 时间范围
          startTradeTime: form.startTradeTime,
          endTradeTime: form.endTradeTime ? form.endTradeTime : this.dateFormat(Date.now(), 'yyyy-MM-DD'),
          // 金额范围
          startMoney: form.startMoney ? form.startMoney : this.minMoney,
          endMoney: form.endMoney ? form.endMoney : this.maxMoney,
        };
        this.axios
          .post('/crud/excel/tradeExport', data,{responseType: 'blob'})
          .then(resp => {
            if (resp && resp.status === 200) {
              console.log('resp.data',resp.data);
              _this.transitionForms = resp.data
              let url = window.URL.createObjectURL(new Blob([resp.data]));
              let link = document.createElement('a');
              link.style.display='none';
              link.href=url;
              link.setAttribute('download',`交易流水.xlsx`);
              document.body.appendChild(link);
              link.click()
            } else {
              console.log('----exportExcel false----');
              this.$message.warning('导出excel失败');
            }
          })
          .catch(function (error) {
            console.log('exportExcel',error)
          });
      },
      // 每页显示数据量变更
      handleSizeChange: function (val) {
        this.pageSize = val
        // this.getTableData(this.currentPage, this.pageSize)
        this.getTableData()
      },

      // 页码变更
      handleCurrentChange: function (val) {
        this.currentPage = val
        // this.getTableData(this.currentPage, this.pageSize)
        this.getTableData()
      },
      dateFormat(date, format) {
        //  处理时间格式的函数
        if (date) {
          const d = new Date(date);
          const o = {
            yearData: d.getFullYear(),
            monthData: d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
            dateData: d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
          };
          switch (format) {
            case 'yyyy-MM-DD':
              return `${o.yearData}-${o.monthData}-${o.dateData}`;
              break;
            case 'yyyyMMDD':
              return `${o.yearData}${o.monthData}${o.dateData}`;
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
  .transaction {
    background-color: white;
    width: 100%;
    /*position: ;*/
  }

  .searchBar {
    margin: 10px;

  }

  .TradeTable {
    margin: 20px;
  }

  .page {
    text-align: center;
    margin: auto;
  }

  .abbreviation {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /*height: 40px;*/
    position: relative;
  }
</style>
