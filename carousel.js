var canvas = $("#screen"),
    c = canvas[0].getContext('2d');

var Baggage = function() {
    this.width = this.generateProperty("width");
    this.height = this.generateProperty("surfaceArea") / this.width;
    this.depth = this.generateProperty("depth");
    this.radius = this.generateProperty("radius");
}

Baggage.prototype.CONSTRAINTS = {
    width: [80, 140],
    surfaceArea: [9900, 10100],
    depth: [20, 40],
    lightColor: "#EEEEEE",
    darkColor: "#999999",
    radius: [0, 8]
}

Baggage.prototype.generateProperty = function(propName) {
    var min = this.CONSTRAINTS[propName][0],
        max = this.CONSTRAINTS[propName][1];

    return Math.floor(Math.random() * (max - min) + min);
}

Baggage.prototype.render = function(x, y) {
    c.fillStyle = "#999999";
    roundRect(c, x, y, this.width, this.height, this.radius, c.fillStyle, false);
    c.fillStyle = "#AAAAAA";
    roundRect(c, x, y + this.depth, this.width, this.height - this.depth, this.radius, c.fillStyle, false);
}

var baggages = [],
    lastLeft = 25;

for(var i = 0; i < 5; i++) {
    var b = new Baggage();
    baggages.push(b);
    b.render(lastLeft, 200 + Math.floor(Math.random() * (75 + 25) - 25));
    lastLeft = lastLeft + b.width + 30;
}
