<template>
  <div id="app">
    <div v-for="car in $carsData">
      {{car.car }} {{car.canufacturer }} {{car.mpg }} {{car.weight }} {{car.modelyear }}
    </div>
    
  </div>
</template>

<script>
import JsonData from '../cars.json';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
  },
  created() {
    var filter1 = {
      prop: "modelyear",
      min: 71,
      max: 80
    };
    var filter2 = {
      prop: "mpg",
      max: 20
    };
    this.$carsData = this.$formatJson(JsonData);
    this.$carsData = this.$filterData(this.$carsData, filter1,filter2);
    console.log(this.$carsData);
  }
}
</script>

<style>

</style>
