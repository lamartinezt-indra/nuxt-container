<template>
  <a-row :gutter="[16, 16]">
    <a-col span="8">
      <couter title="Total de Usuarios" :count="data.usuarios.length" />
    </a-col>
    <a-col span="8">
      <couter
        title="Usuarios con Entra ID"
        :count="data.usuarios.filter((usuario: any) => usuario.entraID === 'Y').length"
      />
    </a-col>
    <a-col span="8">
      <couter
        title="Usuarios sin Entra ID"
        :count="data.usuarios.filter((usuario: any) => usuario.entraID === 'N').length"
      />
    </a-col>
  </a-row>
  <br />
  <a-row :gutter="[16, 16]">
    <a-col span="24">
      <a-table :dataSource="usuarios" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'perfilFuncionalCodigo'">
            <div v-if="record.perfilFuncionalCodigo === 5">App 1</div>
            <div v-else>App 2</div>
          </template>
          <template v-if="column.dataIndex === 'entraID'">
            <div v-if="record.entraID === 'Y'">Habilitado</div>
            <div v-else>No Habilitado</div>
          </template>
        </template>

        <template
          #customFilterDropdown="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
          }"
        >
          <div style="padding: 8px">
            <a-input
              ref="searchInput"
              :placeholder="`Buscar ${column.dataIndex}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="
                (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
              "
              @pressEnter="
                handleSearch(selectedKeys, confirm, column.dataIndex)
              "
            />
            <a-button
              type="primary"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
            >
              <template #icon><SearchOutlined /></template>
              Buscar
            </a-button>
            <a-button
              size="small"
              style="width: 90px"
              @click="handleReset(clearFilters)"
            >
              Limpiar
            </a-button>
          </div>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
const { data } = await useFetch<any>('')

const searchInput = ref()
const state = reactive({
  searchText: '',
  searchedColumn: '',
})

const { usuarios } = data.value

const uniquePerfilFuncional = new Set(
  usuarios.map((usuario: any) => usuario.perfilFuncional)
)
const uniqueEntraIDs = new Set(usuarios.map((usuario: any) => usuario.entraID))
const uniqueAplicaciones = new Set(
  usuarios.map((usuario: any) => (usuario.perfilFuncionalCodigo === 5 ? 5 : 0))
)

const filtersPerfilFuncional = Array.from(uniquePerfilFuncional).map(
  (perfilFuncional) => ({
    text: perfilFuncional,
    value: perfilFuncional,
  })
)

const filtersEntraID = Array.from(uniqueEntraIDs).map((entraID) => ({
  text: entraID === 'Y' ? 'Habilitado' : 'No Habilitado',
  value: entraID,
}))

const filtersAplicaciones = Array.from(uniqueAplicaciones).map(
  (aplicacion) => ({
    text: aplicacion === 5 ? 'App 1' : 'App 2',
    value: aplicacion,
  })
)

const columns: any = [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    customFilterDropdown: true,
    onFilter: (value: any, record: any) =>
      record.nombre.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'Apellido',
    dataIndex: 'apellido',
    key: 'apellido',
    customFilterDropdown: true,
    onFilter: (value: any, record: any) =>
      record.apellido.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
  {
    title: 'Perfil Funcional',
    dataIndex: 'perfilFuncional',
    key: 'perfilFuncional',
    filters: filtersPerfilFuncional,
    onFilter: (value: string, record: any) =>
      record.perfilFuncional.indexOf(value) === 0,
  },
  {
    title: 'Aplicación',
    dataIndex: 'perfilFuncionalCodigo',
    key: 'perfilFuncionalCodigo',
    filters: filtersAplicaciones,
    onFilter: (value: number, record: any) => {
      const transformedValue = record.perfilFuncionalCodigo === 5 ? 5 : 0
      return transformedValue === value
    },
  },
  {
    title: 'Entra ID',
    dataIndex: 'entraID',
    key: 'entraID',
    filters: filtersEntraID,
    onFilter: (value: string, record: any) =>
      record.entraID.indexOf(value) === 0,
  },
  {
    title: 'Fecha de Habilitación de Entra ID',
    dataIndex: 'fechaEntraID',
    key: 'fechaEntraID',
    customFilterDropdown: true,
    onFilter: (value: any, record: any) =>
      record.fechaEntraID
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus()
        }, 100)
      }
    },
  },
]

const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
  confirm()
  state.searchText = selectedKeys[0]
  state.searchedColumn = dataIndex
}

const handleReset = (clearFilters: any) => {
  clearFilters({ confirm: true })
  state.searchText = ''
}
</script>
