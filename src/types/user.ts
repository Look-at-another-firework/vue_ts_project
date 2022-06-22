export interface ListInt {
  id: number
  nikeName: string
  userName: string
  role: RoleList[]
}

export interface ActiveInt {
  id: number
  nikeName: string
  userName: string
  role: number[]
}

interface RoleList {
  role: number
  roleName: string
}

interface SelectDataInt {
  nikeName: string
  role: number
}

interface RoleList {
  roleName: string
  roleId: number
  suthorty: number[]
}

export class InitData {
  selectData: SelectDataInt = {
    nikeName: '',
    role: 0
  }
  list: [ListInt][] = []
  listData: [ListInt][] = []
  roleList: RoleList[] = []
  active: ActiveInt = {
    id: 0,
    nikeName: '',
    userName: '',
    role: []
  }
  isShow = false
}
