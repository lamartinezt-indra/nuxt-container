<template>
  <a-row justify="center">
    <a-col span="8"
      ><a-input-search
        v-model:value="search"
        allowClear
        placeholder="Buscar aplicaciones..."
        class="search"
        @search="onSearch"
    /></a-col>
  </a-row>
  <a-row :gutter="[16, 16]">
    <a-col
      :span="12"
      v-for="(application, index) in filteredApplications"
      :key="index"
    >
      <application
        :name="application.name"
        :description="application.description"
        :link="application.link"
      />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref<string>('')
const { data } = await useFetch('/api/applications')
const { applications }: any = data.value

const filteredApplications = computed(() => {
  if (!search.value) {
    return applications || []
  }
  return applications.filter((application: any) =>
    application.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const onSearch = (searchValue: string) => {
  search.value = searchValue
}
</script>

<style scoped>
.search {
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
