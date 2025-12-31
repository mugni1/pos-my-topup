import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { CategoryType } from '@/types/categories'
import DataTableDropdown from './DataTableActions.vue'
import { formatDateToLocale } from '@/lib/date'

export const columns: ColumnDef<CategoryType>[] = [
    {
        accessorKey: 'No',
        enableSorting: false,
        header: () => {
            return h('div', { class: 'text-start' }, 'No.')
        },
        cell: ({ row, table }) => {
            const pageIndex = table.getState().pagination.pageIndex
            const pageSize = table.getState().pagination.pageSize
            const number = (pageIndex * pageSize) + row.index + 1
            return h('div', { class: 'text-start' }, number.toString())
        },
    },
    {
        accessorKey: 'id',
        header: () => {
            return h('div', { class: 'text-start' }, 'ID')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.id)
        },
    },
    {
        accessorKey: 'name',
        header: () => {
            return h('div', { class: 'text-start' }, 'Name')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.name)
        },
    },
    {
        accessorKey: 'code',
        header: () => {
            return h('div', { class: 'text-start' }, 'Code')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.code)
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
    {
        id: 'actions',
        enableHiding: false,
        enableSorting: false,
        header: () => {
            return h('div', { class: 'text-start' }, 'Actions')
        },
        cell: ({ row }) => {
            const original = row.original
            return h('div', { class: 'relative' }, h(DataTableDropdown, {
                data: original,
            }))
        },
    },
    // {
    //     accessorKey: 'amount',
    //     header: () => {
    //         return h('div', { class: 'text-start' }, 'Amount')
    //     },
    //     cell: ({ row }) => {
    //         const amount = row.original.amount
    //         const amountFormatted = new Intl.NumberFormat('id-ID', {
    //             style: 'currency',
    //             currency: 'IDR',
    //         }).format(amount)
    //         return h('div', { class: 'text-start' }, amountFormatted)
    //     },
    // },
]
