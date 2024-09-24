<template>
  <a-layout>
    <a-layout-content>
      <slot />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.ant-layout-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
