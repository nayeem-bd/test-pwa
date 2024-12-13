import { computed } from 'vue';

export default function useSideMenu() {
  const menuItems = computed(() => {
    return [
      {
        key: 'home',
        label: 'Home',
        icon: 'fa-solid:home',
        to: '/'
      },
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'fa-solid:chart-area',
        to: '/dashboard'
      },
      {
        key: 'orders',
        label: 'Orders',
        icon: 'fa-solid:box-open',
        children: [
          {
            label: 'All Orders',
            to: '/orders'
          },
          {
            label: 'Create Order',
            to: '/orders/create'
          }
        ]
      },
      {
        key: 'stores',
        label: 'Stores',
        icon: 'fa-solid:store',
        children: [
          {
            label: 'All Stores',
            to: '/stores'
          },
          {
            label: 'Create Store',
            to: '/stores/create'
          }
        ]
      },
      {
        key: 'invoices',
        label: 'Invoices',
        icon: 'fa-solid:receipt',
        children: [
          {
            label: 'All Invoices',
            to: '/invoices'
          },
          {
            label: 'Order Wise Payment',
            to: '/invoices/orderwise'
          }
        ]
      },
      {
        key: 'customers',
        label: 'Customers',
        icon: 'fa-solid:users',
        to: '/customers'
      },
      {
        key: 'operators',
        label: 'Operators',
        icon: 'fa-solid:user',
        to: '/operators'
      }
    ];
  });

  return { menuItems };
}
