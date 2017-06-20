<template>
    <div>
        <h2>Define Attributes</h2>
        <div class="flex attriMain">
            <div id="x" class="flex select">
                <h3>X Value: </h3>
                <select v-model="selectedX">
                    <option disabled value="">Please Select</option>
                    <option v-for="attri in attributes" v-bind:value="attri">
                        {{ attri }}
                    </option>
                </select>
            </div>
            <div id="y" class="flex select">
                <h3>Y Value: </h3>
                <select v-model="selectedY">
                    <option disabled value="">Please Select</option>
                    <option v-for="attri in attributes" v-bind:value="attri">
                        {{ attri }}
                    </option>
                </select>
            </div>
            <div id="color" class="flex select">
                <h3>Color: </h3>
                <select v-model="selectedColor">
                    <option disabled value="">Please Select</option>
                    <option v-for="attri in attributes" v-bind:value="attri">
                        {{ attri }}
                    </option>
                </select>
            </div>
            <div id="form" class="flex select">
                <h3>Form: </h3>
                <select v-model="selectedForm">
                    <option disabled value="">Please Select</option>
                    <option v-for="attri in attributes" v-bind:value="attri">
                        {{ attri }}
                    </option>
                </select>
            </div>
            <button class="btn btn-primary" @click="attributesChanged">Update</button>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../main";
    export default {
        data () {
            return {
                selectedX: "",
                selectedY: "",
                selectedColor: "",
                selectedForm: ""
            }
        },
        props: {
            attributes: Array
        },
        methods: {
            attributesChanged: function (attribute) {
                eventBus.$emit('changedMapping', {
                    x: this.selectedX,
                    y: this.selectedY,
                    color: this.selectedColor,
                    form: this.selectedForm
                });
            }
        },
        created(){
            this.selectedX = this.attributes[2];
            this.selectedY = this.attributes[4];
            this.selectedColor = this.attributes[5];
            eventBus.$emit('changedMapping', {
                x: this.selectedX,
                y: this.selectedY,
                color: this.selectedColor,
                form: this.selectedForm
            });
        }
    }
</script>

<style scoped>


    label {
        font-size: 25px;
    }

    .attri {
        margin-right: 20px;
        margin-bottom: 20px;
    }

    .attriMain {
        max-width: 1000px;
    }

    h2 {
        margin-bottom: 20px;
        border-bottom: 1px solid black;
    }

    .select {
        margin-right: 20px;
    }

    select {
        height: 30px;
        margin-top: 20px;
        margin-left: 5px;
    }

    .btn {
        height: 30px;
        margin-top: 20px;
    }

</style>
