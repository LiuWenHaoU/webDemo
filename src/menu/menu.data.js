/**
 * 菜单列表
 * key, path需要保持唯一
 * permKey表示权限Key值
 */
const menus = [
  {
    key: '/index',
    name: '首页',
    path: '/',
    icon: 'home',
    permKey: '/index',
  },
  {
    key: '/menu1',
    name: '菜单1',
    path: '/menu1',
    icon: 'setting',
    permKey: '/menu1',
    children: [
      {
        key: 'menu1-1',
        name: '菜单1-1',
        path: '/menu1/menu1-1',
        permKey: '/menu1/menu1-1',
        children: [],
        parentKey: '/menu1',
      },
      {
        key: 'menu1-2',
        name: '模板管理',
        path: '/temp/tempTableMgt',
        permKey: '/temp/tempTableMgt',
        children: [],
        parentKey: '/menu1',
      },
    ],
  },
];

export default menus;
