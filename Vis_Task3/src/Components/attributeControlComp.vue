<template>
  <div class="inline attriMain">
    <h2>Choose Attributes</h2>
    <div v-for="attr in attributes" class="attri flex">
      <input type="checkbox" id="attr" value="attr" @change="attributeChanged(attr)">
      <label for="attr">{{attr}}</label>
    </div>
  </div>
</template>

<script>
import {eventBus} from "../main";
export default {
  data () {
    return {
      checkedAttr: [this.attributes.length]
    }
  },
  props:{
    attributes: Array
  },
  methods: {
    attributeChanged: function (attribute) {
      eventBus.$emit('attrChanged', attribute);
    }
  },
  created(){
  }
}
</script>

<style scoped>
input[type='checkbox'] {
    -webkit-appearance:none;
    width:30px;
    height:30px;
    background:white;
    border-radius:5px;
    border:2px solid #555;
}
input[type='checkbox']:checked {
    background: black;
}

label{
  font-size: 25px;
}

.attri{
  margin-right: 20px;
  margin-bottom: 20px;
}

.attriMain {
  max-width: 1000px;
}

h2{
  margin-bottom: 20px;
  border-bottom: 1px solid black;
}

</style>
