<template>
  <el-button type="primary" @click="edit">确认修改</el-button>
  <div>
    <el-tree
      :props="{
        children: 'roleList',
        label: 'name'
      }"
      :data="list"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="authorityIds"
      check-strictly
      ref="treeRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { InitData, QueryInt } from '../types/authority'
import { getAuthorityList } from '../http/api'
export default defineComponent({
  setup() {
    const route = useRoute()
    const query: any = route.query
    const data = reactive(new InitData(query.id, query.authority))
    onMounted(() => {
      getAuthorityData()
    })
    const getAuthorityData = async () => {
      const res = await getAuthorityList()
      data.list = res.data
    }
    const edit = () => {
      console.log(data.treeRef.getCheckedKeys())
      alert('没有接口，操作成功' + data.treeRef.getCheckedKeys())
    }
    return {
      ...toRefs(data),
      edit
    }
  }
})
</script>

<style scoped></style>
