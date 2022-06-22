import $http from './index'
interface LoginData {
  userName: string
  password: string
}

export const Login = (data: LoginData) =>
  $http({
    url: '/login',
    method: 'POST',
    data
  })

export const getList = (data: any) =>
  $http({
    url: '/getList',
    method: 'get',
    data
  })

export const getUserList = () =>
  $http({
    url: '/getUserList',
    method: 'get'
  })

export const getRoleList = () =>
  $http({
    url: '/getRoleList',
    method: 'get'
  })

export const getAuthorityList = () =>
  $http({
    url: '/geTauthority',
    method: 'get'
  })

export const getRouter = () =>
  $http({
    url: '/getRouter',
    method: 'get'
  })
