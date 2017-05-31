<template>
	<div class="text-center">
  	<canvas id="canvas" width="400" height="400"></canvas>
	</div>
</template>

<script>
	export default {
	   data: function () {
			return {
			}
		},

		props:{
			displayData: Array
		},

		methods:{
      paintCarMatrix(){
        //var canvas1 = document.getElementById("canvas");
        //var ctx = canvas1.getContext("2d");
        var ctx = this.$el.firstChild.getContext("2d");
        ctx.clearRect(0, 0, 600, 600);

        // test purpose
        ctx.fillStyle = "green";
        ctx.fillRect(200, 200, 40, 40);

        console.log("actual filteredArray length:  " + this.displayData.length);
        // calculate max Value of attr. for normilazation
        var maxAttrValue = 0;
        for (var i=0; i<this.displayData.length; i++){
            if (this.displayData[i].weight > maxAttrValue) maxAttrValue = this.displayData[i].weight; // TODO: generalize for other attr
        }
        /*
        // var maxAttr x-mal je nachdem wie viele features ausgewählt wurden
        switch (this.displayData.car) {
          case "weight":
            for (var i=0; i<this.displayData.length; i++){
                if (this.displayData[i].weight > maxAttrValue) maxAttrValue = this.displayData[i].weight;
            }
            return "Where was the circle?"
            break;
          default:
            break;
        }
        */
        var matrixDim = Math.sqrt(this.displayData.length); // TODO: nachkommastellen
        for(var i=0; i<matrixDim; i++){
          for(var j=0; j<matrixDim; j++){
            //ctx.fillStyle = 'rgb(' + (this.displayData[matrixDim*(j-1)+i].weight/(maxAttrValue/100)*2,55) + ',' + '0' + ',0)'; // TODO: normalization is currently %
            ctx.fillStyle = "green";
            ctx.fillRect(i*12, j*12, 10, 10);
          }
        }
      },
      
      /*,
      directives: {
      },
      updated(){
      },
      watch: { // also add in app.vue data: function(){} -> did not worked
        displayData: function(){
          this.paintCarMatrix();
        }
      }*/
    },
    watch: {
        displayData: function() {
          this.paintCarMatrix();
        }
      },
    mounted(){
        this.paintCarMatrix();
      }

  }
</script>

<style>
  canvas{}
</style>
