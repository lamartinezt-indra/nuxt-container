<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#004571',
        fontFamily: 'Fs Emeric',
      },
      components: {
        Layout: {
          colorBgBody: '#f9f8f7',
        },
        PageHeader: {
          colorTextHeading: '#fff',
        },
      },
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>

<style>
@font-face {
  font-family: 'Fs Emeric';
  src: url('@/assets/fonts/FSEMERIC-CORE.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

html,
body,
#__nuxt,
.ant-layout {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f9f8f7;
}
</style>
