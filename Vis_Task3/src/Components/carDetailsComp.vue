<template>
  <div v-if="car !== ''">  
    <h2>Details:</h2>
    <p>{{car.manufacturer}} {{car.car}} 19{{car.modelyear}}, {{car.origin}}</p>
    <p>Verbrauch in l/100km: {{kml}}</p>
    <p>Zylinder: {{car.cylinders}}</p>
    <p>Hubraum in ccm: {{ccm}}</p>
    <p>PS: {{car.horsepower}}</p>
    <p>Gewicht in kg: {{kg}}</p>
    <p>Von 0 auf 100: {{car.acceleration}}s</p>
  </div>
</template>

<script>
import {
  eventBus
} from "../main";
export default {
  data() {
      return {
        car: ''
      }
    },
    methods: {
      
    },
    computed: {
      kml: function () {
        return (235/this.car.mpg).toFixed(2);
      },
      ccm: function () {
        return Math.round(this.car.displacement * 16.387);
      },
      kg: function () {
        return Math.round(this.car.weight*0.45);
      }
    },
    watch: {

    },
    created(){
      eventBus.$on('carClicked', (car) => {  
        this.car = car;
      })
    }
}
</script>

<style>
  p{
    font-size: 1.5vw;
  }
</style>
