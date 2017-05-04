yOffset<template>
	<div>
		<div>
			<h2>Your Results</h2>
			<p>Filled bars are correct. Empty bars are incorrect.</p>
			<br>
			<canvas id="UserResults" width="900" height="600"></canvas>
		</div>
		<br>
		<div>
			<h2>Mean Results</h2>
			<br>
			<canvas id="MeanResults" width="900" height="600"></canvas>
		</div>
	</div>
</template>

<script>
	export default {
		//globale variablen
		data: function () {
			return {
				width: 900,
				height: 600,
				testCycles: 16
			}
		},
		props:{
			results: Array
		},
		methods:{
			paintUserResults(){
				var canvas1 = document.getElementById("UserResults");
				var ctx1 = canvas1.getContext("2d");
				var xOffset = this.width/10;
				var yOffset = this.height/10;

				// Axis Description
				ctx1.textAlign="center";
				ctx1.font = "12px Arial";
				ctx1.fillText("Time in ms", xOffset, this.height/15);
				ctx1.fillText("Test Type",this.width - this.width/20, this.height - this.height/10.5);
				//Max Time
				var UserStartIndex = this.results.length - this.testCycles;
				var maxRange = 0;
				for(var i = UserStartIndex; i < this.results.length; i++){
					if(this.results[i].time > maxRange){
						maxRange = this.results[i].time;
					}
				}
				//console.log(maxRange);
				// Scale
				for(var i = 0; i < 5; i++){
					ctx1.moveTo(this.width/12, yOffset + i * (this.height-2*yOffset)/4);
					ctx1.lineTo(xOffset, yOffset + i * (this.height-2*yOffset)/4);
					ctx1.fillText(maxRange - i * (maxRange/4), this.width/20, yOffset + i * (this.height-2*yOffset)/4);
				}

				UserStartIndex = this.results.length - this.testCycles;
				var mean = 0;
				var counter = 0;
				for (var i = UserStartIndex; i < this.results.length; i++) {
					if(this.results[i].answer){
						ctx1.fillRect(this.width/9 + counter * ((this.width-2*(this.width/9))/this.testCycles),
													this.height - yOffset - this.results[i].time * ((this.height-2*yOffset)/maxRange),
													(this.width-2*xOffset)/(this.testCycles+2),
													this.results[i].time * ((this.height-2*yOffset)/maxRange)
													);
					} else {
						ctx1.strokeRect(this.width/9 + counter * ((this.width-2*(this.width/9))/this.testCycles),
													this.height - yOffset - this.results[i].time * ((this.height-2*yOffset)/maxRange),
													(this.width-2*xOffset)/(this.testCycles+2),
													this.results[i].time * ((this.height-2*yOffset)/maxRange)
													);
					}
					ctx1.fillText(this.results[i].feature, this.width/9 + counter * (((this.width-2*(this.width/9))/this.testCycles) ) + ((this.width-2*xOffset)/(this.testCycles+2) /2), this.height - this.height/15);
					mean = mean + this.results[i].time;
					counter = counter + 1;
				}
				mean = mean / this.testCycles;
				//console.log("Mean: " + mean);
				ctx1.strokeStyle="red";
				ctx1.moveTo(xOffset, this.height - yOffset - mean * ((this.height-2*yOffset)/maxRange));
				ctx1.lineTo(this.width - xOffset, this.height - yOffset - mean * ((this.height-2*yOffset)/maxRange));
				ctx1.stroke();
				ctx1.fillText("Mean All",this.width - this.width/20, this.height - this.height/10.5 - mean * ((this.height-2*yOffset)/maxRange));

				// Y Axis
				ctx1.strokeStyle="black";
				ctx1.moveTo(xOffset, yOffset);
				ctx1.lineTo(xOffset, this.height - yOffset );
				// X Axis
				ctx1.moveTo(xOffset,this.height - yOffset);
				ctx1.lineTo(this.width - xOffset, this.height - yOffset);
				ctx1.stroke();
			},

			paintMeanResults(){
				var canvas1 = document.getElementById("MeanResults");
				var ctx1 = canvas1.getContext("2d");
				var xOffset = this.width/10;
				var yOffset = this.height/10;

				// Axis Description
				ctx1.textAlign="center";
				ctx1.font = "12px Arial";
				ctx1.fillText("Time in ms",xOffset, this.height/15);

				//Max Time
				var maxRange = 0;
				var minRange = 1000;
				var trueAnswers = 0;
				for(var i = 0; i < this.results.length; i++){
					if(this.results[i].time > maxRange){
						maxRange = this.results[i].time;
					}
					if(this.results[i].time < minRange){
						minRange = this.results[i].time;
					}
					if(this.results[i].answer){
						trueAnswers = trueAnswers + 1;
					}
				}
				maxRange = 400;

				// Scale
				for(var i = 0; i < 5; i++){
					ctx1.moveTo(this.width/12, yOffset + i * (this.height-2*yOffset)/4);
					ctx1.lineTo(xOffset, yOffset + i * (this.height-2*yOffset)/4);
					ctx1.fillText(maxRange - i * ((maxRange-minRange)/4), this.width/20, yOffset + i * (this.height-2*yOffset)/4);
				}

				var mean = 0;
				var meanTrue = 0;
				var meanTrueDistr = 0;
				var meanFeatOne = 0;
				var meanFeatTwo = 0;
				var meanFeatMix = 0;
				//var counter = 0;
				for (var i = 0; i < this.results.length; i++) {
					mean += this.results[i].time;

					if(this.results[i].feature === "color"){
						meanFeatOne += this.results[i].time;
					}
					if(this.results[i].feature === "form"){
						meanFeatTwo += this.results[i].time;
					}
					if(this.results[i].feature === "mixed"){
						meanFeatMix += this.results[i].time;
					}

					if(this.results[i].answer){
						meanTrue = meanTrue + this.results[i].time;
						if(this.results[i].distractor){
							meanTrueDistr += this.results[i].time;
						}
					}
				}

				mean = mean / this.results.length;
				meanTrue = meanTrue / trueAnswers;
				meanTrueDistr = meanTrueDistr / trueAnswers;
				meanFeatOne = meanFeatOne / this.results.length;
				meanFeatTwo = meanFeatTwo / this.results.length;
				meanFeatMix = meanFeatMix / this.results.length;
				//console.log("Mean: " + mean);
				ctx1.strokeStyle="red";
				ctx1.moveTo(xOffset, this.height - yOffset - mean * ((this.height-2*yOffset)/maxRange));
				ctx1.lineTo(this.width - 2*xOffset, this.height - yOffset - mean * ((this.height-2*yOffset)/maxRange));
				ctx1.fillText("Mean All",this.width - xOffset, this.height - this.height/10.5 - mean * ((this.height-2*yOffset)/maxRange));

				ctx1.moveTo(xOffset, this.height - yOffset - meanTrue * ((this.height-2*yOffset)/maxRange));
				ctx1.lineTo(this.width - 2*xOffset, this.height - yOffset - meanTrue * ((this.height-2*yOffset)/maxRange));
				ctx1.fillText("Mean True",this.width - xOffset, this.height - this.height/10.5 - meanTrue * ((this.height-2*yOffset)/maxRange));

				ctx1.moveTo(xOffset, this.height - yOffset - meanTrueDistr * ((this.height-2*yOffset)/maxRange));
				ctx1.lineTo(this.width - 2*xOffset, this.height - yOffset - meanTrueDistr * ((this.height-2*yOffset)/maxRange));
				ctx1.fillText("Mean True Distrector",this.width - xOffset, this.height - this.height/10.5 - meanTrueDistr * ((this.height-2*yOffset)/maxRange));

				ctx1.moveTo(xOffset, this.height - yOffset - meanFeatOne * ((this.height-2*yOffset)/maxRange));
				ctx1.lineTo(this.width - 2*xOffset, this.height - yOffset - meanFeatOne * ((this.height-2*yOffset)/maxRange));
				ctx1.fillText("Mean Feat. Color",this.width - xOffset, this.height - this.height/10.5 - meanFeatOne * ((this.height-2*yOffset)/maxRange));

				ctx1.moveTo(xOffset, this.height - yOffset - meanFeatTwo * ((this.height-2*yOffset)/maxRange));
				ctx1.lineTo(this.width - 2*xOffset, this.height - yOffset - meanFeatTwo * ((this.height-2*yOffset)/maxRange));
				ctx1.fillText("Mean Feat. Form",this.width - xOffset, this.height - this.height/10.5 - meanFeatTwo * ((this.height-2*yOffset)/maxRange));

				ctx1.moveTo(xOffset, this.height - yOffset - meanFeatMix * ((this.height-2*yOffset)/maxRange));
				ctx1.lineTo(this.width - 2*xOffset, this.height - yOffset - meanFeatMix * ((this.height-2*yOffset)/maxRange));
				ctx1.fillText("Mean Feat. Mixed",this.width - xOffset, this.height - this.height/10.5 - meanFeatMix * ((this.height-2*yOffset)/maxRange));
				ctx1.stroke();

				ctx1.fillText("Total answers: " + this.results.length ,this.width/2, this.height - yOffset/2);
				// Y Axis
				ctx1.strokeStyle="black";
				ctx1.moveTo(xOffset, yOffset);
				ctx1.lineTo(xOffset, this.height - yOffset );
				ctx1.stroke();
			}
		},

		mounted(){
			this.paintUserResults();
			this.paintMeanResults();
		}
	}
</script>

<style>

</style>
