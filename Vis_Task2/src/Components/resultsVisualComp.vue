<template>
	<div>
		<canvas></canvas>
		<canvas></canvas>
	</div>
</template>

<script>
	export default {
		//globale variablen
		data: function () {
			return {
				variable1: 0,
				variable1: "hallo"
			}
		},
		props:{
			results: Array
		},
		methods:{
			paintUserResults(){
				this.variable1 = 1;
				console.log(this.results);
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