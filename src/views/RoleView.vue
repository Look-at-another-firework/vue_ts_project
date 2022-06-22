<template>
  <div>
    <div class="select-box">
      <!-- <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in listData"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form> -->
      <el-button type="primary" @click="onSubmit">添加角色</el-button>
    </div>
    <el-table border :data="list" style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="姓名" width="180" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="edit(row)"> 修改权限 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '../http/api'
import { InitData, ListInt } from '../types/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const data = reactive(new InitData())
    onMounted(() => {
      getRoleData()
    })
    const getRoleData = async () => {
      const res = await getRoleList()
      data.list = res.data
      // data.listData = res.data
    }
    const edit = (row: ListInt) => {
      router.push({
        path: 'authority',
        query: {
          id: row.roleId,
          authority: row.authority.join(',')
        }
      })
    }
    const onSubmit = () => {
      ElMessageBox.prompt('请输入角色名', '添加', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (value) {
            data.list.unshift({
              roleName: value,
              roleId: data.list.length + 1,
              authority: 0
            })
          }
          ElMessage({
            type: 'success',
            message: '新增成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消成功'
          })
        })
    }
    return {
      ...toRefs(data),
      edit,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.select-box {
  margin-bottom: 20px;
}
</style>
