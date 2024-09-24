<template>
  <a :href="link">
    <a-card style="width: 100%">
      <div class="icon"><CodeSandboxOutlined /></div>
      <a-typography-title :level="4" class="title">{{
        name
      }}</a-typography-title>
      <a-typography-text class="description">{{
        description
      }}</a-typography-text>
    </a-card>
  </a>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
})
</script>

<style>
.ant-card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  background-color: #f0f0f0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0;
}

.title {
  font-weight: bold;
}
</style>
