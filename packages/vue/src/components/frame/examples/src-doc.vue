<script lang="ts" setup>
import { Frame } from '@ark-ui/vue/frame'

const srcDoc = `<html><head>
<link href="//use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css" />
<base target=_blank>
</head><body style='overflow: hidden'><div class='frame-root'></div></body></html>`
</script>

<template>
  <Frame title="Custom Frame" :style="{ border: '1px solid #ccc', width: '100%' }" :src-doc="srcDoc">
    <h1 style="font-family: 'Open Sans', sans-serif">Hello from inside the frame!</h1>
    <p>This content is rendered within our custom frame component using a Portal.</p>
  </Frame>
</template>
