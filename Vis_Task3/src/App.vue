<template>
  <div id="app">
    <div v-for="car in $carsData">
      {{car.car }} {{car.manufacturer }} {{car.mpg }} {{car.weight }} {{car.modelyear }}
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
      min: 15,
      max: 20
    };

    var filter3 = {
      prop: "manufacturer",
      value: "ford"
    };
    this.$carsData = this.$formatJson(JsonData);
    this.$carsData = this.$filterData(this.$carsData, filter1,filter2,filter3);
    console.log(this.$carsData);
  }
}
</script>

<style>

</style>
