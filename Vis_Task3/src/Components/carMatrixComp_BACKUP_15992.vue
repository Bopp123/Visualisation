<template>
	<div class="text-center">
  	<canvas id="canvas" width="800" height="800"></canvas>
	</div>
</template>

<script>
	export default {
	   data: function () {
			return {
				width: 800,
				height: 800
			}
		},

		props:{
			displayData: Array,
			attributesToShow: Array
		},

		methods:{
      paintCarMatrix(){
        var ctx = this.$el.firstChild.getContext("2d");
<<<<<<< HEAD
				ctx.clearRect(0, 0, this.width, this.height);
				// Background
				//ctx.fillStyle = "black";
				//ctx.fillRect(0, 0, this.width, this.height);
=======
        ctx.clearRect(0, 0, 600, 600);
>>>>>>> 228adf5c11c2ecfb07c15a719a41c81c44081a23

				if (this.attributesToShow.length !== 0){
					var maxMPG = 0;
					var maxCylinders = 0;
					var maxDisplacement = 0;
					var maxHorsepower = 0;
					var maxWeight = 0;
					var maxAcceleration = 0;
          for (var i=0; i<this.displayData.length; i++){
						if (typeof this.displayData[i].mpg !== "undefined"){
              if (this.displayData[i].mpg > maxMPG) maxMPG = this.displayData[i].mpg;
						}
						if (typeof this.displayData[i].cylinders !== "undefined"){
							if (this.displayData[i].cylinders > maxCylinders) maxCylinders = this.displayData[i].cylinders;
						}
						if (typeof this.displayData[i].displacment !== "undefined"){
							if (this.displayData[i].displacment > maxDisplacment) maxDisplacment = this.displayData[i].displacment;
						}
						if (typeof this.displayData[i].horsepower !== "undefined"){
							if (this.displayData[i].horsepower > maxHorsepower) maxHorsepower = this.displayData[i].horsepower;
						}
						if (typeof this.displayData[i].weight !== "undefined"){
							if (this.displayData[i].weight > maxWeight) maxWeight = this.displayData[i].weight;
						}
						if (typeof this.displayData[i].acceleration !== "undefined"){
							if (this.displayData[i].acceleration > maxAcceleration) maxAcceleration = this.displayData[i].acceleration;
						}
					}
				}

        var matrixDim = Math.floor(Math.sqrt(this.displayData.length)); // TODO: nachkommastellen, zZ geschummelt
				var counter = 0;
        for(var i=0; i<matrixDim; i++){
          for(var j=0; j<matrixDim; j++){
						for(var k=0; k<=this.attributesToShow.length; k++){
							ctx.globalAlpha = 0.5;
							if (this.attributesToShow.length === 1) ctx.globalAlpha = 1; // TODO: opacity ergibt nicht immer gleiche farben, hängt von reihenfolge ab
							//if (k !== 0) ctx.globalAlpha = 0.5;
							switch (this.attributesToShow[k]){
								case 'mpg':
									ctx.fillStyle = 'rgb(' + Math.floor(this.displayData[counter].mpg/(maxMPG/100)*2,55) + ', 0, 0)';
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'cylinders':
									ctx.fillStyle = 'rgb(0, ' + Math.floor(this.displayData[counter].cylinders/(maxCylinders/100)*2,55) + ', 0)';
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'displacment':
									ctx.fillStyle = 'rgb(0, 0,' + Math.floor(this.displayData[counter].displacment/(maxDisplacment/100)*2,55) + ')';
									ctx.fillRect(i*this.width/matrixDim, j*this.height/matrixDim, this.width/matrixDim-1, this.height/matrixDim-1);
									break;
								case 'weight':
									ctx.fillStyle = "rgb(0, 0," + Math.floor(this.displayData[counter].weight/(maxWeight/100)*2,55) + ")";
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
      },
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
