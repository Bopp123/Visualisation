<template>
	<div>
		<div>
			<h2>Your Results</h2>
			<p>Filled bars are correct. Empty bars are incorrect.</p>
			<br>
			<canvas id="UserResults" width="900" height="600" style="border:1px solid #000000;"></canvas>
		</div>
		<br>
		<div>
			<h2>Mean Results</h2>
			<p>Only correct answers are displayed.</p>
			<br>
			<canvas id="MeanResults" width="900" height="600" style="border:1px solid #000000;"></canvas>
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
													this.height - yOffset - this.results[i].time * ((this.height-2*(this.height/10))/maxRange),
													(this.width-2*xOffset)/(this.testCycles+2),
													this.results[i].time * ((this.height-2*(this.height/10))/maxRange)
													);
					} else {
						ctx1.strokeRect(this.width/9 + counter * ((this.width-2*(this.width/9))/this.testCycles),
													this.height - yOffset - this.results[i].time * ((this.height-2*(this.height/10))/maxRange),
													(this.width-2*xOffset)/(this.testCycles+2),
													this.results[i].time * ((this.height-2*(this.height/10))/maxRange)
													);
					}
					ctx1.fillText(this.results[i].feature, this.width/9 + counter * (((this.width-2*(this.width/9))/this.testCycles) ) + ((this.width-2*xOffset)/(this.testCycles+2) /2), this.height - this.height/15);
					mean = mean + this.results[i].time;
					counter = counter + 1;
				}
				mean = mean / this.testCycles;
				console.log("Mean: " + mean);
				ctx1.strokeStyle="red";
				ctx1.moveTo(xOffset, this.height - yOffset - mean * ((this.height-2*(this.height/10))/maxRange));
				ctx1.lineTo(this.width - xOffset, this.height - yOffset - mean * ((this.height-2*(this.height/10))/maxRange));
				ctx1.stroke();
				ctx1.fillText("Mean",this.width - this.width/20, this.height - this.height/10.5 - mean * ((this.height-2*(this.height/10))/maxRange));

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
				//ctx1.fillText("Test Type",this.width - this.width/13, this.height - this.height/10.5);
				//Max Time
				//var UserStartIndex = this.results.length - this.testCycles;
				var maxRange = 0;
				var trueAnswers = 0;
				for(var i = 0; i < this.results.length; i++){
					if(this.results[i].answer){
						trueAnswers = trueAnswers + 1;
						if(this.results[i].time > maxRange){
							maxRange = this.results[i].time;
						}
					}
				}
				//maxRange = 400;
				//console.log(maxRange);
				// Scale
				for(var i = 0; i < 5; i++){
					ctx1.moveTo(this.width/12, yOffset + i * (this.height-2*yOffset)/4);
					ctx1.lineTo(xOffset, yOffset + i * (this.height-2*yOffset)/4);
					ctx1.fillText(maxRange - i * (maxRange/4), this.width/20, yOffset + i * (this.height-2*yOffset)/4);
				}

				//UserStartIndex = this.results.length - this.testCycles;
				var mean = 0;
				var counter = 0;
				for (var i = 0; i < this.results.length; i++) {
					if(this.results[i].answer){
						ctx1.fillRect(this.width/9 + counter * ((this.width-2*(this.width/9))/trueAnswers),
													this.height - yOffset - this.results[i].time * ((this.height-2*(this.height/10))/maxRange),
													(this.width-2*xOffset)/(trueAnswers+2),
													this.results[i].time * ((this.height-2*(this.height/10))/maxRange)
													);
						//ctx1.fillText(this.results[i].feature, this.width/9 + counter * ((this.width-2*(this.width/9))/this.testCycles), this.height - this.height/15);
						counter = counter + 1;
						mean = mean + this.results[i].time;
					}
					/* else {
						ctx1.strokeRect(this.width/9 + counter * ((this.width-2*(this.width/9))/this.testCycles),
													this.height - yOffset - this.results[i].time * ((this.height-2*(this.height/10))/maxRange),
													(this.width-2*xOffset)/(this.testCycles+2),
													this.results[i].time * ((this.height-2*(this.height/10))/maxRange)
													);
					}
					*/
					//mean = mean + this.results[i].time;
					//var counter = counter + 1;
				}
				mean = mean / trueAnswers;
				console.log("Mean: " + mean);
				ctx1.strokeStyle="red";
				ctx1.moveTo(xOffset, this.height - yOffset - mean * ((this.height-2*(this.height/10))/maxRange));
				ctx1.lineTo(this.width - xOffset, this.height - yOffset - mean * ((this.height-2*(this.height/10))/maxRange));
				ctx1.stroke();
				ctx1.fillText("Mean",this.width - this.width/20, this.height - this.height/10.5 - mean * ((this.height-2*(this.height/10))/maxRange));
				ctx1.fillText("Total of correct answers: " + trueAnswers ,this.width/2, this.height - yOffset/2);
				// Y Axis
				ctx1.strokeStyle="black";
				ctx1.moveTo(xOffset, yOffset);
				ctx1.lineTo(xOffset, this.height - yOffset );
				// X Axis
				ctx1.moveTo(xOffset,this.height - yOffset);
				ctx1.lineTo(this.width - xOffset, this.height - yOffset);
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
