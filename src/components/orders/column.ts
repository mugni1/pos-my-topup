import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToLocale } from '@/lib/date'
import type { GetOrderType } from '@/types/order'

export const columns: ColumnDef<GetOrderType>[] = [
    {
        accessorKey: 'trxId',
        header: () => {
            return h('div', { class: 'text-start' }, 'Transaction ID')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.trxId)
        },
    },
    {
        accessorKey: 'destination',
        header: () => {
            return h('div', { class: 'text-start' }, 'Destination')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.destination)
        },
    },
    {
        accessorKey: 'grossAmount',
        header: () => {
            return h('div', { class: 'text-start' }, 'Gross Amount')
        },
        cell: ({ row }) => {
            const price = row.original.grossAmount
            const priceFormated = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(price)
            return h('div', { class: 'text-start' }, priceFormated)
        },
    },
    {
        enableSorting: false,
        accessorKey: 'user.email',
        header: () => {
            return h('div', { class: 'text-start' }, 'Email')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.user.email)
        },
    },

    {
        accessorKey: 'status',
        header: () => {
            return h('div', { class: 'text-start' }, 'Status')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.status)
        },
    },
    {
        accessorKey: 'createdAt',
        header: () => {
            return h('div', { class: 'text-start' }, 'Created At')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, formatDateToLocale(row.original.createdAt))
        },
    },
]
