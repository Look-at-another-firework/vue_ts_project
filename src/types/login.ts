import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
export interface LoginFormInt {
  userName: string
  password: string
}

export class InitData {
  loginForm: LoginFormInt = {
    userName: 'admin123',
    password: '123456'
  }

  loginFormRef = ref<FormInstance>()
}
