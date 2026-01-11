<script setup lang="ts">
  const props = defineProps<{
    cover_url: string
  }>()
</script>

<template>
  <img :src="cover_url" class="h-15 rounded" alt="" />
</template>
