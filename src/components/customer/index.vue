<template>
  <div class="customerManage">
    <el-row>
      <el-col :span="6" :offset="8">
        <div class="grid-content bg-purple customerManage-item">客户管理模块</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <div class="grid-content bg-purple customerManage-item" @click="toCustomerRecord">客户档案</div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="grid-content bg-purple customerManage-item">联系人</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <div class="grid-content bg-purple customerManage-item">客户跟踪</div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="grid-content bg-purple customerManage-item">合同</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Customer',
  methods: {
    toCustomerRecord() {
      this.$router.push('/customerRecord')
    }
  }
}
</script>

<style>
.customerManage {
  margin-top: 100px;
}
.el-row {
  margin-bottom: 40px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 60px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.customerManage-item {
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}
</style>
