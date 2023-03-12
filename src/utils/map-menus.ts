import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null //用于'/main为访问路径时的重定向'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1.加载项目文件夹router/main中配置的所有routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context(),true表示搜索子文件夹
  const routeFiles = require.context('../router/main', true, /\.ts/)
  //routeFiles.keys()就可以获取到路径url了，例如0:"./analysis/dashboard/dashboard.ts"
  // console.log(routeFiles.keys())
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    // console.log(route)
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据userMenus来从所有的routes中挑选，最终返回
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        //2级菜单才需要添加路由
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) firstMenu = menu
      } else {
        //说明不是2级菜单，那么就递归调用
        _recurseGetRoute(menu.children)
      }
    }
  }
  //调用递归函数，完成userMenus=>routes的映射
  _recurseGetRoute(userMenus)
  return routes
}

//将路径映射为面包屑组件所需要的参数
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

//将路径映射为菜单项
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        //说明找到了匹配的二级菜单，这时要把1级菜单和2级菜单都存放到breadcrumbs，供面包屑组件使用
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
