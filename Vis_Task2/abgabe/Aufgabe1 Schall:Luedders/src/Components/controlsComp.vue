<template>
	<div>
		<div class="">
			<span>right is </span>
			<input type="number" v-model="factor" step="1">
			<span> times bigger then left</span>
			<button class="btn-primary btn" @click="factorEntered">Next</button>
		</div>
		<div class="text-center ctrl">
			<select name="modeSelect" id="" @change="modeChanged">
				<option value="circle">Circle</option>
				<option value="square">Square</option>
			</select>
			<button class="btn-danger btn" @click="reset">Restart</button>
		</div>
	</div>			
</template>

<script>
import {eventBus} from "../main";
export default{
	data: function () {
		return {
			factor: 1
		} 
	},
	methods: {
		factorEntered(){
			eventBus.$emit('factorEntered', this.factor);
			this.factor = 1;
		},
		modeChanged(){
			eventBus.$emit('modeChanged');
		},
		reset(){
			eventBus.$emit('reset');
		}
	}
	}
</script>

<style>

input {
	margin: 5px;
	width:50px;
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