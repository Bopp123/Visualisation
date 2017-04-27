<template>
	<div>
		<canvas width="300" height="300" v-paintShapes="{radius:radius, circle:circle}"></canvas>
	</div>			
</template>

<script>
	export default{
		data: function () {
			return{
			}
		},
		props: {
			radius: Number,
			circle: Boolean
		},
		directives: {
		paintShapes: function(canvas, binding) {

			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, 300, 300);

			if (binding.value.circle) {
			ctx.fillStyle = "red";
			// ctx.fillText(binding.value, 10, 50);
			ctx.beginPath();
			var radius = binding.value.radius;
			console.log('radius', radius);
			ctx.arc(150, 150, radius, 0, 360);
			} else{
			ctx.fillStyle = "blue";
			ctx.beginPath();
			var radius = binding.value.radius;
			let pos = 150-radius/2;
			ctx.rect(pos,pos, radius,radius);
			}


			ctx.closePath();
			ctx.fill();
		}
	}
}
	
</script>

<style>
	canvas {
	}
</style>