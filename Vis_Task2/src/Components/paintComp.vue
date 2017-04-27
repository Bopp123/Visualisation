<template>
	<div>
		<canvas width="300" height="300" id="canvas"></canvas>
	</div>			
</template>

<script>
	export default{
		data: function () {
			return{
				
			}
		},
	methods: {
		paintRandomShapes() {

			var ctx = this.$el.firstChild.getContext("2d");
			ctx.clearRect(0, 0, 300, 300);

			this.randomShapes.forEach((shape) => {
				ctx.fillStyle = "grey";
				ctx.beginPath();
				ctx.rect(shape.x, shape.y, shape.w, shape.h);
				ctx.closePath();
				ctx.fill();
			});
		},

		paintShape: function() {
			var ctx = this.$el.firstChild.getContext("2d");
			if (this.circle) {
				ctx.fillStyle = "red";
				// ctx.fillText(binding.value, 10, 50);
				ctx.beginPath();
				var radius = this.radius;
				console.log('radius', radius);
				ctx.arc(150, 150, radius, 0, 360);
			} else {
				ctx.fillStyle = "blue";
				ctx.beginPath();
				var radius = this.radius;
				let pos = 150 - radius / 2;
				ctx.rect(pos, pos, radius, radius);
			}


			ctx.closePath();
			ctx.fill();
		}

	},
	props: {
		radius: Number,
		circle: Boolean,
		toPaint: Boolean,
		randomShapes: Array
	},
	directives: {
	},
	mounted() {
		this.paintRandomShapes();
		// this.paintShape();
	},
	watch:{
		radius: function(){
			this.paintRandomShapes();
			// this.paintShape();
		}
	}
}
	
</script>

<style>
	canvas {
	}
</style>