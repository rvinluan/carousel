var canvas = $("#screen"),
    c = canvas[0].getContext('2d');

var Baggage = function(xC, yC, col) {
    this.x = xC;
    this.y = yC;
    this.width = this.generateProperty("width");
    this.height = this.generateProperty("surfaceArea") / this.width;
    this.depth = this.generateProperty("depth");
    this.radius = this.generateProperty("radius");
    this.id = col;
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

Baggage.prototype.render = function() {
    c.fillStyle = "#999999";
    roundRect(c, this.x, this.y, this.width, this.height, this.radius, c.fillStyle, false);
    c.fillStyle = "#AAAAAA";
    roundRect(c, this.x, this.y + this.depth, this.width, this.height - this.depth, this.radius, c.fillStyle, false);
    // c.fillStyle = "#000000";
    // c.fillText(this.id, this.x, this.y);
}

function dlb(bag) {
    var ty = bag.y + bag.height + 30;
    c.beginPath();
    c.moveTo(bag.x, ty);
    c.lineTo(bag.x + bag.width, ty);
    c.strokeStyle = "#FF0000"
    c.stroke();
}

Baggage.prototype.collapse = function(lastRow, thisIndex) {
    if(lastRow.length == 0) {
        return;
    }
    var targetBaggage = lastRow[thisIndex],
        targetY;
    if(targetBaggage) {
        targetY = targetBaggage.y + targetBaggage.height + 30;
        //debug
        //go left and try to find an intersecting bag
        for(var i = thisIndex - 1; i >= 0; i--) {
            if(lastRow[i]) {
                var testX = lastRow[i].x + lastRow[i].width + 30;
                if(testX < this.x) {
                    break;
                } else if(lastRow[i].y + lastRow[i].height + 30 > targetY) {
                    targetY = lastRow[i].y + lastRow[i].height + 30;
                    break;
                } else {
                    break;
                }
            }
        }
        //go right and try to find an intersecting bag
        for(var i = thisIndex + 1; i < lastRow.length; i++) {
            if(lastRow[i]) {
                var testX = lastRow[i].x;
                if(testX > this.x + this.width + 30) {
                    break;
                } else if(lastRow[i].y + lastRow[i].height + 30 > targetY) {
                    targetY = lastRow[i].y + lastRow[i].height + 30;
                }
            }
        }
        this.y = targetY;
    }
}

var baggages = [],
    lastRow = [],
    thisRow = [],
    lastLeft = 25;
    row = 0,
    col = 0;

for(var i = 0; i < 30; i++) {
    var b = new Baggage(lastLeft, row*200 + Math.floor(Math.random() * (75 + 25) - 25), col);
    b.collapse(lastRow, col);
    baggages.push(b);
    thisRow.push(b);
    b.render();
    lastLeft = lastLeft + b.width + 30;
    col++;
    if(lastLeft >= 800) {
        lastLeft = 0;
        col = 0;
        row++;
        lastRow = thisRow;
        thisRow = [];
    }
}
