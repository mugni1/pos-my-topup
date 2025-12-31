<script setup lang="ts">
import type { CategoryTable } from '@/types/categories';
import { Badge } from '../ui/badge';

const props = defineProps<{
    category: CategoryTable
}>()
</script>

<template>
    <Badge v-if="category.status == 'pending'" class="capitalize" variant="secondary">
        {{ category.status }}
    </Badge>
    <Badge v-if="category.status == 'canceled'" class="capitalize" variant="destructive">
        {{ category.status }}
    </Badge>
    <Badge v-if="category.status == 'paid'" class="bg-emerald-500 text-white dark:bg-emerald-600 capitalize"
        variant="secondary">
        {{ category.status }}
    </Badge>
</template>