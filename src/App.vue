<script setup lang="ts">
import Aside from './components/Asdie.vue'
</script>
<template>
  <div class="container">
    <Aside class="side" />
    <RouterView class="routerview"></RouterView>
  </div>
</template>

<style>
.container{
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 1500px;
}

.side{
  width: 330px;
  overflow-y: scroll;
}



</style>
