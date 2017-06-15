<template>
  <div id="app">
  <div class="flex">
    <div class="dataFilter">
      <dataFilter :attributes="attributes" :testObj="$carsData[0]"></dataFilter>
      <detailsComp></detailsComp>
    </div>
    <div class= "main text-center">
      <div class="carMatrix">
        <chart :displayData="displayData" :attributesToShow="attributesToShow"></chart>
      </div>
    </div>
    </div>
    <div class="attriFilter">
        <controls :attributes="attributes"></controls>
      </div>
  </div>
</template>

<script>
import JsonData from '../cars.json';
import Controls from './components/attributeControlComp.vue';
import Details from './components/carDetailsComp.vue';
import Filter from './components/filterComp.vue';
import Chart from './components/chartComp.vue';
import {eventBus} from "./main";
export default {
  name: 'app',
  components: {
    controls: Controls,
    dataFilter: Filter,
    chart: Chart,
    detailsComp: Details
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

.dataFilter{
  width: 25%;
}

.main{
  margin-right: auto;
  margin-left: auto;
}

</style>
