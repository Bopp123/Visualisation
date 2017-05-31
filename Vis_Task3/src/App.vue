<template>
  <div id="app">
  <div class="flex">
    <div class="dataFilter">
      <dataFilter :attributes="attributes" :testObj="$carsData[0]"></dataFilter>
    </div>
    <div class= "main text-center">
        <div class="carMatrix">
      <carMatrix :displayData="displayData" :attributesToShow="attributesToShow"></carMatrix>
    </div>
      </div>
      <div class="attriFilter">
        <controls :attributes="attributes"></controls>
      </div>
    </div>
  </div>
</template>

<script>
import JsonData from '../cars.json';
import Controls from './components/attributeControlComp.vue';
import Filter from './components/filterComp.vue';
import CarMatrix from './components/carMatrixComp.vue';
import {eventBus} from "./main";
export default {
  name: 'app',
  components: {
    controls: Controls,
    dataFilter: Filter,
    carMatrix: CarMatrix
  },
  data() {
    return {
      attributes: [],
      attributesToShow: [],
      displayData: []
    }
  },
  methods: {
    init() {
      this.$carsData = this.$formatJson(JsonData);
      this.displayData = this.$carsData;

      for (let variable in this.$carsData[0]) {
        this.attributes.push(variable);
      }
    }
  },
  created() {
    this.init();

    // var filter2 = {
    //   prop: "mpg",
    //   min: 15,
    //   max: 20
    // };
    // var filter3 = {
    //   prop: "manufacturer",
    //   value: "ford"
    // };
    this.$carsData = this.$formatJson(JsonData);
    // this.displayData = this.$filterData(this.$carsData,[filter2]);


    /**
     * state control
     */
    eventBus.$on('attrChanged', (attr) => {
      if (this.attributesToShow.includes(attr)) {
        var index = this.attributesToShow.indexOf(attr);
        this.attributesToShow.splice(index, 1);
      } else {
        this.attributesToShow.push(attr);
      }
      console.log(this.attributesToShow);
    });

    eventBus.$on('filterChanged', (filters) => {
      if(filters.length !=0)
        this.displayData = this.$filterData(this.$carsData, filters);
      else
        this.displayData = this.$carsData;
    });
  }
}
</script>

<style>

.flex{
  display: flex;
}

.carMatrix{
  margin-top: 3%;
  margin-right: 2%;
  margin-left: 2%;
}

.attriFilter{
}

.main{
  margin-right: auto;
  margin-left: auto;
}

</style>
