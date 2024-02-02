<script setup lang="ts">
import Aside from './components/Asdie.vue'
</script>
<template>
  <div class="container">
    <Aside class="side" />
    <RouterView class="routerview"></RouterView>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 1000px;
}

.side{
  width: 330px;
  overflow-y: scroll;
}


.routerview{
  flex-grow: 1;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgb(80, 80, 80);
}

</style>
