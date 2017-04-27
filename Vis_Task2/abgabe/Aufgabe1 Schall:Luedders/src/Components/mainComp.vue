<template>
	<div>
		<div v-if="!finishedBool" class="flex text-center">
			<paint :radius="radius1" :circle="circle" class="paint paint1"></paint>
			<paint :radius="radius2" :circle="circle" class="paint paint2"></paint>
		</div>
		<div v-else class="text-center">
			<p class="tada">
				Your mean X is {{meanX}}!
			</p>
		</div>
		<controls></controls>
	</div>			
</template>

<script>
	import Controls from './controlsComp.vue';
	import Paint from './paintComp.vue';
	import {eventBus} from "../main";
	export default {
		components: {
			controls: Controls,
			paint: Paint
		},
		data: function() {
			return {
				radius2: 2,
				radius1: 1,
				factors: [],
				circle: true,
				xArray: [],
				finishedBool: false,
				meanX: 0
			}
		},
		methods: {
		finished() {
			console.log('finisg');
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
			}
		},
		watch: {
			factors: function() {
				if (this.factors.length === 10) {
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
			});

			eventBus.$on('modeChanged', () => {	
				this.circle = !this.circle;
			});

			eventBus.$on('reset', () => {	
				this.reset();
			});
			
		},
		beforeMount(){
			this.changeRadius();
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