<template>
  <Table>
    <TableCaption>A list of your return to vendor orders.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Order Id</TableHead>
        <TableHead>Created Date</TableHead>
        <TableHead>Destination Hub</TableHead>
        <TableHead>Receiver</TableHead>
        <TableHead>Phone Number</TableHead>
        <TableHead>COD amount</TableHead>
        <TableHead>Sale Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="order in orders"
        :key="order.order"
      >
        <TableCell>{{ order.orderId }}</TableCell>
        <TableCell>{{ order.date }}</TableCell>
        <TableCell>{{ order.destinationBranch }}</TableCell>
        <TableCell>{{ order.receiverName }}</TableCell>
        <TableCell>{{ order.phoneNumber }}</TableCell>
        <TableCell>{{ order.codAmount }}</TableCell>
        <TableCell>{{ order.saleStatus }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const orders = [
  {
    orderId: 'DJNEHVY01',
    date: '2024-04-23',
    destinationBranch: 'Dhanmondi',
    receiverName: 'Younus',
    phoneNumber: '01711211911',
    codAmount: 1234,
    saleStatus: 'delivered'
  },
  {
    orderId: 'DJNEHVC02',
    date: '2024-04-12',
    destinationBranch: 'Banani',
    receiverName: 'Nayeem',
    phoneNumber: '01711121711',
    codAmount: 1234,
    saleStatus: 'delivered'
  },
  {
    orderId: 'DJNEHV003',
    date: '2024-04-23',
    destinationBranch: 'Dhanmondi',
    receiverName: 'Faysal',
    phoneNumber: '01719811111',
    codAmount: 1234,
    saleStatus: 'delivered'
  },
  {
    orderId: 'DJNEHV004',
    date: '2024-04-01',
    destinationBranch: 'Barishal',
    receiverName: 'Sagar',
    phoneNumber: '01711291111',
    codAmount: 1234,
    saleStatus: 'delivered'
  },
  {
    orderId: 'DJNEHV005',
    date: '2024-04-23',
    destinationBranch: 'Dhanmondi',
    receiverName: 'Younus',
    phoneNumber: '01711111111',
    codAmount: 1234,
    saleStatus: 'delivered'
  },
  {
    invoice: 'INV006',
    paymentStatus: 'delivered',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer'
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card'
  }
];
</script>
