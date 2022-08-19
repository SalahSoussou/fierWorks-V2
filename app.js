/**@type {HTMLCanvasElement}*/
const ctx = cnv.getContext("2d");
cnv.width = innerWidth;
cnv.height = innerHeight;

let mouse = { x: cnv.width / 2, y: cnv.height / 2 };

addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
addEventListener("resize", () => {
  cnv.width = innerWidth;
  cnv.height = innerHeight;
});

class Particle {
  constructor(x, y, radius, color, vl) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.angle = 0;
    this.vl = vl;
    this.ttl = ~~(Math.random() * 200 + 200);

    this.update = () => {
      this.x += this.vl.x;
      this.y += this.vl.y;
      this.ttl--;
      this.draw();
    };
    this.draw = () => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    };
  }
}
let particles;
function init() {
  let radius = 100;
  particles = [];
}
let hue = 0;
function generate() {
  setTimeout(generate, 300);
  for (let i = 0; i < 30; i++) {
    const radian = (Math.PI * 2) / 30;
    const xp = mouse.x;
    const yp = mouse.y;
    let color = `hsl(${hue},75%, 50%)`;
    particles.push(
      new Particle(xp, yp, 2.5, color, {
        x: Math.cos(radian * i),
        y: Math.sin(radian * i),
      })
    );
  }
  hue += 5;
}

function animate() {
  ctx.fillStyle = `rgba(0, 0, 0, 0.15)`;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  particles.forEach((particle, i) => {
    if (particle.ttl < 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });
  requestAnimationFrame(animate);
}
init();
generate();
animate();
