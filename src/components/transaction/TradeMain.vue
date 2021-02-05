<!--
交易模块-主页面
@ author zhengshifei
-->
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
    <div style="display: inline-block">
      <el-table
        :data="tradeData"
        border
        style="text-align: center;width: 100%"
        :default-sort="{prop: 'tradeTime',order: 'descending'}"
      >
        <el-table-column label="序号" type="index" width="100" align="center"/>
        <el-table-column label="交易流水号" prop="tradeNum" width="280" align="center"/>
        <el-table-column label="转入账号" prop="tradeInAccNum" width="200" align="center"/>
        <el-table-column label="转出账号" prop="tradeOutAccNum" width="200" align="center"/>
        <el-table-column label="交易金额" prop="tradeMoney" width="150" align="center"/>
        <!--<el-table-column label="交易描述" prop="tradeDescription" width="150px" align="center">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.tradeDescription" placement="top" popper-class="tooltip">
              <div class="abbreviation">
                {{scope.row.tradeDescription}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>-->
        <el-table-column label="转入/转出" prop="tradeFlag" width="100" align="center"/>
        <el-table-column label="交易状态" prop="tradeStatus" width="90" align="center"/>
        <el-table-column label="交易时间" prop="tradeTime" width="150" align="center" sortable/>
      </el-table>
      <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total=this.totalCount>
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
        // 默认每页数据量
        pageSize: 10,
        // 当前页码
        currentPage: 1,
        // 查询的页码
        startPage: 1,
        // 默认数据总数
        totalCount: 20,
        // 查询后返回的数据，后续替换为tradeData
        // transitionForms: [],
        // 表格中的数据
        tradeData:[],
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
          startPage: this.currentPage,
          mutiNum: this.pageSize,
        };
        this.axios
          .post('/7979/trade/query', data)
          .then(resp => {
            if (resp && resp.status === 200) {
              console.log('全查询',resp.data.data)
              // _this.transitionForms = resp.data
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              const transitionForms=[];
              this.pageSize = pagination.pageSize;
              this.currentPage = pagination.current;
              this.totalCount = pagination.total;
              for(var i in respForms){
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus==0?'成功':'失败',
                  tradeFlag: respForms[i].tradeFlag==1?'转出':'转入',
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
        if (form.startMoney && !form.endMoney){
          this.$message.error(`请输入最大金额范围`);
          return false;
        }
        if(form.endMoney && !form.startMoney){
          this.$message.error(`请输入最小金额范围`);
          return false;
        }
        if (form.startMoney && form.endMoney) {
          if (form.endMoney - form.startMoney < 0) {
            this.$message.error(`输入最大金额需大于最小金额`);
            return false;
          }
        }
        // 对时间范围进行限制
        if(form.endTradeTime && !form.startTradeTime){
          this.$message.error(`请输入开始日期`);
          return false;
        }
        var data = {
          startPage: this.currentPage,
          mutiNum: this.pageSize,
          //交易流水号
          tradeNum: form.tradeNum,
          // 转入账号
          tradeInAccNum: form.tradeInAccNum,
          // 转出账号
          tradeOutAccNum: form.tradeOutAccNum,
          // 时间范围
          startTradeTime: form.startTradeTime,
          endTradeTime: form.endTradeTime ? form.endTradeTime : this.dateFormat(Date.now(), 'yyyy-MM-DD h:m:s'),
          // 金额范围
          startTradeMoney: form.startMoney,
          endTradeMoney: form.endMoney,
        };
        this.axios
          .post('/7979/trade/query', data)
          .then(resp => {
            if (resp && resp.status === 200) {
              console.log('resp.data',resp.data.data.tradeDetailParamList);
              const respForms = resp.data.data.tradeDetailParamList;
              const pagination = resp.data.data.pagination;
              const transitionForms=[];
              this.pageSize = pagination.pageSize;
              this.currentPage = pagination.current;
              this.totalCount = pagination.total;
              for(var i in respForms){
                transitionForms.push({
                  tradeNum: respForms[i].tradeNum,
                  tradeInAccNum: respForms[i].tradeInAccNum,
                  tradeOutAccNum: respForms[i].tradeOutAccNum,
                  tradeMoney: respForms[i].tradeMoney,
                  tradeTime: respForms[i].tradeTime,
                  tradeStatus: respForms[i].tradeStatus==0?'成功':'失败',
                  tradeFlag: respForms[i].tradeFlag==1?'转出':'转入',
                })
              }
              if (transitionForms.length>0){
                this.tradeData=[];
                this.tradeData=transitionForms;
              }else{
                this.tradeData=[];
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
        // 对金额范围进行限制
        if (form.startMoney && !form.endMoney){
          this.$message.error(`请输入最大金额范围`);
          return false;
        }
        if(form.endMoney && !form.startMoney){
          this.$message.error(`请输入最小金额范围`);
          return false;
        }
        if (form.startMoney && form.endMoney) {
          if (form.endMoney - form.startMoney < 0) {
            this.$message.error(`输入最大金额需大于最小金额`);
            return false;
          }
        }
        // 对时间范围进行限制
        if(form.endTradeTime && !form.startTradeTime){
          this.$message.error(`请输入开始日期`);
          return false;
        }
        var data = {
          startPage: this.currentPage,
          mutiNum: this.pageSize,
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
          startTradeMoney: form.startMoney,
          endTradeMoney: form.endMoney,
        };
        this.axios
          .post('/7979/excel/tradeExport', data,{responseType: 'blob'})
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
        this.pageSize = val;
        this.currentPage = 1;
        // this.getTableData(this.currentPage, this.pageSize)
        // this.getTradeData()
        this.searchResult();

      },

      // 页码变更
      handleCurrentChange: function (val) {
        this.currentPage = val
        // this.getTableData(this.currentPage, this.pageSize)
        // this.getTradeData()
        this.searchResult()
      },
      dateFormat(date, format) {
        //  处理时间格式的函数
        if (date) {
          const d = new Date(date);
          const o = {
            yearData: d.getFullYear(),
            monthData: d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
            dateData: d.getDate() < 10 ? `0${d.getDate()}` : d.getDate(),
            hourData: d.getHours()<10?`0${d.getHours()}` : d.getHours(),
            minuteData: d.getMinutes()<10?`0${d.getMinutes()}` : d.getMinutes(),
            secondData: d.getSeconds()<10?`0${d.getSeconds()}` : d.getSeconds()
          };
          switch (format) {
            case 'yyyy-MM-DD h:m:s':
              return `${o.yearData}-${o.monthData}-${o.dateData} ${o.hourData}:${o.minuteData}:${o.secondData}`;
              break;
            case 'yyyyMMDD h:m:s':
              return `${o.yearData}${o.monthData}${o.dateData} ${o.hourData}:${o.minuteData}:${o.secondData}`;
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
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }

  /* el-table表格去掉横线 */
   .el-table__row>td{
    border: none;
  }
  .el-table::before {
    height: 0px;
  }

  .searchBar {
    margin: 10px;

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
