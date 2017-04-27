<template>
  <div id="app" class="text-center container">
    <h1 >Visualisation Task 1</h1>
    <mainComp></mainComp> 
  </div>
</template>

<script>
import MainComp from './components/mainComp.vue';
export default {
  name: 'app',
  components:{
    mainComp: MainComp
  }
  
}
</script>

<style>
.container{
  max-width: 900px;
}
</style>
