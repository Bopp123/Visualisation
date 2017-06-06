<template>
	<div>
		<div class="text-center">
			<canvas id="canvas" width="600" height="600" @click="getCarInfo"></canvas>
		</div>
		<div class="text-center">
			<canvas id="canvas2" width="600" height="600" ></canvas>
		</div>
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

			norm(x, min, max){
				return ((0.6 * (x-min))/(max-min)) + 0.3;
			},

      paintCarMatrix(){
				var canvas = document.getElementById("canvas");
				var ctx = canvas.getContext("2d");
				var canvas2 = document.getElementById("canvas2");
				var ctx2 = canvas2.getContext("2d");
        //var ctx = this.$el.firstChild.getContext("2d");
        //var ctx2 = this.$el.secondChild.getContext("2d");

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
					var maxModelyear = 0;
					var minMPG = Infinity;
					var minCylinders = Infinity;
					var minDisplacement = Infinity;
					var minHorsepower = Infinity;
					var minWeight = Infinity;
					var minAcceleration = Infinity;
					var minModelyear = Infinity;

          for (var i=0; i<this.displayData.length; i++){
          				var mpg = Number.parseInt(this.displayData[i].mpg);
									var displacement = Number.parseInt(this.displayData[i].displacement);
					var horsepower = Number.parseInt(this.displayData[i].horsepower);

					if (!isNaN(mpg)) {
						if (mpg > maxMPG) maxMPG = mpg;
						if (mpg < minMPG) minMPG = mpg;
					}

						if (!isNaN(displacement)){3
							if (displacement > maxDisplacement) maxDisplacement = displacement;
							if (displacement < minDisplacement) minDisplacement = displacement;
						}

						if (typeof this.displayData[i].cylinders !== "undefined" && this.displayData[i].cylinders !== "NA"){
							if (this.displayData[i].cylinders > maxCylinders) maxCylinders = this.displayData[i].cylinders;
							if (this.displayData[i].cylinders < minCylinders) minCylinders = this.displayData[i].cylinders;
						}/*
						if (typeof this.displayData[i].displacment !== "undefined" && this.displayData[i].cylinders !== "NA"){
							if (this.displayData[i].displacement > maxDisplacement) maxDisplacement = this.displayData[i].displacement;
							if (this.displayData[i].displacement < minDisplacement) minDisplacement = this.displayData[i].displacement;
						}*/
						if (!isNaN(horsepower)){
              				if (horsepower > maxHorsepower) maxHorsepower = horsepower;
							if (horsepower < minHorsepower) minHorsepower = horsepower;
						}
						if (typeof this.displayData[i].weight !== "undefined"){
							if (this.displayData[i].weight > maxWeight) maxWeight = this.displayData[i].weight;
							if (this.displayData[i].weight < minWeight) minWeight = this.displayData[i].weight;
						}
						if (typeof this.displayData[i].acceleration !== "undefined"){
							if (this.displayData[i].acceleration > maxAcceleration) maxAcceleration = this.displayData[i].acceleration;
							if (this.displayData[i].acceleration < minAcceleration) minAcceleration = this.displayData[i].acceleration;
						}
						if (typeof this.displayData[i].modelyear !== "undefined"){
							if (this.displayData[i].modelyear > maxModelyear) maxModelyear = this.displayData[i].modelyear;
							if (this.displayData[i].modelyear < minModelyear) minModelyear = this.displayData[i].modelyear;
						}
					}
				}

        var matrixDim = Math.floor(Math.sqrt(this.displayData.length));
        var tileSize = this.width/matrixDim;
        this.matrixDim = matrixDim;
        // TODO: nachkommastellen, zZ geschummelt
				var counter = 0;
        for(var i=0; i<matrixDim; i++){
          for(var j=0; j<matrixDim; j++){
						for(var k=0; k<this.attributesToShow.length; k++){
							
							var alpha = 1;
							
							var h = 60;
							if (this.attributesToShow.length > 1) {

								// alpha = 0.3;
								// ctx.globalAlpha = 0.5; // TODO: mit / ohne opacity
								ctx.globalCompositeOperation = "exclusion";
								var h = 240;
							}
							//if (k !== 0) ctx.globalAlpha = 0.5;
							switch (this.attributesToShow[k]){
								case 'mpg':
									var v = this.norm(this.displayData[counter].mpg, minMPG, maxMPG) *100;
									ctx.fillStyle = 'hsla(' + h  +', 100%, ' + v + '%,'+ alpha + ')';
									ctx.fillRect(j*(tileSize), i*(tileSize), tileSize-1, tileSize-1);
									break;
								case 'cylinders':
									var v = this.norm(this.displayData[counter].cylinders, minCylinders, maxCylinders) *100;
									ctx.fillStyle = 'hsla(' + h  +', 100%, ' + (120-v) + '%,'+ alpha + ')';
									ctx.fillRect(j*(tileSize), i*(tileSize), tileSize-1, tileSize-1);
									//ctx.fillStyle = 'hsla(60, 100% ' + ((this.displayData[counter].cylinders - minCylinders) / (maxCylinders - minCylinders)) * 255 + '%)';
								//	ctx.fillRect(j*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'displacement':
									var v = ((this.displayData[counter].displacement - minDisplacement) / (maxDisplacement - minDisplacement))*100;
									console.log(counter,"   ",v, "  displacement: " + this.displayData[counter].displacement);
									ctx.fillStyle = 'hsla(' + h  +', 100%, ' + (100-v) + '%,'+ alpha + ')';
									ctx.fillRect(j*(tileSize), i*(tileSize), tileSize-1, tileSize-1);
									//ctx.fillStyle = 'hsl(90, 100%,' + ((this.displayData[counter].displacment - minDisplacement) / (maxDisplacement - minDisplacement)) * 255 + '%)';
									//ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'horsepower':
									var v = ((this.displayData[counter].horsepower - minHorsepower) / (maxHorsepower - minHorsepower))*100;
									console.log(counter,"   ",v, "  horsepower: " + this.displayData[counter].horsepower);
									ctx.fillStyle = 'hsla(' + h  +', 100%, ' + (100-v) + '%,'+ alpha + ')';
									ctx.fillRect(j*(tileSize), i*(tileSize), tileSize-1, tileSize-1);
									break;
								case 'weight':
									var v = this.norm(this.displayData[counter].weight, minWeight, maxWeight) *100;
									ctx.fillStyle = 'hsla(' + h  +', 100%, ' + (120-v) + '%,'+ alpha + ')';
									ctx.fillRect(j*(tileSize), i*(tileSize), tileSize-1, tileSize-1);
									//var v = ((this.displayData[counter].weight - minWeight) / (maxWeight - minWeight));
									//ctx.fillStyle = "hsl(150, 100%, " + v* 100 + "%)";
									//ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'acceleration':
									var v = ((this.displayData[counter].acceleration - minAcceleration) / (maxAcceleration - minAcceleration))*100;
									console.log(counter,"   ",v, "  acceleration: " + this.displayData[counter].acceleration);
									ctx.fillStyle = 'hsla(' + h  +', 100%, ' + (80-v) + '%,'+ alpha + ')';
									ctx.fillRect(j*(tileSize), i*(tileSize), tileSize-1, tileSize-1);
									//ctx.fillStyle = "hsl(180, 100%, " + ((this.displayData[counter].acceleration - minAcceleration) / (maxAcceleration - minAcceleration)) * 255 + "%)";
									//ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);	// TODO: mit oder ohne Abstand?
									break;
								case 'modelyear':
									var v = ((this.displayData[counter].modelyear - minModelyear) / (maxModelyear - minModelyear))*100;
									console.log(counter,"   ",v, "  modelyear: " + this.displayData[counter].modelyear);
									ctx.fillStyle = 'hsla(' + h  +', 100%, ' + (100-v) + '%,'+ alpha + ')';
									ctx.fillRect(j*(tileSize), i*(tileSize), tileSize-1, tileSize-1);
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
				//var v = ((this.displayData[counter].weight - minWeight) / (maxWeight - minWeight))*100;
				//String = 'hsla(150, 100%, ' + (100-v) + '%,'+ alpha + ')';
				//hsl(240)
				var grd = ctx2.createLinearGradient(0,0,300,0);
				grd.addColorStop(0,"black");
				grd.addColorStop(1,"white");
				ctx2.fillStyle = grd;
				ctx2.fillRect(0,0,300,20);
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
