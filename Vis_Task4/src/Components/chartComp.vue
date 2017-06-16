<template>
    <div>
        <div v-show="init" id="chartContainer" style="height: 500px; width: 66vw;">
        </div>
        <button v-if="!init" @click="initChart" class="btn btn-primary">init</button>
    </div>
</template>

<script>
    import {eventBus} from "../main";
    export default {
        data () {
            return {
                chart: {},
                init: false,
                xAxis: "modelyear",
                yAxis: "mpg",
                color: "horsepower",
                form: ""
            }
        },
        props: {
            attributesToShow: Array,
            displayedData: Array
        },
        methods: {
            attributeChanged: function (attribute) {
                eventBus.$emit('attrChanged', attribute);
            },
            initChart: function () {
                this.init = true;
                const data = this.getDataPoints();
                const maxY = Math.max.apply(Math, data.map(function (o) {
                    return o.y;
                }));
                const maxX = Math.max.apply(Math, data.map(function (o) {
                    return o.x;
                }));

                const minY = Math.min.apply(Math, data.map(function (o) {
                    return o.y;
                }));
                const minX = Math.min.apply(Math, data.map(function (o) {
                    return o.x;
                }));
                console.log(maxX, "  ", maxY, "  ", minX, "  ", minY);
                this.chart = new CanvasJS.Chart("chartContainer",
                    {
                        title: {
                            text: "Cars",
                        },
                        zoomEnabled: true,
                        axisX: {
                            title: this.xAxis,

                        },
                        axisY: {
                            title: this.yAxis,
                        },
                        data: [
                            {
                                type: "scatter",
                                markerType: "square",
                                dataPoints: data
                            }
                        ]
                    });

                var that = this;
                setTimeout(() => {
                    that.chart.render();
                }, 100);
            },
            getDataPoints: function () {

                const valuesforColor = this.displayedData.map(function (o) {
                    return Number.parseInt(o[this.color]);
                }.bind(this)).filter(value => !isNaN(value));
                const max = Math.max(...valuesforColor);
                const min = Math.min(...valuesforColor);
                debugger;
                function norm(x){
                    return ((0.7 * (x - min)) / (max - min)) + 0.3;
                }


                const getDataObject = function getDataObject(obj) {
                    const x = Number.parseInt(obj[this.xAxis]);
                    const y = Number.parseInt(obj[this.yAxis]);
                    const color = Number.parseInt(obj[this.color]);
                    const hex = this.hslToHex(0,100,norm(color)*100);
                    if(isNaN(x) || isNaN(y) | isNaN(color)) return{x:"undefined",y:"undefined"};
                    else return {x, y, color:hex};
                }.bind(this);

                return this.displayedData.map(value => getDataObject(value));
            },
            changeMapping: function (mapping) {
                this.xAxis = mapping.x;
                this.yAxis = mapping.y;
                this.color = mapping.color;
                this.form = mapping.form;
                this.initChart();
            },
            hslToHex: function (h, s, l) {
                h /= 360;
                s /= 100;
                l /= 100;
                let r, g, b;
                if (s === 0) {
                    r = g = b = l; // achromatic
                } else {
                    const hue2rgb = (p, q, t) => {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    };
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3);
                }
                const toHex = x => {
                    const hex = Math.round(x * 255).toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                };
                return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
            }
        },
        watch:{
            displayedData: function () {
                this.initChart();
            }
        },
        created(){
            eventBus.$on('changedMapping', (mapping) => {
                this.changeMapping(mapping);
            });
        }
    }
</script>

<style scoped>
</style>
