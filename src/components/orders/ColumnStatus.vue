<script setup lang="ts">
  import { Badge } from '../ui/badge'

  const props = defineProps<{
    status: string
  }>()
</script>

<template>
  <Badge class="capitalize" variant="default" v-if="props.status == 'paid'">
    {{ props.status }}
  </Badge>
  <Badge
    class="capitalize"
    variant="destructive"
    v-else-if="props.status == 'failed' || props.status == 'expired'"
  >
    {{ props.status }}
  </Badge>
  <Badge class="capitalize" variant="outline" v-else>
    {{ props.status }}
  </Badge>
</template>
