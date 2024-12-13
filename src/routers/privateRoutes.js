const authRoutes = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/DashBoardPage.vue')
      }
    ]
  },
  {
    path: '/merchants',
    children: [
      {
        path: '',
        name: 'Merchants',
        component: () => import('@/pages/merchants/MerchantsPage.vue')
      },
      {
        path: 'create',
        name: 'CreateMerchant',
        component: () => import('@/pages/merchants/create-merchant/CreateMerchantPage.vue')
      }
    ]
  },
  {
    path: '/orders',
    children: [
      {
        path: '',
        name: 'Orders',
        component: () => import('@/pages/orders/OrdersPage.vue')
      },
      {
        path: 'create',
        name: 'CreateOrder',
        component: () => import('@/pages/orders/create-order/CreateOrderPage.vue')
      },
      {
        path: ':consignmentId',
        name: 'OrderDetails',
        component: () => import('@/pages/orders/order-details/index.vue'),
        props: true
      }
    ]
  },
  {
    path: '/users',
    children: [
      {
        path: '',
        name: 'Users',
        component: () => import('@/pages/users/UsersPage.vue')
      },
      {
        path: 'create',
        name: 'CreateUser',
        component: () => import('@/pages/users/create-user/CreateUserPage.vue')
      }
    ]
  },
  {
    path: '/stores',
    children: [
      {
        path: '',
        name: 'Stores',
        component: () => import('@/pages/stores/StoresPage.vue')
      },
      {
        path: 'create',
        name: 'CreateStore',
        component: () => import('@/pages/stores/create-store/CreateStorePage.vue')
      }
    ]
  },
  {
    path: '/invoices',
    children: [
      {
        path: '',
        name: 'Invoices',
        component: () => import('@/pages/invoices/InvoicesPage.vue')
      },
      {
        path: 'orderwise',
        name: 'OrderWiseInvoices',
        component: () => import('@/pages/invoices/order-wise/InvoicesPage.vue'),
        props: true
      }
    ]
  },
  {
    path: '/customers',
    children: [
      {
        path: '',
        name: 'Customers',
        component: () => import('@/pages/customers/CustomersPage.vue')
      },
      {
        path: ':id/details',
        name: 'CustomerDetails',
        component: () => import('@/pages/customers/details/index.vue'),
        props: true
      }
    ]
  },
  {
    path: '/operators',
    children: [
      {
        path: '',
        name: 'Operators',
        component: () => import('@/pages/operators/OperatorsPage.vue')
      },
      {
        path: 'create',
        name: 'CreateOperator',
        component: () => import('@/pages/operators/create-operator/CreateOperatorPage.vue'),
        props: true
      }
    ]
  },
  {
    path: '/profile',
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('@/pages/profile/ProfilePage.vue')
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('@/pages/profile/change-password/index.vue')
      },
      {
        path: 'payment-info',
        name: 'PaymentInfo',
        component: () => import('@/pages/profile/payment-info/index.vue')
      }
    ]
  }
];

export default authRoutes;
