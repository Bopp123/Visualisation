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
    formatJson: function(file) {

      var result = [];
      var keyNames = [];
      file.forEach((element, index) => {
        if (index == 0) {
           keyNames = element;
           console.log(keyNames);
        } else {
          var obj = {};
          element.forEach((entry, index2) => {
            let prop = keyNames[index2].toLowerCase().replace(" ","");
            obj[prop] = entry;
          })
          result.push(obj)
        } 
      });
      return result;
    }
  },
  created() {
    this.$carsData = this.formatJson(JsonData);
    console.log(this.$carsData);
  }
}
</script>

<style>

</style>
