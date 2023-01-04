import store from '@/state/store'

export default [{
    path: '/login',
    name: 'login',
    component: () => import('../views/pages/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({
            name: 'home'
          })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/auth/login-1',
    name: 'login-1',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/auth/login-1')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/dashboard/index')
  },
  {
    path: '/product/productlist',
    name: 'Items',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/product/productlist')
  },
  {
    path: '/product/additems',
    name: 'Add Items',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/product/additems')
  },
  {
    path: '/productcategory/productcategory',
    name: 'Item Category',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/productcategory/productcategory')
  },
  {
    path: '/productcategory/productcategoryadd',
    name: 'Item Category Add',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/productcategory/productcategoryadd')
  },
  {
    path: '/productmodifier/productmodifier',
    name: 'Item Modifier',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/productmodifier/productmodifier')
  },
  {
    path: '/productmodifier/productmodifieradd',
    name: 'Item Modifier Add',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/productmodifier/productmodifieradd')
  },
  {
    path: '/productdiscount/productdiscount',
    name: 'Item Discount',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/productdiscount/productdiscount')
  },
  {
    path: '/productdiscount/productdiscountadd',
    name: 'Item Discount Add',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/productdiscount/productdiscountadd')
  },
  
  {
    path: '/employee/employeelist',
    name: 'Employee',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/employee/employeelist')
  },
  {
    path: '/employee/employeeadd',
    name: 'Item Modifier Add',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/employee/employeeadd')
  },
  {
    path: '/employerole/employeeroleadd',
    name: 'Item Discount',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/employerole/employeeroleadd')
  },
  {
    path: '/employerole/employeerolelist',
    name: 'Item Discount Add',
    meta: {
      authRequired: true
    },
    component: () => import('../views/pages/employerole/employeerolelist')
  },
]