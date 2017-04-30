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
			let i = 0;
			this.randomShapes.forEach((shape) => {
				if(i%2 == 0){
					this.paintTriangleUp(shape.x,shape.y,shape.size/2,"red", ctx);
				}else{
					this.paintCurve(shape.x,shape.y,shape.size,"blue", ctx);
				}
			i+=1;
			});

			if(this.special){
				this.paintSquare(Math.random()*250, Math.random()*250,30,"black",ctx);
			}
		},
		paintTest(){
			switch (this.testType.feature) {
				case "form":
					this.paintShapesForForm();
					break;
				case "color":
					this.paintShapesForColor();
					break;
				case "mixed":
					this.paintShapesForMixed();
					break;
				default:
					break;
			}
		},
		clearCanvas(time,ctx){
			setTimeout(function(){	
				ctx.clearRect(0, 0, 300, 300);
			}.bind(ctx), time);
		},
		paintShapesForForm() {

			var ctx = this.$el.firstChild.getContext("2d");
			ctx.clearRect(0, 0, 300, 300);
			const random = Math.floor(Math.random() * this.randomShapes.length);
			const color = "#0555FF";
			console.log("distractor",this.testType.distractor);
			if (this.testType.distractor === false) {
				this.randomShapes.forEach((shape, i) => {
					if (i === random && this.special) {
						this.paintCircle(shape.x, shape.y, shape.size / 2, color, ctx);
					} else {
						this.paintSquare(shape.x, shape.y, shape.size, color, ctx);
					}
				});
			} else {
				this.randomShapes.forEach((shape, i) => {
					if (i === random && this.special) {
						this.paintCircle(shape.x, shape.y, shape.size / 1.5, color, ctx);
					} else {

						switch (i % 4) {
							case 0:
								this.paintTriangle(shape.x, shape.y, shape.size / 2, color, ctx);
								break;
							case 1:
								this.paintTriangleUp(shape.x, shape.y, shape.size / 2, color, ctx);
								break;
							case 2:
								this.paintCurve(shape.x, shape.y, shape.size / 2, color, ctx);
								break;
							case 3:
								this.paintSquare(shape.x, shape.y, shape.size, color, ctx);
								break;
							default:
								break;
						}
					}
					// this.paintCircle(shape.x, shape.y, shape.size / 2, color, ctx);
					// this.paintSquare(shape.x, shape.y, shape.size, color, ctx);

				});
			}
			this.clearCanvas(this.testType.time, ctx);
		},
		paintShapesForColor(){
			var ctx = this.$el.firstChild.getContext("2d");
			ctx.clearRect(0, 0, 300, 300);
			const random = Math.floor(Math.random() * this.randomShapes.length);
			const color = "#0555FF";
			this.randomShapes.forEach((shape,i) => {
				if (i === random && this.special) {
					this.paintCircle(shape.x, shape.y, shape.size / 2, "red", ctx);
				} else {
					this.paintCircle(shape.x, shape.y, shape.size / 2, color, ctx);
				}
			});
			this.clearCanvas(this.testType.time,ctx);
		},
		paintShapesForMixed(){
			var ctx = this.$el.firstChild.getContext("2d");
			ctx.clearRect(0, 0, 300, 300);
			const random = Math.floor(Math.random() * this.randomShapes.length);
			const color = "#0555FF";
			const color2 = "red";

			this.randomShapes.forEach((shape, i) => {
				if (i === random && this.special) {
					this.paintCircle(shape.x, shape.y, shape.size / 2, color2, ctx);
				} else {
					if (i % 2 == 0) {
						this.paintCircle(shape.x, shape.y, shape.size / 2, color, ctx);
					} else {
						this.paintSquare(shape.x, shape.y, shape.size, color2, ctx);
					}

				}
			});

			this.clearCanvas(this.testType.time, ctx);
		},
		getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
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
		},

		paintCircle(x,y,size,color,ctx){
			ctx.beginPath();
			ctx.arc(x+size/2, y+size/2, size, 0, 360);
			ctx.fillStyle = color;
			ctx.closePath();
			ctx.fill();
		},

		paintSquare(x,y,size,color,ctx){
				ctx.beginPath();
				ctx.rect(x, y, size, size);
				ctx.fillStyle = color;
				ctx.closePath();
				ctx.fill();
		},

		paintTriangle(x,y,size,color,ctx){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+size*2,y);
			ctx.lineTo(x+(size),y+size*2);
			ctx.lineTo(x,y);
			ctx.fillStyle = color;
			ctx.closePath();
			ctx.fill();
		},

		paintTriangleUp(x,y,size,color,ctx){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+size*2,y);
			ctx.lineTo(x+(size),y-size*2);
			ctx.lineTo(x,y);
			ctx.fillStyle = color;
			ctx.closePath();
			ctx.fill();
		},

		paintCurve(x,y,size,color,ctx){
			ctx.beginPath();
			void ctx.ellipse(x, y, size*Math.random(), size*Math.random(), 0, 0, 90, false);
			ctx.fillStyle = color;
			ctx.stroke();
		}

	},
	props: {
		toPaint: Boolean,
		randomShapes: Array,
		special: Boolean,
		testType: Object
	},
	directives: {
	},
	mounted() {
		this.paintTest();
		
	},
	updated(){

	},
	watch:{
		testType: function(){
			this.paintTest();
		}
	}
}
	
</script>

<style>
	canvas {
	}
</style>