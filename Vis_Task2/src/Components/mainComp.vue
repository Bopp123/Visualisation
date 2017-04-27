<template>
	<div>
		<div v-if="!finishedBool" class="flex text-center">
			<paint :radius="radius1" :circle="circle" :randomShapes="randomShapes" :toPaint="true"class="paint paint1"></paint>
			<paint :radius="radius2" :randomShapes="randomShapes" :circle="circle" :toPaint="true" class="paint paint2"></paint>
		</div>
		<div v-else class="text-center">
			<resultsComp :results="resultData"></resultsComp>
		</div>
		 <div class="text-center">
			<h3>{{howManyLeft}} to go</h3>
		</div>
		<controls></controls>
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
				radius2: 2,
				radius1: 1,
				factors: [],
				circle: true,
				xArray: [],
				finishedBool: false,
				meanX: 0,
				randomShapes: [],
				dataEntrys: [],
				resultData: []
			}
		},
		methods: {
		generatePlatforms(k, platformWidth, platformHeight, platformSize) {

				var platforms = [];
				var placed = 0,
					maxAttempts = k * 10;
				while (placed < k && maxAttempts > 0) {
					var x = Math.floor(Math.random() * platformWidth),
						y = Math.floor(Math.random() * platformHeight),
						available = true;
					for (var point in platforms) {
						if (Math.abs(point.x - x) < platformSize && Math.abs(point.y - y) < platformSize) {
							available = false;
							break;
						}
					}
					if (available) {
						platforms.push({
							x: x,
							y: y,
							w: 20,
							h: 20
						});
						placed += 1;
					}
					maxAttempts -= 1;
				}
				return platforms;
		},
		getData(){
			this.$db.allDocs()
				.then((data) => {	
					var ids = [];
					data.rows.forEach((element) => {	
						ids.push(element.id);
					})
					ids.forEach((el) => {	
						this.$db.get(el)
							.then((a) => {	
								this.dataEntrys.push(a);
							});
					});
					console.log(this.dataEntrys);
				});
		},
		finished() {
				const sumX = this.xArray.reduce(function(acc, val) {
					return acc + val;
				}, 0);
				this.meanX = sumX/10;
				this.finishedBool = true;
			},
			reset(){
				this.changeRadius();
				this.factors = [];
				this.xArray= [];
				this.finishedBool= false;
			},
			changeRadius(){
			this.radius1 = Math.random() * 50;
			if (this.radius1 < 20) {
				this.radius1 = 20+(this.radius1*2);
			}
				let multFactor = (Math.random()*5);
				if(multFactor <1 ){
					multFactor = 1.5 + multFactor * 2;
				}
				console.log('multfactor', multFactor);
				this.radius2 = this.radius1 * multFactor;
				if(this.radius2 > 140){
					this.radius2 = 140;
				}
			},
			calcX(factor){
				const propotion = this.calcArea(this.radius2)/this.calcArea(this.radius1);
				return Math.log(factor)/Math.log(propotion);
			},
			calcArea(r){
				if(this.circle){
					return Math.pow(r, 2)*Math.PI;
				}else{
					return Math.pow(r, 2);
				}
			},
			importJsonData(){
				this.resultData =  JsonData.data;
				console.log("afasdafadsdadsda",this.resultData);
			}
		},
		computed:{
			howManyLeft: function(){
				return 10- this.factors.length;
			}
		},
		watch: {
			factors: function() {
				if (this.factors.length === 1) {
					this.finished();
				}
			}
		},
		created() {
			eventBus.$on('factorEntered', (factor) => {
				this.factors.push(factor);
				this.xArray.push(this.calcX(factor));
				console.log(this.xArray);
				this.changeRadius();
				console.log(this.factors.length);
				this.randomShapes =this.generatePlatforms(30, 300, 300,30);
				this.$db.post({
					factor: factor
				})
					.then((data) => {	
					})
			});

			eventBus.$on('modeChanged', () => {	
				this.circle = !this.circle;
			});

			eventBus.$on('reset', () => {	
				this.reset();
			});
			this.getData();
			this.importJsonData();
		},
		beforeMount(){
			this.changeRadius();
			this.randomShapes =this.generatePlatforms(10, 300, 300,40);
		}
	}
</script>

<style >
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
</style>