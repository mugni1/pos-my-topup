import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToLocale } from '@/lib/date'
import DataTableActions from './DataTableActions.vue'
import type { ItemType } from '@/types/items'
import ColumnImage from './ColumnImage.vue'

export const columns: ColumnDef<ItemType>[] = [
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
        accessorKey: 'imageUrl',
        header: () => {
            return h('div', { class: 'text-start' }, 'Image')
        },
        cell: ({ row }) => {
            return h(ColumnImage, { image_url: row.original.imageUrl })
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
        accessorKey: 'price',
        header: () => {
            return h('div', { class: 'text-start' }, 'Price')
        },
        cell: ({ row }) => {
            const price = row.original.price
            const priceFormated = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(price)
            return h('div', { class: 'text-start' }, priceFormated)
        },
    },
    {
        accessorKey: 'category.name',
        enableSorting: false,
        header: () => {
            return h('div', { class: 'text-start' }, 'Category Name')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.category.name)
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
        accessorKey: 'updatedAt',
        header: () => {
            return h('div', { class: 'text-start' }, 'Updated At')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, formatDateToLocale(row.original.updatedAt))
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
            return h('div', { class: 'relative' }, h(DataTableActions, {
                data: original,
            }))
        },
    },
]
