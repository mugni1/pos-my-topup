<script setup lang="ts" generic="TData, TValue">
  import { computed, ref, watch } from 'vue'
  import type { ColumnDef, SortingState, Updater } from '@tanstack/vue-table'
  import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable,
  } from '@tanstack/vue-table'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
  } from '../ui/pagination'
  import { ArrowDown, ArrowDownUp, ArrowUp, Loader2, SearchIcon } from 'lucide-vue-next'
  import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
  import { useDebounceFn } from '@vueuse/core'
  import { useSidebar } from '../ui/sidebar'
  import { Button } from '../ui/button'

  // INIT ANU
  const { isMobile } = useSidebar()

  // EMITS
  const emits = defineEmits<{
    (e: 'gotoPage', value: number): void
    (e: 'keyword', value: string): void
    (e: 'sortChange', value: { columnId: string; direction: 'asc' | 'desc' | null }): void
    (e: 'refetch'): void
  }>()

  // PROPS
  const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    isPending: boolean
    isFetching: boolean
    isError: boolean
    statusCode: number
    data: TData[]
    total: number
    currentPage: number
    itemPerPage: number
    message: string
  }>()

  // STATE
  const totalPages = computed(() => Math.ceil(props.total / props.itemPerPage))
  const sorting = ref<SortingState>([])
  const keywordTemp = ref('')

  // SORTING
  const handleSorting = (updater: Updater<SortingState>) => {
    if (typeof updater === 'function') {
      sorting.value = updater(sorting.value)
    } else {
      sorting.value = updater
    }
    if (sorting.value.length > 0) {
      const sort = sorting.value[0]
      emits('sortChange', {
        columnId: sort?.id || '',
        direction: sort?.desc ? 'desc' : 'asc',
      })
    } else {
      emits('sortChange', {
        columnId: '',
        direction: null,
      })
    }
  }

  // INIT TABLE
  const table = useVueTable({
    state: {
      get sorting() {
        return sorting.value
      },
      get pagination() {
        return { pageIndex: props.currentPage - 1, pageSize: props.itemPerPage }
      },
    },
    get data() {
      return props.data
    },
    get columns() {
      return props.columns
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onSortingChange: handleSorting,
  })

  // METHODS
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      emits('gotoPage', page)
    }
  }
  const handleRefetch = () => {
    emits('refetch')
  }

  // DEBOUNCE
  const emitsKeywordDebounce = useDebounceFn((value: string) => {
    emits('keyword', value)
  }, 1000)

  //WATCHER
  watch(keywordTemp, (newValue) => {
    emitsKeywordDebounce(newValue)
  })
</script>

<template>
  <!-- SEARCH  -->
  <div class="flex flex-col md:flex-row justify-between gap-2">
    <InputGroup class="max-w-sm">
      <InputGroupInput placeholder="Search..." v-model="keywordTemp" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
    <slot name="create-slot"></slot>
  </div>

  <!-- TABLE  -->
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <div class="flex gap-2 items-center">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
              <span v-if="header.column.getCanSort()" class="text-gray-400">
                <ArrowDown v-if="header.column.getIsSorted() == 'desc'" class="size-4" />
                <ArrowUp v-else-if="header.column.getIsSorted() == 'asc'" class="size-4" />
                <ArrowDownUp v-else class="size-4" />
              </span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <!-- 1. Loading State -->
        <template v-if="isPending">
          <TableRow>
            <TableCell :colspan="columns.length" class="py-10">
              <Loader2 class="size-5 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        </template>

        <!-- 2. Empty State or Error-->
        <template v-else-if="!table.getRowModel().rows?.length || isError">
          <TableRow>
            <TableCell :colspan="columns.length" class="py-10 text-center">
              <div class="flex flex-col items-center gap-2">
                <span v-if="statusCode == 200" class="capitalize"> No Results </span>
                <span v-else class="text-destructive capitalize">{{ message }}</span>
                <Button
                  v-if="statusCode != 200"
                  variant="outline"
                  class="text-xs"
                  size="sm"
                  @click="handleRefetch"
                >
                  <Loader2 :class="isFetching && 'animate-spin'" />
                  <span v-if="isFetching">Loading..</span>
                  <span v-else>Try Again</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </template>

        <!-- 3. Data State -->
        <template v-else>
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>

  <!-- PAGINATION -->
  <div
    v-if="!isError && total > 0"
    class="flex flex-col-reverse lg:flex-row gap-2 items-center justify-between"
  >
    <div class="text-sm">
      Showing {{ (currentPage - 1) * itemPerPage + 1 }} to
      {{ Math.min(currentPage * itemPerPage, total) }} of {{ total }} results
    </div>

    <div class="flex fle gap-6">
      <Pagination
        v-slot="{ page }"
        :items-per-page="itemPerPage"
        :total="total"
        :page="currentPage"
        :sibling-count="isMobile ? 1 : 2"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationFirst @click="goToPage(1)" />
          <PaginationPrevious @click="goToPage(currentPage - 1)" />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
              @click="goToPage(item.value)"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else />
          </template>
          <PaginationNext @click="goToPage(currentPage + 1)" />
          <PaginationLast @click="goToPage(totalPages)" />
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>
