<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { columns } from '@/components/games/columns'
  import DataTable from '@/components/table/DataTable.vue'
  import { provide } from 'vue'
  import CreateCategoryForm from '@/components/categories/CreateCategoryForm.vue'
  import type { SortColumnType } from '@/types/global.type'
  import { useGetGames } from '@/hooks/useGetGames'

  // STATE
  const search = ref('')
  const currentPage = ref(1)
  const itemPerPage = ref(5)
  const orderBy = ref('id')
  const sortBy = ref<'asc' | 'desc'>('desc')
  const tableParams = computed(() => ({
    limit: itemPerPage.value,
    orderBy: orderBy.value,
    sortBy: sortBy.value,
    page: currentPage.value,
    search: search.value,
  }))
  provide('tableParams', tableParams)

  // HOOKS
  const { data, isPending, isError, isFetching, refetch } = useGetGames(tableParams)

  // METHODS
  const handleChangePage = (value: number) => {
    currentPage.value = value
  }
  const handleChangeKeyword = (value: string) => {
    search.value = value
    currentPage.value = 1
  }
  const handleChangeSortColumn = (value: SortColumnType) => {
    orderBy.value = value.columnId
    if (value.direction == null) {
      sortBy.value = 'desc'
    } else {
      sortBy.value = value.direction
    }
  }
  const handleRefetch = () => {
    refetch()
  }
</script>

<template>
  <DataTable
    :columns="columns"
    :data="data?.data || []"
    :is-pending="isPending"
    :is-fetching="isFetching"
    :is-error="isError"
    :total="data?.meta?.total || 0"
    :status-code="data?.status || 500"
    :current-page="currentPage"
    :item-per-page="itemPerPage"
    :message="data?.message || 'Internal Server Error'"
    @keyword="handleChangeKeyword"
    @goto-page="handleChangePage"
    @sort-change="handleChangeSortColumn"
    @refetch="handleRefetch"
  >
    <template #create-slot>
      <CreateCategoryForm />
    </template>
  </DataTable>
</template>
