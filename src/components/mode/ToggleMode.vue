<script setup lang="ts">
  import { useColorMode } from '@vueuse/core'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '../ui/dropdown-menu'
  import { Button } from '../ui/button'
  import { Monitor, Moon, Sun, X } from 'lucide-vue-next'
  import { motion } from 'motion-v'

  const isOpenMode = defineModel<boolean>()
  const mode = useColorMode()
</script>

<template>
  <DropdownMenu v-model:open="isOpenMode">
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="h-7 w-7">
        <motion.div
          class="absolute"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: !isOpenMode ? 1 : 0, y: !isOpenMode ? 0 : 20 }"
          :transition="{ duration: 0.2 }"
        >
          <Moon v-if="mode === 'dark'" />
          <Sun v-else-if="mode === 'light'" />
          <Monitor v-else />
        </motion.div>
        <motion.div
          class="absolute"
          :initial="{ opacity: 0, y: -20 }"
          :animate="{ opacity: isOpenMode ? 1 : 0, y: isOpenMode ? 0 : -20 }"
          :transition="{ duration: 0.2 }"
        >
          <X />
        </motion.div>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'"><Sun /> Light</DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'"><Moon /> Dark</DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'"><Monitor /> System</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
