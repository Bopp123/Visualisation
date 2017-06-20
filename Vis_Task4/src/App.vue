<template>
    <div id="app">
        <div class="flex" v-if="loaded">
            <div class="dataFilter">
                <dataFilter :attributes="attributes" :testObj="$carsData[0]"></dataFilter>
                <detailsComp></detailsComp>
            </div>
            <div class="main text-center">
                <div class="carMatrix">
                    <chart :displayedData="displayData" :attributesToShow="attributesToShow"></chart>
                </div>
            </div>
        </div>
        <div class="attriFilter" v-if="loaded">
            <controls :attributes="attributes"></controls>
        </div>
        <button v-if="!loaded" class="btn btn-primary loader" @click="openDialog">
            Choose Text File
            <input v-show="false" class="file" id="file" type="file"
                   accept="text/*" @change="getFile"></button>

    </div>
</template>

<script>
    import JsonData from '../cars.json';
    import Controls from './components/attributeControlComp.vue';
    import Details from './components/carDetailsComp.vue';
    import Filter from './components/filterComp.vue';
    import Chart from './components/chartComp.vue';
    import {eventBus} from "./main";
    export default {
        name: 'app',
        components: {
            controls: Controls,
            dataFilter: Filter,
            chart: Chart,
            detailsComp: Details
        },
        data() {
            return {
                attributes: [],
                attributesToShow: [],
                displayData: [],
                loaded: false
            }
        },
        methods: {
            init(data) {
                this.$carsData = data;
                this.displayData = this.$carsData;

                for (let variable in this.$carsData[0]) {
                    this.attributes.push(variable);
                }
                console.log(this.attributes);
                this.loaded = true;
            },
            getFile(event){
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function (event) {
                    const input = event.target.result
                    this.init(this.$formatText(input));
                }.bind(this);
            },
            openDialog(){
                document.getElementById('file').click();
            }
        },
        created() {

            /**
             * state control
             */
            eventBus.$on('attrChanged', (attr) => {
                if (this.attributesToShow.includes(attr)) {
                    var index = this.attributesToShow.indexOf(attr);
                    this.attributesToShow.splice(index, 1);
                } else {
                    this.attributesToShow.push(attr);
                }
                console.log(this.attributesToShow);
            });

            eventBus.$on('filterChanged', (filters) => {
                if (filters.length != 0)
                    this.displayData = this.$filterData(this.$carsData, filters);
                else
                    this.displayData = this.$carsData;
            });
        }
    }
</script>

<style>

    .flex {
        display: flex;
    }

    .carMatrix {
        margin-top: 3%;
        margin-right: 2%;
        margin-left: 2%;
    }

    .dataFilter {
        width: 25%;
    }

    .main {
        margin-right: auto;
        margin-left: auto;
    }

    .loader{
        margin-top: 50px;
        margin-left: 45vw;
    }

</style>
