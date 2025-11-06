function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0);
}

function star(x, y) {
    fill(255, 234, 0);
    noStroke();
    triangle(x, y - 50, x - 20, y, x + 20, y);
    triangle(x - 50, y - 20, x, y - 20, x, y + 10);
    triangle(x + 50, y - 20, x, y - 20, x, y + 10);
    triangle(x - 20, y - 5, x, y + 10, x - 35, y + 30);
    triangle(x, y + 10, x + 20, y - 5, x + 35, y + 30);
}





















































// class Star {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     draw() {
//         star(this.x, this.y);
//     }

//     fall(speed) {
//         this.y = this.y + speed;
//     }

//     shoot(speed) {
//         this.x = this.x + speed;
//     }
// }











