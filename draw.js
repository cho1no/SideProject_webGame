const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;
let moveSpeed = 5;
let jumpPower = 16;

class Sprite {
    constructor({ color, position, velocity }) {
        this.position = position;
        this.color = color;
        this.velocity = velocity;
        this.height = 100;
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }

        
    }
}
const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    }
};
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = true;
            break;
        case "d":
            keys.d.pressed = true;
            break;
        case "w":
            player.velocity.y = -jumpPower;
            keys.w.pressed = true;
            break;
    }
});
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
        case "w":
            keys.w.pressed = true;
            break;
    }
});
const player = new Sprite({
    color: "blue",
    position: {
        x: 0,
        y: 200,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});


const enemy = new Sprite({
    color: "red",
    position: {
        x: 400,
        y: 500,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    enemy.update();
    player.update();

    player.velocity.x = 0;

    if (keys.a.pressed) player.velocity.x = -moveSpeed;
    if (keys.d.pressed) player.velocity.x = moveSpeed;
}

animate();