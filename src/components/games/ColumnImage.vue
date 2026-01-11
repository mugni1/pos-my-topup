<script setup lang="ts">
  const props = defineProps<{
    image_url: string
  }>()
</script>

<template>
  <img :src="image_url" class="h-15 rounded" alt="" />
</template>
