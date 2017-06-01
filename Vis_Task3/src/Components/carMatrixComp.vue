<template>
	<div class="text-center">
  	<canvas id="canvas" width="600" height="600" @click="getCarInfo"></canvas>
	</div>
</template>

<script>
import {eventBus} from "../main";
	export default {
	   data: function () {
			return {
				width: 600,
				height: 600,
				matrixDim: 0
			}
		},

		props:{
			displayData: Array,
			attributesToShow: Array
		},

		methods:{
		getCarInfo() {
			const x = event.layerX;
			const y = event.layerY;
			const tileSize = (this.width/this.matrixDim)+1;
			const index = ((Math.ceil(y/tileSize)-1)*this.matrixDim)+(Math.ceil(x/tileSize));
			console.log(index);
			eventBus.$emit('carClicked', this.displayData[index-1]);
		},
      paintCarMatrix(){
        var ctx = this.$el.firstChild.getContext("2d");

				ctx.clearRect(0, 0, this.width, this.height);
				// Background
				//ctx.fillStyle = "black";
				//ctx.fillRect(0, 0, this.width, this.height);

				if (this.attributesToShow.length !== 0){
					var maxMPG = 0;
					var maxCylinders = 0;
					var maxDisplacement = 0;
					var maxHorsepower = 0;
					var maxWeight = 0;
					var maxAcceleration = 0;
					var minMPG = Infinity;
					var minCylinders = Infinity;
					var minDisplacement = Infinity;
					var minHorsepower = Infinity;
					var minWeight = Infinity;
					var minAcceleration = Infinity;
          for (var i=0; i<this.displayData.length; i++){
          				var mpg = Number.parseInt(this.displayData[i].mpg);
						if (!isNaN(mpg)){
              				if (mpg > maxMPG) maxMPG = mpg;
							if (mpg < minMPG) minMPG = mpg;
						}
						if (typeof this.displayData[i].cylinders !== "undefined" && this.displayData[i].cylinders !== "NA"){
							if (this.displayData[i].cylinders > maxCylinders) maxCylinders = this.displayData[i].cylinders;
							if (this.displayData[i].cylinders < minCylinders) minCylinders = this.displayData[i].cylinders;
						}
						if (typeof this.displayData[i].displacment !== "undefined"){
							if (this.displayData[i].displacment > maxDisplacement) maxDisplacement = this.displayData[i].displacment;
							if (this.displayData[i].displacment < minDisplacement) minDisplacement = this.displayData[i].displacment;
						}
						if (typeof this.displayData[i].horsepower !== "undefined"){
							if (this.displayData[i].horsepower > maxHorsepower) maxHorsepower = this.displayData[i].horsepower;
							if (this.displayData[i].horsepower < minHorsepower) minHorsepower = this.displayData[i].horsepower;
						}
						if (typeof this.displayData[i].weight !== "undefined"){
							if (this.displayData[i].weight > maxWeight) maxWeight = this.displayData[i].weight;
							if (this.displayData[i].weight < minWeight) minWeight = this.displayData[i].weight;
						}
						if (typeof this.displayData[i].acceleration !== "undefined"){
							if (this.displayData[i].acceleration > maxAcceleration) maxAcceleration = this.displayData[i].acceleration;
							if (this.displayData[i].acceleration < minAcceleration) minAcceleration = this.displayData[i].acceleration;
						}
					}
				}

        var matrixDim = Math.floor(Math.sqrt(this.displayData.length));
        this.matrixDim = matrixDim; 
        // TODO: nachkommastellen, zZ geschummelt
				var counter = 0;
        for(var i=0; i<matrixDim; i++){
          for(var j=0; j<matrixDim; j++){
						for(var k=0; k<this.attributesToShow.length; k++){
							//ctx.globalAlpha = 0.5; // TODO: mit / ohne opacity
							//if (this.attributesToShow.length === 1) ctx.globalAlpha = 1;
							//if (k !== 0) ctx.globalAlpha = 0.5;
							switch (this.attributesToShow[k]){
								case 'mpg':
									var v = ((this.displayData[counter].mpg - minMPG) / (maxMPG - minMPG));
									
									console.log(v);
									ctx.fillStyle = 'hsl(30, 100%, ' + (v*100) + '%)';
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'cylinders':
									ctx.fillStyle = 'hsl(60, 100% ' + ((this.displayData[counter].cylinders - minCylinders) / (maxCylinders - minCylinders)) * 255 + '%)';
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'displacement':
									ctx.fillStyle = 'hsl(90, 100%,' + ((this.displayData[counter].displacment - minDisplacement) / (maxDisplacement - minDisplacement)) * 255 + '%)';
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'horsepower':
									ctx.fillStyle = "hsl(120, 100%, " + ((this.displayData[counter].horsepower - minHorsepower) / (maxHorsepower - minHorsepower)) * 255 + "%)";
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'weight':
									var v = ((this.displayData[counter].weight - minWeight) / (maxWeight - minWeight));
									
									ctx.fillStyle = "hsl(150, 100%, " + v* 100 + "%)";
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'acceleration':
									ctx.fillStyle = "hsl(180, 100%, " + ((this.displayData[counter].acceleration - minAcceleration) / (maxAcceleration - minAcceleration)) * 255 + "%)";
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);	// TODO: mit oder ohne Abstand?
									break;
								//default:
									//ctx.fillStyle = "white";
									//ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									//break;
							}
						}
						counter += 1;
          }
        }
				// TODO: Legende
      }
    },
    watch: {
        displayData: function() {
          this.paintCarMatrix();
        },
        attributesToShow: function() {
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
