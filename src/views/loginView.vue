<template>
  <div class="login-box">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="70px"
      class="demo-loginForm"
    >
      <h1>管理系统</h1>
      <el-form-item label="账号:" prop="userName">
        <el-input v-model="loginForm.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="sub-btn" type="primary" @click="submitForm(loginFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '../types/login'
import type { FormInstance } from 'element-plus'
import { Login } from '../http/api'
import { useRouter } from 'vue-router'
export default defineComponent({
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()
    const rules = {
      userName: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 6, max: 24, message: '账号长度6-24之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 24, message: '密码长度6-24之间', trigger: 'blur' }
      ]
    }

    // const submitForm = () => {
    //   data.loginFormRef?.validate((valid) => {
    //     if (valid) {
    //       console.log('ok')
    //     }
    //   })
    // }

    const submitForm = (loginFormRef: FormInstance) => {
      loginFormRef.validate(async (valid: boolean) => {
        if (valid) {
          const res = await Login(data.loginForm)
          localStorage.setItem('token', res.data.token)
          router.push('/home')
        }
      })
    }

    return {
      ...toRefs(data),
      rules,
      submitForm
    }
  }
})
</script>

<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  background: url('../assets/img/14.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  display: flex;
  .demo-loginForm {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    margin: auto;
    .sub-btn {
      width: 100%;
    }
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
