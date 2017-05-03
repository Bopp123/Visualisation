<template>
	<div>
		<div>
			<h2>Your Results</h2>
			<canvas id="UserResults" width="700" height="500" style="border:1px solid #000000;"></canvas>
		</div>
		<div>
			<h2>Mean Results</h2>
			<canvas id="MeanResults" width="700" height="500" style="border:1px solid #000000;"></canvas>
		</div>
	</div>
</template>

<script>
	export default {
		//globale variablen
		data: function () {
			return {
				//variable1: 0,
				//canvas1: this.$el.getElementById("UserResults"),
				//canvas2: document.getElementById("MeanResults"),
				width: 700,
				height: 500,
				i: 1
			}
		},
		props:{
			results: Array
		},
		methods:{
			paintUserResults(){
				//var ctx1 = this.$el.firstChild.getContext("2d"); // funktionierte nach doppeltem div container nciht mehr
				var canvas1 = document.getElementById("UserResults");
				var ctx1 = canvas1.getContext("2d");
				ctx1.moveTo(this.width/10, this.height/10);
				ctx1.lineTo(this.width/10, this.height - this.height/10 );
				ctx1.stroke();
				ctx1.moveTo(this.width/10,this.height - this.height/10);
				ctx1.lineTo(this.width - this.width/10, this.height - this.height/10);
				ctx1.stroke();
				ctx1.font = "12px Arial";
				ctx1.fillText("Time",this.width/20, this.height/10);
				ctx1.font = "12px Arial";
				ctx1.fillText("Test Type",this.width - this.width/10, this.height - this.height/10);

//				for (var i = 0; i < this.results.length; i++) {
				var mean = 0;
				var UserStartIndex = this.results.length - 16;
				console.log("Array Length: " + this.results.length);
				console.log("User start point: " + UserStartIndex);
				for (var i = UserStartIndex; i < this.results.length; i++) {
					ctx1.fillRect(this.width/10 + i * this.width/20 + i * this.width/20, this.height - this.height/10 - this.results[i].time, this.width/20, this.results[i].time);
					mean = mean + this.results[i].time;
				}
				mean = mean / 16;
				console.log("Mean: " + this.height - this.height/10 - mean);
				ctx1.moveTo(this.width/10, this.height - this.height/10 - mean);
				ctx1.lineTo(this.width - this.width/10, this.height - this.height/10 - mean);
				ctx1.stroke();
				ctx1.font = "12px Arial";
				ctx1.fillText("Mean",this.width - this.width/10, this.height - this.height/10 - mean);

			},
			paintMeanResults(){

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
