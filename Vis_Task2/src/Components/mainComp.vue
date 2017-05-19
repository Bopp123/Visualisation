<template>
<div>
	<div v-if="!counting && started">
		<div v-if="!finishedBool" class="flex text-center">
			<paint :special="special1" :testType="current" :randomShapes="randomShapes" :toPaint="true"class="paint paint1"></paint>
			<paint :special="special2" :randomShapes="randomShapes" :testType="current" :toPaint="true" class="paint paint2"></paint>
		</div>
		<div v-else class="text-center">
			<resultsComp :results="resultData"></resultsComp>
		</div>
		 <div class="text-center">
			<h3 v-if="howManyLeft!=0">{{howManyLeft}} to go</h3>
		</div>
		<controls v-if="howManyLeft!=0" :type="current"></controls>
	</div>
	<div v-else-if="counting && started" class="text-center">
		<h1>{{startCounter}}</h1>
	</div>
	<div v-else-if="!started" class="text-center start-div">
		<button class="btn-primary btn" @click="start">Start</button>
	</div>
</div>			
</template>

<script>
	import Controls from './controlsComp.vue';
	import Results from './resultsVisualComp.vue';
	import Paint from './paintComp.vue';
	import JsonData from '../../testData.json';
	import {eventBus} from "../main";
	export default {
		components: {
			controls: Controls,
			paint: Paint,
			resultsComp: Results
		},
		data: function() {
			return {
				finishedBool: false,
				randomShapes: [],
				special1: false,
				special2: false,
				current : {},
				testData: [],
				resultData : [],
				testCounter: 0,
				started: false,
				counting: false,
				startCounter: 3,
				intervalId: 0
			}
		},
		methods: {
			start(){
				this.started = true;
				this.counting = true;
				this.startCounter = 3;
				const that = this;

				this.intervalId = setInterval(function(){	
					that.startCounter -= 1;
				}.bind(that), 1000);
			},
			determineSpecial(){
				const rnd = Math.random();
				if(rnd < 0.5){
					this.special1 = true;
					this.special2 = false;
				}else{
					this.special1 = false;
					this.special2 = true;
				}
			},
		generatePlatforms(k, platformWidth, platformHeight, platformSize) {

			var platforms = [];
			var placed = 0;
			var maxTrys = 0;
			platforms.push({
					x: 100,
					y: 100,
					w: platformSize,
					h: platformSize
				});
			while (placed < k && maxTrys < 10000) {
				var available = false;
				while (!available) {

					var x = Math.floor(Math.random() * platformWidth),
						y = Math.floor(Math.random() * platformHeight);

					for (let i = 0; platforms.length;i++) {
						maxTrys += 1;
						if(i=== platforms.length){
							break;
						}
						var xDelta = Math.abs(platforms[i].x - x);
						var yDelta = Math.abs(platforms[i].y - y);
						if (xDelta < platformSize+5 && yDelta < platformSize+5) {
							available = false;
							break;
						}
						available = true;
					}
				}

				platforms.push({
					x: x,
					y: y,
					size: platformSize
				});
				placed += 1;
				
			}
			return platforms;
		},
		finished() {
				this.getDataFromFirebase();
			},
			reset(){
				this.testCounter = 0;
				this.finishedBool= false;
				this.counting = false;
				this.started = false;
			},
			importJsonData(){
				this.testData =  JsonData.data;
			},
			boot(){
			if (this.testData.length !== this.testCounter) {
				this.current = this.testData[this.testCounter];
				this.determineSpecial();
				this.randomShapes = this.generatePlatforms(50, 265, 265, 30);
			}
				
			},

			sendToFirebase(data){
				this.$http.post('https://vis-tasks.firebaseio.com/task2.json',data)
					.then((res) => {	
						if(res.status != 200){
							alert('something went wrong with the server');
						}
					})
			},
		getDataFromFirebase() {
			this.$http.get('https://vis-tasks.firebaseio.com/task2.json')
				.then((res) => {
					for (let entry in res.body) {
						let data = {};
						if (!res.body.hasOwnProperty(entry)) continue;

						var obj = res.body[entry];
						for (var prop in obj) {
							if (!obj.hasOwnProperty(prop)) continue;
							data[prop] = obj[prop];
						}
						this.resultData.push(data);
					}
					this.finishedBool = true;
				})
		},
			validateAnswer(answer){
				if(answer === "left" && this.special1) return true;
				if(answer === "left" && this.special2) return false;
				if(answer === "right" && this.special1) return false;
				if(answer === "right" && this.special2) return true;
			}

		},
		computed:{
			howManyLeft: function(){
				return this.testData.length- this.testCounter;
			}
		},
		watch: {
			testCounter: function() {
				if (this.testData.length === this.testCounter) {
					this.finished();
				}
			},
			startCounter: function () {
				if (this.startCounter == 0) {
					this.counting =false;
					this.boot();
					window.clearInterval(this.intervalId);
				}
			}
		},
		created() {
			eventBus.$on('factorEntered', (answer) => {
				this.sendToFirebase({
					time: this.current.time,
					distractor: this.current.distractor,
					feature: this.current.feature,
					answer: this.validateAnswer(answer)
				});
				this.testCounter += 1;
				this.boot();
			});

			eventBus.$on('reset', () => {	
				this.reset();
			});
		},
		beforeMount(){
			this.importJsonData();
		}
	}
</script>

<style>
	.paint{
		width: 300px;
		height: 300px;
		margin-top: 5%;
		margin-bottom: 5%;
		border: black solid 1px;

	}
	.flex{
		display: flex;
	}

	.paint1{
		margin-left: auto;
		margin-right: 5%;
	}
	.paint2{
		margin-right: auto;
	}

	.tada{
		font-size: 60px;
		margin: 50px;
		color: red;
	}

	.start-div {
		margin: 100px;
	}
</style>