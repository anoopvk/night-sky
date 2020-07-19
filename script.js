var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");




var canvaswidth = window.innerWidth;
var canvasheight = window.innerHeight;
canvas.width = canvaswidth;
canvas.height = canvasheight;


var audio = document.getElementById("myaudio");
audio.volume = 0.2;
document.addEventListener('click',musictoggle);
function musictoggle(){
    audio.paused?audio.play(): audio.pause();
}




var starcount = 100;
let starsarray = [];



function star(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function () {
        c.beginPath();

        c.strokeStyle = "rgba(255,255,255,1)";
        c.fillStyle = "rgba(255,255,255,1)";

        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fill();
        c.stroke();
    }


    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > canvaswidth) {
            this.x = -5 * Math.random();
            this.y = Math.random() * canvasheight;
        }
        this.draw();
    }
}
for (let i = 0; i < starcount; i++) {
    let x = Math.random() * canvaswidth;
    let y = Math.random() * canvasheight;
    let dx = (Math.random() / 20.0) + 0.01;
    // console.log(dx);
    let dy = 0;
    let radius = dx * 5;

    starsarray.push(new star(x, y, dx, dy, radius));
    // starsarray[i].draw();

}




//moon
var moonpos = (Math.random() - 0.5) * 2 * canvaswidth - 100;
var moonspeed = (Math.random() / 200.0);
// console.log("moonspeed", moonspeed);


function moonUpdate() {
    moonpos += moonspeed;
    document.getElementById("moon").style.left = moonpos + "px";
}

//shooting star

function shootingstar(x, y, dx, dy, length, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.length = length;
    this.draw = function () {
        // Create gradient
        var grd = c.createLinearGradient(this.x, this.y, this.x + this.dx * length, this.y + this.dy * length);
        grd.addColorStop(0, "rgba(255,255,255,0.1)");
        grd.addColorStop(1, "rgba(255,255,255,1)");
        // grd.lineWidth = 10;

        c.beginPath();
        c.strokeStyle = grd;
        // c.strokeStyle = "rgba(255,0,0,1)";

        // c.fillStyle = "rgba(255,0,0,1)";
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + this.dx * length, this.y + this.dy * length);
        // console.log(this);

        c.fill();
        c.stroke();
        // console.log(this);

        // console.log("drawn");
    }


    this.update = function () {
        let prevx = this.x;
        let prevy = this.y;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();


    }
}







let sx = Math.random() * canvaswidth;
let sy = Math.random() * canvasheight;
let sdx = (Math.random() - 0.5) * 40;
let sdy = (Math.random() - 0.5) * 40;
// sdx<0?sdx=(sdx-1)*40:sdx=(sdx+1)*40;
var ss = new shootingstar(sx, sy, sdx, sdy, 5, 20);
ss.draw();

var sstimer = Math.floor(Math.random() * 500) + 10;
var sstimercurrent = 0;

// console.log(ss);










function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvaswidth, canvasheight);

    for (let i = 0; i < starsarray.length; i++) {
        starsarray[i].update();
    }
    moonUpdate();





    if (ss) {
        if (ss.x > canvaswidth || ss.x < 0 || ss.y > canvasheight || ss.y < 0) {
            if (sstimercurrent % sstimer == 0) {
                sstimer = Math.floor(Math.random() * 400) + 10;
                sstimercurrent = 0;
                let sx = Math.random() * canvaswidth;
                let sy = Math.random() * canvasheight;
                let sdx = (Math.random() - 0.5) * 40;
                let sdy = (Math.random() - 0.5) * 40;

                ss = new shootingstar(sx, sy, sdx, sdy, 5, 20);
                ss.draw();

            }
            sstimercurrent++;
        }
        // console.log(sstimer, sstimercurrent);
    }
    ss.update();
    // console.log(ss);
}


animate();