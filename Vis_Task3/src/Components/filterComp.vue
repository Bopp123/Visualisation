<template>
  <div>  
    <h2>Filter Data</h2>
    <div class="flex newFilter">
      <select v-model="selected">
        <option disabled value="">Please Select</option>
        <option v-for="attri in attributes" v-bind:value="attri">
          {{ attri }}
        </option>
      </select>
      <div v-if="selectedAttriTypeOfNumber" class="flex">
        <input type="number" id="min" v-model="min">
        <p> - </p>
        <input type="number" id="max" v-model="max">
      </div>
      <div v-else> 
        <input type="text" v-model="value">
      </div>
      <button class="btn btn-primary" @click="addFilter">+</button>
    </div>
    <div class="selectedFilters">
      <div v-for="filter in filters" class="flex">
        <span>{{filter.prop}}: </span>
        <span v-if="filter.value"> {{ filter.value}}</span>
        <span v-if="filter.min"> {{filter.min}}</span>
        <span v-if="filter.max"> - {{filter.max}}</span>
        <button class="btn btn-danger" @click="removeFilter(filter)">-</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  eventBus
} from "../main";
export default {
  data() {
      return {
        selected: "",
        value: "Please enter value",
        min: 0,
        max: 0,
        filters: []
      }
    },
    props: {
      attributes: Array,
      testObj: Object
    },
    methods: {
      addFilter() {
        let filter = {};
        filter.prop = this.selected;
        if (this.selectedAttriTypeOfNumber) {
          if (this.min > 0) filter.min = this.min;
          if (this.max > 0) filter.max = this.max;
        } else {
          filter.value = this.value;
        }
        this.filters.push(filter);
      },
      removeFilter(filter){
        let index = this.filters.indexOf(filter);
        this.filters.splice(index,1);
      }
    },
    computed: {
      selectedAttriTypeOfNumber: function() {
        var value = parseInt(this.testObj[this.selected]);
        if (!isNaN(value))
          return true;
        else
          return false;
      }
    },
    watch: {
      filters: function() {
        eventBus.$emit('filterChanged', this.filters);
        console.log(this.filters);
      }
    }
}
</script>

<style>

input[type='number']{
  width: 50px;
}

input{
   margin-left: 10px;
}

.btn{
  margin-left: auto;
}

.newFilter{
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}

select{
  width: 110px;
}

</style>
