<template>
  <div>
    <el-dialog
      title="编辑角色"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="角色名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="nameZh">
          <el-input v-model="form.nameZh" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="功能配置" label-width="120px" prop="permissions">
          <el-checkbox-group v-model="form.selectedPermissionsIds">
            <el-checkbox v-for="(permission,i) in permissions" :key="i" :label="permission.id">{{permission.desc}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="form.selectedMenusIds"
            node-key="id"
            ref="tree">
          </el-tree>
        </el-form-item>

        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'RoleEdit',
    components: {},
    data () {
      return {
        dialogFormVisible: false,
        permissions: '',
        menus: '',
        form: {
          id: '',
          name: '',
          nameZh: '',
          selectedPermissionsIds: '',
          selectedMenusIds: [],
        },
        formLabelWidth: '120px',
        props: {
          id: 'id',
          label: 'nameZh',
          children: 'children'
        }
      }
    },
    created () {
      this.getPermissionsData()
      this.getMenusData()
    },
    methods: {
      clear () {
        this.form = {
          id: '',
          name: '',
          nameZh: '',
          selectedPermissionsIds: '',
          selectedMenusIds: [],
        }
      },
      getPermissionsData () {
        this.axios
          .get('/crud/admin/permission')
          .then(resp => {
            if (resp && resp.status === 200) {
              this.permissions = resp.data
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      },
      getMenusData () {
        this.axios
          .get('/crud/getMenus')
          .then(resp => {
            if (resp && resp.status === 200) {
              this.menus = resp.data
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      },
      onSubmit () {
        var that = this
        let permissions = []
        for (let i = 0; i < this.form.selectedPermissionsIds.length; i++) {
          for (let j = 0; j < this.permissions.length; j++) {
            if (this.form.selectedPermissionsIds[i] === this.permissions[j].id) {
              permissions.push(this.permissions[j])
            }
          }
        }
        this.axios
          .post('/crud/updateRole', {
            id: this.form.id,
            name: this.form.name,
            nameZh: this.form.nameZh,
            permissions: permissions
          }).then(resp => {
          if (resp && resp.status === 200) {
            // this.dialogFormVisible = false
            // this.$emit('onSubmit')
          }
        })
          .catch(function (error) { // 请求失败处理
            console.log(error)
            that.$message.warning('失败')
          })

        this.axios
          .put('/crud/updateRoleMenu?rid=' + this.form.id, {
            menusIds: this.$refs.tree.getCheckedKeys()
          }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
            // console.log(this.form.selectedMenusIds)
          }
        })
          .catch(function (error) { // 请求失败处理
            console.log(error)
            that.$message.warning('失败')
          })

        // this.axios
        //   .post('http://localhost:8080/crud/updateRole', {
        //     id: this.form.id,
        //     name: this.form.name,
        //     nameZh: this.form.nameZh,
        //     permissions: permissions,
        //     menusIds: this.$refs.tree.getCheckedKeys()
        //   }).then(resp => {
        //   if (resp && resp.status === 200) {
        //     this.dialogFormVisible = false
        //     this.$emit('onSubmit')
        //   }
        // })
        //   .catch(function (error) { // 请求失败处理
        //     console.log(error)
        //     that.$message.warning('失败')
        //   })
      }
    }
  }
</script>

<style scoped>
  .el-icon-circle-plus-outline {
    /*position: absolute;*/
    margin: 50px 0 0 20px;
    font-size: 100px;
    float: left;
    cursor: pointer;
  }
</style>


