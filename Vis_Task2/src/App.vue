<template>
  <div id="app" class="text-center container">
    <h1 class="header">Visualization Task 2</h1>
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

.header{
	margin-bottom: 50px;
}
</style>
