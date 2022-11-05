<template>
  <div class="flex items-center justify-center mt-12">
    <div class="grid w-max rounded-full bg-orange-500 p-1">
      <div
        class="col-start-1 row-start-1 flex h-10 w-10 animate-pulse items-center justify-center rounded-full text-white"
      >
        <fa :icon="faHourglassHalf"></fa>
      </div>
      <div
        class="col-start-1 row-start-1 animate-spin rounded-full border-4 border-white border-b-transparent"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
</script>

