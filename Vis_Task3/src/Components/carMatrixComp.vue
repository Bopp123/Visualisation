<template>
    <div>
        <div class="text-center">
            <canvas id="canvas" width="600" height="600" @click="getCarInfo"></canvas>
        </div>
        <div class="text-center">
            <canvas id="canvas2" width="600" height="600"></canvas>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../main";
    export default {
        data: function () {
            return {
                width: 600,
                height: 600,
                matrixDim: 0,
            }
        },

        props: {
            displayData: Array,
            attributesToShow: Array
        },

        methods: {
            getCarInfo() {
                const x = event.layerX;
                const y = event.layerY;
                const tileSize = (this.width / this.matrixDim);
                const index = ((Math.ceil(y / tileSize) - 1) * this.matrixDim) + (Math.ceil(x / tileSize));
                console.log(index);
                eventBus.$emit('carClicked', this.displayData[index - 1]);
            },

            norm(x, min, max){
                return ((0.6 * (x - min)) / (max - min)) + 0.3;
            },

            paintCarMatrix(){

                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                var canvas2 = document.getElementById("canvas2");
                var ctx2 = canvas2.getContext("2d");

                ctx.clearRect(0, 0, this.width, this.height);
                ctx2.clearRect(0, 0, this.width, this.height);
                if(this.attributesToShow.length == 0) return;
                // Background
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, this.width, this.height);

                if (this.attributesToShow.length !== 0) {
                    var maxMPG = 0;
                    var maxCylinders = 0;
                    var maxDisplacement = 0;
                    var maxHorsepower = 0;
                    var maxWeight = 0;
                    var maxAcceleration = 0;
                    var maxModelyear = 0;
                    var minMPG = Infinity;
                    var minCylinders = Infinity;
                    var minDisplacement = Infinity;
                    var minHorsepower = Infinity;
                    var minWeight = Infinity;
                    var minAcceleration = Infinity;
                    var minModelyear = Infinity;

                    for (var i = 0; i < this.displayData.length; i++) {
                        var mpg = Number.parseInt(this.displayData[i].mpg);
                        var displacement = Number.parseInt(this.displayData[i].displacement);
                        var horsepower = Number.parseInt(this.displayData[i].horsepower);
                        var cylinders = Number.parseInt(this.displayData[i].cylinders);
                        var weight = Number.parseInt(this.displayData[i].weight);
                        var acceleration = Number.parseInt(this.displayData[i].acceleration);

                        if (!isNaN(mpg)) {
                            if (mpg > maxMPG) maxMPG = mpg;
                            if (mpg < minMPG) minMPG = mpg;
                        }

                        if (!isNaN(displacement)) {
                            if (displacement > maxDisplacement) maxDisplacement = displacement;
                            if (displacement < minDisplacement) minDisplacement = displacement;
                        }

                        if (!isNaN(cylinders)) {
                            if (cylinders > maxCylinders) maxCylinders = cylinders;
                            if (cylinders < minCylinders) minCylinders = cylinders;
                        }

                        if (!isNaN(horsepower)) {
                            if (horsepower > maxHorsepower) maxHorsepower = horsepower;
                            if (horsepower < minHorsepower) minHorsepower = horsepower;
                        }
                        if (!isNaN(weight)) {
                            if (weight > maxWeight) maxWeight = weight;
                            if (weight < minWeight) minWeight = weight;
                        }
                        if (!isNaN(weight)) {
                            if (acceleration > maxAcceleration) maxAcceleration = acceleration;
                            if (acceleration < minAcceleration) minAcceleration = acceleration;
                        }
                        if (typeof this.displayData[i].modelyear !== "undefined") {
                            if (this.displayData[i].modelyear > maxModelyear) maxModelyear = this.displayData[i].modelyear;
                            if (this.displayData[i].modelyear < minModelyear) minModelyear = this.displayData[i].modelyear;
                        }
                    }
                }

                var matrixDim = Math.floor(Math.sqrt(this.displayData.length));
                var tileSize = this.width / matrixDim;
                this.matrixDim = matrixDim;
                // TODO: nachkommastellen
                var counter = 0;
                var hMax = 0;
                var vMax = 0;
                var hMin = Infinity;
                var vMin = Infinity;
                var vMid = 0;
                var hMid = 0;
                for (var i = 0; i < matrixDim; i++) {
                    for (var j = 0; j < matrixDim; j++) {
                        var alpha = 1;
                        var v = 0;
                        var hArray = [];

                        var h = 60;
                        if (this.attributesToShow.length > 1) {
                            var h = h + 240;
                            if (h > 360) h = h % 360;
                        }
                        for (var k = 0; k < this.attributesToShow.length; k++) {
                            //if (k !== 0) ctx.globalAlpha = 0.5;
                            switch (this.attributesToShow[k]) {
                                case 'mpg':
                                    var normed = this.norm(this.displayData[counter].mpg, minMPG, maxMPG);
                                    hArray.push(h*normed);
                                    v += normed * 100;
                                    break;
                                case 'cylinders':
                                    var normed = this.norm(this.displayData[counter].cylinders, minCylinders, maxCylinders);
                                    hArray.push(h*normed);
                                    v += 120-( normed* 100);
                                    break;
                                case 'displacement':
                                    var normed = this.norm(this.displayData[counter].displacement, minDisplacement, maxDisplacement);
                                    hArray.push(h*normed);
                                    v += 120-( normed* 100);
                                    break;
                                case 'horsepower':
                                    var normed = this.norm(this.displayData[counter].horsepower, minHorsepower, maxHorsepower);
                                    hArray.push(h*normed);
                                    v += 120-( normed* 100);
                                    break;
                                case 'weight':
                                    var normed = this.norm(this.displayData[counter].weight, minWeight, maxWeight);
                                    hArray.push(h*normed);
                                    v += 120-( normed* 100);
                                    break;
                                case 'acceleration':
                                    var normed = this.norm(this.displayData[counter].acceleration, minAcceleration, maxAcceleration);
                                    hArray.push(h*normed);
                                    v += ( normed* 100);
                                    break;
                                case 'modelyear':
                                    var normed = this.norm(this.displayData[counter].modelyear, minModelyear, maxModelyear);
                                    hArray.push(h*normed);
                                    v += 120-( normed* 100);
                                    break;
                            }

                        }
                        v = v/this.attributesToShow.length;
                        h = hArray.reduce((acc, val) => {
                            return acc +val;
                        });
                        h  = h/hArray.length;
                        console.log(v,h);
                        ctx.fillStyle = 'hsla(' + h + ', 100%, ' + v + '%,' + alpha + ')';
                        ctx.fillRect(j * (tileSize), i * (tileSize), tileSize - 1, tileSize - 1);
                        counter += 1;

                        hMid += h;
                        vMid += v;
                        if (h > hMax){
                          hMax = h;
                          vMax = v;
                        }
                        if (h < hMin){
                          hMin = h;
                          vMin = v;
                        }
                    }
                }
                // TODO: Legende
                hMid /= counter;
                vMid /= counter;
                hMax = hMax > 360 ? 360: hMax;
                vMax = vMax > 100 ? 100: vMax;
                var grd = ctx2.createLinearGradient(50, 0, 550, 0);
                grd.addColorStop(0, 'hsla(' + hMax + ', 100%, ' + vMax + '%,' + 1 + ')');
                if (!isNaN(hMid) && !isNaN(vMid) && isFinite(hMid) && isFinite(vMid) ) {
                  grd.addColorStop(0.5, 'hsla(' + hMid + ', 100%, ' + vMid + '%,' + 1 + ')'); //TODO: not sure why values are sometimes NaN
                  grd.addColorStop(1, 'hsla(' + hMin + ', 100%, ' + vMin + '%,' + 1 + ')');
                } else {
                  grd.addColorStop(1, 'hsla(' + hMin + ', 100%, ' + vMin + '%,' + 1 + ')');
                  console.log("only 2x Gradients...");
                }
                ctx2.fillStyle = grd;
                ctx2.fillRect(0, 0, 600, 25);
                ctx2.fillStyle = "black";
                ctx2.font  = "14px Georgia";
                ctx2.textAlign = "left";
                ctx2.fillText("more", 0, 40); //TODO: legende for mpg not correct
                ctx2.textAlign = "right";
                ctx2.fillText("less", 600, 40);

                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                //ctx.strokeRect(this.xSelect-tileSize/2, this.ySelect-tileSize/2, tileSize, tileSize);
                ctx.strokeRect(this.xSelect-this.xSelect%tileSize, this.ySelect - this.ySelect%tileSize, tileSize, tileSize);
            }

        },
        watch: {
            displayData: function () {
                this.paintCarMatrix();
            },
            attributesToShow: function () {
                this.paintCarMatrix();
            }
        },
        mounted(){
            this.paintCarMatrix();
        }

    }
</script>

<style>
    canvas {
    }
</style>
