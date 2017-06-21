<template>
    <div id="chartContainer" style="height: 500px; width: 66vw;">
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
                        data: this.createData()
                    });

                var that = this;
                setTimeout(() => {
                    that.chart.render();
                    console.log("rendering");
                }, 100);
            },
            createData: function () {
                if (this.form === "") return [
                    {
                        type: "scatter",
                        markerType: "square",
                        dataPoints: this.getDataPoints(),
                        toolTipContent: "name: {car}"
                    }
                ];

                const data = this.getDataPoints();


                const form = this.form;
                const formsArray = this.displayedData.map(value => value[form]);
                const formsArrayForMax = formsArray.map(value => Number.parseInt(value)).filter(value => !isNaN(value));
                const maxForm = Math.max(...formsArrayForMax);
                const minForm = Math.min(...formsArrayForMax);
                const differnce = maxForm -minForm;

                const devider = Math.floor(differnce / 4);
                const div1 = minForm + (devider);
                const div2 = div1 + devider;
                const div3 = div2 + devider;

                const squareArray = [];
                const triangleArray = [];
                const circleArray = [];
                const crossArray = [];

                formsArray.map(value => Number.parseInt(value)).forEach((value, index) => {
                    console.log(value, index);

                    if (value < div1)
                        squareArray.push(data[index]);
                    else if (value < div2)
                        triangleArray.push(data[index]);
                    else if (value < div3)
                        circleArray.push(data[index]);
                    else if (value < maxForm)
                        crossArray.push(data[index]);
                });

                return [
                    {
                        type: "scatter",
                        markerType: "square",
                        showInLegend: true,
                        legendText: `${minForm} - ${div1}`,
                        dataPoints: squareArray,
                        color: 'red',
                        toolTipContent: "name: {car}"
                    },
                    {
                        type: "scatter",
                        markerType: "triangle",
                        showInLegend: true,
                        legendText: `${div1 +1} - ${div2}`,
                        dataPoints: triangleArray,
                        color: 'red',
                        toolTipContent: "name: {car}"
                    },
                    {
                        type: "scatter",
                        markerType: "circle",
                        showInLegend: true,
                        legendText: `${div2 + 1} - ${div3}`,
                        dataPoints: circleArray,
                        color: 'red',
                        toolTipContent: "name: {car}"
                    },
                    {
                        type: "scatter",
                        markerType: "cross",
                        showInLegend: true,
                        legendText: `${div3 + 1} - ${maxForm}`,
                        dataPoints: crossArray,
                        color: 'red',
                        toolTipContent: "name: {car}"
                    }
                ];
            },
            getDataPoints: function () {

                const valuesforColor = this.displayedData.map(function (o) {
                    return Number.parseInt(o[this.color]);
                }.bind(this)).filter(value => !isNaN(value));
                const max = Math.max(...valuesforColor);
                const min = Math.min(...valuesforColor);

                function norm(x) {
                    return ((0.7 * (x - min)) / (max - min)) + 0.2;
                }


                const getDataObject = function getDataObject(obj) {
                    const x = Number.parseInt(obj[this.xAxis]);
                    const y = Number.parseInt(obj[this.yAxis]);
                    const name = obj.Origin || obj.Herkunft;
                    const color = Number.parseInt(obj[this.color]);
                    const hex = this.hslToHex(0, 100, 100 - (norm(color) * 100));
                    if (isNaN(x) || isNaN(y) | isNaN(color)) return {x: "undefined", y: "undefined"};
                    else return {
                        x,
                        y,
                        color: hex,
                        car: name
                    };
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
        watch: {
            displayedData: function () {
                this.initChart();
            }
        },
        created(){
            eventBus.$on('changedMapping', (mapping) => {
                this.changeMapping(mapping);
            });
        },
        mounted(){
            this.initChart();
        }
    }
</script>

<style scoped>
</style>
