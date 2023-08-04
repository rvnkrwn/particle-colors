const canvas = document.querySelector('canvas');
canvas.style.border = 'none'
console.log(canvas);

canvas.width = innerWidth;
canvas.height = innerHeight;

let particle = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", function () {
    canvas.width = this.innerWidth,
        canvas.height = this.innerHeight
})

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        particle.beginPath();
        particle.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        particle.strokeStyle = this.color
        particle.lineWidth = 3
        particle.fillStyle = 'transparent'
        particle.fill();
        particle.shadowColor = 'cyan';
        particle.shadowOffsetX = 20;
        particle.shadowOffsetY = 2;
        particle.shadowBlur = 8;
        particle.stroke();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 50) {
                this.radius++;
            }
        } else if (this.radius > 2) {
            this.radius--;
        }

        this.draw();
    }
}

let arrCircle = [];

const randomColor = [
    "#4E4FEB",
    "#068FFF",
    "#EEEEEE",
    "#176B87",
    "#FFD95A",
    "#F11A7B",
    "#79E0EE",
    "#0079FF",
    "#FF0060",
]


for (let i = 0; i < (innerWidth + innerHeight) / 2; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let radius = Math.random() * 10;
    let dx = Math.random();
    let dy = Math.random();
    const randIndex = Math.floor(Math.random() * 10);
    const color = randomColor[randIndex];
    console.log(color)
    arrCircle.push(new Circle(x, y, dx, dy, radius, color));
}


function animate() {
    requestAnimationFrame(animate);
    particle.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < arrCircle.length; i++) {
        arrCircle[i].update()
    }
}
animate()