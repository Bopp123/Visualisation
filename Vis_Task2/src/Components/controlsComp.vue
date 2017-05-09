<template>
	<div>
		<div class="">
			<h2>{{question}}</h2>
			<input type="radio" name="answer" value="not" v-model="answer" id="not"><span>not found</span>
			<input type="radio" value="left" name="answer" v-model="answer"><span>left</span>
			<span>or  </span>
			<input type="radio" name="answer" value="right" v-model="answer"><span>right</span>
			<button class="btn-primary btn" @click="factorEntered">Next</button>
		</div>
		<div class="text-center ctrl">
			<button class="btn-danger btn" @click="reset">Restart</button>
		</div>
	</div>			
</template>

<script>
import {eventBus} from "../main";
export default{
	data: function () {
		return {
			answer: ""
		} 
	},
	props:{
		type: Object
	},
	methods: {
		factorEntered(){
			eventBus.$emit('factorEntered', this.answer);
		},
		reset(){
			eventBus.$emit('reset');
		}
	},
	computed:{
		question: function () {
			if(this.type.distractor == true){
				return "Where was the circle?"
			}
			switch (this.type.feature) {
				case "form":
					return "Where was the circle?"
					break;
				case "color":
					return "Where was the red circle?"
					break;
				case "mixed":
					return "Where was the red circle?"
					break;
				default:
					break;
			}
		}
	}
	}
</script>

<style>

input {
	width:20px;
}

span{
	font-size: 1.5em;
}
button{
	margin-left: 6%;
	height: 30px;
}

select {
	margin-right: 100%;
	width: 20%;
}

.ctrl{
	margin-top: 5%;
}

.btn-danger{
	    margin-top: -30px;
    margin-left: 100%;
}

</style>