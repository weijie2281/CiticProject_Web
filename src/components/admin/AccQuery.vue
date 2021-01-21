<!--账户信息查询-->
<template>
	<div class="table_class">

		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right" class="bread-class">
			<el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>账户管理</el-breadcrumb-item>
			<el-breadcrumb-item>账户查询</el-breadcrumb-item>
		</el-breadcrumb>

		<!--搜索-->
    <div class="filter-container">
    <el-form style="margin-top: 20px" :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="账户">
        <el-input type="number" v-model="searchForm.accNo" placeholder="请输入账号"/>
      </el-form-item>
      <el-form-item label="账户类型" prop="acctType">
        <el-select v-model="searchForm.accType" filterable clearable placeholder="请选择">
          <el-option v-for="(item, key) in accTypeOptions" :key="key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
		<div style="float:right;padding-bottom:10px">
			<el-button icon="el-icon-search" type="primary" round @click="search()">查询</el-button>
			<el-button icon="el-icon-refresh-left" type="warning" round plain @click="resetForm()">重置</el-button>
		</div>
    </el-form>
    </div>

		<el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
		<!-- 搜索结果，显示账户列表 -->
		<div>
			<el-table :data="tableData" @selection-change="selectionChange" style="width: 100%" border stripe fit highlight-current-row>
        <el-table-column fixed type="selection" width="40" align="center" />
        <el-table-column fixed type="index" label="序号" width="70px" sortable="true"></el-table-column>
				<el-table-column fixed label="账户ID" width="110" align="center" prop="accId"></el-table-column>
				<el-table-column label="账号" fixed align="center" width="180" prop="accNo" sortable="true">
					<template scope="scope">
						<span><a class="cOrange" @click="queryDetail(Number(scope.$index))">{{scope.row.accNo}}</a></span>
					</template>
				</el-table-column>
				<el-table-column label="账户名称" align="center" width="150" prop="accName"></el-table-column>
				<el-table-column label="币种" align="center" width="150" prop="moneyTp"></el-table-column>
				<el-table-column label="账户余额" align="center" width="150" sortable="true" prop="accBal | formatAmount"></el-table-column>
				<el-table-column label="账户性质" width="110" align="center" prop="accAttr"></el-table-column>
				<el-table-column label="账户状态" width="110" align="center" prop="accStatus"></el-table-column>
				<el-table-column label="交易明细">
					<template scope="scope">
						<el-button type="primary" size="mini" @click="handleClick(scope.row.accNo)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--分页组件-->
			<pagination style="margin-top: 10px;float: right"
                  v-show="total > 0"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="pageSizes"
                  :page-size="pageSize"
                  :total="total"
                  layout="total, sizes, prev, pager, next, jumper"/>
		</div>
		弹出对话框
		<el-dialog title="账户详情信息" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<el-form class="formEmbedTable" :mode="accList" id="detail_dialog">
				<div class="tableData p20">
					<table>
						<tr>
							<td>账户：</td>
							<td>
								<el-form-item>{{accList.accNo}}</el-form-item>
							</td>
							<td>账户类型：</td>
							<td>
								<el-form-item>{{accList.accType}}</el-form-item>
							</td>
						</tr>
						<tr>
							<td>账户名称：</td>
							<td>
								<el-form-item>{{accList.accName}}</el-form-item>
							</td>
							<td>账户状态：</td>
							<td>
								<el-form-item>{{accList.accStatus}}</el-form-item>
							</td>
						</tr>
						<tr>
							<td>账户余额：</td>
							<td>
								<el-form-item>{{accList.accBal}}</el-form-item>
							</td>
							<td>币种：</td>
							<td>
								<el-form-item>{{accList.moneyTp}}</el-form-item>
							</td>
						</tr>
						<tr>
							<td>开户网点：</td>
							<td>
								<el-form-item>{{accList.openAccOrg}}</el-form-item>
							</td>
							<td>开户日期：</td>
							<td>
								<el-form-item>{{accList.openAccDate}}</el-form-item>
							</td>
						</tr>
					</table>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer btnArea tac">
				<el-button @click="dialogVisible=false">关闭</el-button>
			</div>
		</el-dialog>
		<!-- 弹出对话框 end-->
	</div>
</template>
<script>
  // import Blob from '@/excel/Blob'
  // import Export2Excel from '@/excel/Export2Excel.js'
	export default {
		name: 'AccQuery',
    data() {
        return {
            dialogVisible: false, //是否显示弹窗
            listLoading: false, //默认加载/////////////////////////////////////////////////////////
            tableData: [], //初始化列表数据
            detailData: {},
            searchForm: {},
            selectList: [],  // 选中的数据
            downloadLoading: false,
            filename: '',
            autoWidth: true,

            parames: {
                accNo: '',
                accType: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            accTypeOptions: [
                {value: '01', label: '单位'},
                {value: '02', label: '个人'},
                {value: '03', label: '内部'}
            ]
        }
    },
    filters: {
        formatAmount(s, n) { //格式化金额，隔3位加，
            if (!s) return ''
            n = n > 0 && n <= 20 ? n : 2
            if (s.indexOf('.') === -1) {
                s = parseFloat((s + '').replace(/[^\d]/g, '')).toFixed(2) + ''
            }
            let l = s.split('.')[0].split('').reverse(),
                r = s.split('.')[0],
                t = ''
            for (let i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 === 0 && (i + 1) != l.length ? ',' : '')
            }
            t = t.split('').reverse().join('')
            return r ? t + '.' + r.substr(0, 2) : t
        },
        accNoFormat(str) { //账号四位空格
            if (!str) return str
            let s = ''
            for (let i = 0, len= str.length; i <len; i++) {
                if (i !== 0 && i % 4 === 0) {
                    s = s + ''
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
		created() {
			this.getList()
		},
		methods: {
			/** 查询账户列表 */
      async getList() {
        var param = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        accNo: this.searchForm.accNo,
        accType: this.searchForm.accType
        };
        try {
          const res = await this.axios.get('/crud/admin/acc', {
            params: param
          })
          this.total = res.data.total
          this.accList = res.data.list
          this.accList = res.data.list
          this.listLoading = false
          //遍历
        } catch (err) {
          console.error(err)
        }
      },
			search() { // 查询列表处理
			      this.currentPage = 1; // 重置为第一页
			      this.getList()
				},
      resetForm(){ //重置
        this.searchForm.accNo = ''
        this.searchForm.accType= ''
      },
			handleSizeChange(newSize) { //pageSize改变时触发，当pageSize改变，以新的pageSize请求数据并展示数据
				console.log(`每页 ${newSize} 条`);
        this.currentPage = 1;
        this.pageSize = newSize; //重新按照pageSize发送请求，请求最新的数据
				this.getList();
        //加载框
        this.listLoading = true;
			},
			handleCurrentChange(current) { //页码改变时触发，当current发生改变的时候，以最新的current页码来请求数据并展示数据
				console.log(`当前页: ${current}`);
				this.currentPage = current; //重新按照pageNum发送请求，请求最新的数据
				this.getList();
        //加载框
        this.listLoading = true
			},
      //选中某条数据时
      selectionChange(row) {
        this.selectList = row;     // 将选中的数据给selectList
        //   console.log(this.selectList)
      },
			/** 导出按钮操作 */
			/////////////////////////////////////////////////////////////////////////////////////
      handleExport() {
        if (this.selectList.length === 0) {
          this.$message({
            message: '请至少选择一条需要导出的数据',
            type: 'warning'
          });
          return;
        }
        this.$confirm('该操作将导出选中的数据，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //导出
          require.ensure([], () => {
            //
          })
        }).catch(() => { });
      }
    },
      handleExport() {
				if (this.selectList.length === 0) {
          this.$message({
            message: '请至少选择一条需要导出的数据',
            type: 'warning'
          });
          return;
        }
				this.$confirm('是否确认导出所有数据项?', '警告', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(function() {
						//return exportacc
					})
					.catch(function() {})
			},
			queryDetail(index) {
				console.log("index", index)
				let _this = this
				_this.dialogVisible = !_this.dialogVisible
				_this.detailData = _this.accList[index]
			},
			handleClick(accNo) {
        this.$router.push({name:'AccDetail', params:{'accNo': accNo}})
			}
	}
</script>
