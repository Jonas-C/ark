<script setup lang="ts">
import { Timer } from '@ark-ui/vue/timer'
</script>

<template>
  <Timer.Root
    :autoStart="true"
    :countdown="true"
    :startMs="5 * 1000"
    @complete="() => console.log('Timer completed')"
    @tick="(details) => console.log('Tick:', details.formattedTime)"
  >
    <Timer.Item type="seconds" />
  </Timer.Root>
</template>
