<template>
  <a-card :bodyStyle="{ padding: '1rem' }">
    <div style="width: 100%">
      <a-typography-title :level="5" class="title">{{
        title
      }}</a-typography-title>
      <a-typography-title :level="3" class="count">{{
        count
      }}</a-typography-title>
    </div>
  </a-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped>
.title,
.count {
  margin: 0;
}
</style>
