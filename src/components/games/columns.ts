import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToLocale } from '@/lib/date'
import type { GetGameType } from '@/types/game'
import ColumnImage from './ColumnImage.vue'
import ColumnCover from './ColumnCover.vue'
import DataTableActions from './DataTableActions.vue'

export const columns: ColumnDef<GetGameType>[] = [
    {
        accessorKey: 'imageUrl',
        header: () => {
            return h('div', { class: 'text-start' }, 'Image')
        },
        cell: ({ row }) => {
            return h(ColumnImage, {
                image_url: row.original.imageUrl,
            })
        },
    },
    {
        accessorKey: 'coverUrl',
        header: () => {
            return h('div', { class: 'text-start' }, 'Cover')
        },
        cell: ({ row }) => {
            return h(ColumnCover, {
                cover_url: row.original.coverUrl,
            })
        },
    },
    {
        accessorKey: 'title',
        header: () => {
            return h('div', { class: 'text-start' }, 'Name')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.title)
        },
    },
    {
        accessorKey: 'studio',
        header: () => {
            return h('div', { class: 'text-start' }, 'Studio')
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-start' }, row.original.studio)
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
