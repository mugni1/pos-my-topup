<script setup lang="ts">
  const props = defineProps<{
    image_url: string
  }>()
</script>

<template>
  <div class="w-6/12 aspect-square">
    <img :src="image_url" alt="logo" class="w-full h-full object-cover object-center" />
  </div>
</template>
