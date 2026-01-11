<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '../ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem class="block">
        <BreadcrumbLink class="capitalize">
          <RouterLink :to="$route.path">
            {{ $route.name }}
          </RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
