export interface ListInt {
  roleName: string
  roleId: number
  authority: any
}

interface SelectDataInt {
  roleName: string
  roleId: number
}

export class InitData {
  selectData: SelectDataInt = {
    roleName: '',
    roleId: 0
  }
  list: ListInt[] = []
  // listData: [ListInt][] = []
  isShow = false
}
