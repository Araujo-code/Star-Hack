//Estructura canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// Jugador1
const player1 = "images/IronBlack.png";
// Jugador2 o Boot
const boot1 = "images/IronGris.png";
// Aliados
const ally1 = "images/R2D2.png";
const ally2 = "images/Chewbacca.png";
// Armas
const shooting1 = "images/Tecate.png";
const shooting2 = "images/TeateLight.png";
// Fondo
const bg = "images/Terraza.png";
const lose = "images/GameOver.png";
const won = "images/You Win.png";
let interval;
const allies = [];
const shootsPlayer = [];
const shootsBoot = [];
let frames = 0;
//Audio
let audioInicio = new Audio();
audioInicio.src =
  "./Audio/star_wars_episodio_vii_el_despertar_de_la_fuerza.mp3";
let soyPadre = new Audio();
soyPadre.src = "./Audio/yo_soy_tu_padre_star_wars.mp3";
//Clases
class Board {
  constructor(img) {
    this.img = new Image();
    this.img.src = img;
    this.img.onload = () => {
      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
    };
  }
  draw() {
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
  }
}
class Shooter2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = -70;
    this.height = -40;
    this.img = new Image();
    this.img.src = shooting2;
  }
  draw() {
    this.x -= 10;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
class Shooter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 40;
    this.img = new Image();
    this.img.src = shooting1;
  }
  draw() {
    this.x += 10;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
class Player {
  constructor() {
    this.width = 200;
    this.height = 200;
    this.hp = 250;
    this.x = 10;
    this.y = canvas.height - this.height - 40;
    this.sx = 0;
    this.sy = 0;
    this.img = new Image();
    this.img.src = player1;
    this.img.onload = () => {
      ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        614 / 2,
        495,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };
  }
  draw() {
    if (frames % 10 === 0) {
      this.sx += 307;
    }
    if (this.sx >= 614) this.sx = 0;
    ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      614 / 2,
      495,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  damage() {
    this.hp = this.hp - 10;
  }
  moveUp() {
    this.y -= 10;
  }
  moveDown() {
    this.y += 10;
  }
  moveLeft() {
    this.x -= 10;
  }
  moveRight() {
    this.x += 10;
  }
  // move() {
    
  //     this.sx += 307;
    
  // }
  touchPlayer(shooter) {
    return (
      this.x + this.width > shooter.x &&
      this.y < shooter.y + shooter.height &&
      this.y + this.height > shooter.y
    );
  }
  shoot() {
    const w = new Shooter(this.x + this.width, this.y + this.height / 20000);
    shootsPlayer.push(w);
  }
}
class Boot {
  constructor() {
    this.width = 200;
    this.height = 200;
    this.hp = 250;
    this.x = canvas.width - this.width ;
    this.y = canvas.height - (this.height + 40);
    this.sx = 0;
    this.sy = 0;
    this.img = new Image();
    this.img.src = boot1;
    this.img.onload = () => {
      ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        614 / 2,
        495,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };
  }
  draw() {
    if (frames % 10 === 0) {
      this.sx += 307;
    }
    if (this.sx >= 614) this.sx = 0;
    ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      614 / 2,
      495,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  damage() {
    this.hp -= 10;
  }
  moveUp() {
    this.y -= 10;
  }
  moveDown() {
    this.y += 10;
  }
  moveLeft() {
    this.x -= 10;
  }
  moveRight() {
    this.x += 10;
  }
  // move() {
  //   this.sx += 307;
  // }
  shoot() {
    const w2 = new Shooter2(this.x + this.width, this.y + this.height / 1.5);
    shootsBoot.push(w2);
    console.log(shootsBoot);
  }
  touchBoot(shooter) {
    return (
      this.x < shooter.x + shooter.width &&
      this.x + this.width > shooter.x &&
      this.y < shooter.y + shooter.height &&
      this.y + this.height > shooter.y
    );
  }
}
class Ally {
  constructor(x, y) {
    this.width = 20;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = ally1;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x--;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
class Ally2 {
  constructor(x, y) {
    this.width = 20;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = ally1;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x--;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
// Declaraciones
const board = new Board(bg);
const player = new Player();
const boot = new Boot();
const ally = new Ally(0, 0);
//Juego
function update() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  player.draw();
  boot.draw();
  //   generateAllies()
  //   drawAllies()
  drawShoots();
  drawLife();
  checkCollition2();
  checkCollition();
  audioInicio.play();
}
//Inicio de juego
function start() {
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}
function gameOver() {
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const overBackgrund = new Board(lose);
  overBackgrund.draw();
}
//Ganaste!!!
function win() {
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const winBackgrund = new Board(won);
  winBackgrund.draw();
  soyPadre.play();
}
// Crear allies
// function generateAllies() {
//   if (frames % 50 === 0) {
//     const max = canvas.height - 40
//     const min = canvas.height / 2
//     const randomHeight = Math.floor(Math.random() * max) + min
//     const ally = new Ally(boot.x, randomHeight)
//     allies.push(ally)
//   }
// }
// function drawAllies() {
//   allies.forEach(ally => ally.draw())
// }
function drawShoots() {
  shootsPlayer.forEach(shoot => shoot.draw());
  shootsBoot.forEach(shoot => shoot.draw());
}
function checkCollition() {
  //   allies.forEach(ally => {
  //     if (player.touchBoot(ally)) {
  //       gameOver()
  //     }
  //   })
  shootsPlayer.forEach((shoot, index) => {
    if (boot.touchBoot(shoot)) {
      console.log("cc ---- damage");
      shootsPlayer.splice(index, 1);
      boot.damage();
    }
  });
  if (boot.hp === 0) {
    win();
  }
}
function checkCollition2() {
  //   allies.forEach(ally => {
  //     if (boot.touchPlayer(ally)) {
  //       gameOver()
  //     }
  //   })
  shootsBoot.forEach((shoot, index) => {
    console.log("x validation", player.touchPlayer(shoot));
    if (player.touchPlayer(shoot)) {
      console.log("cc2 ---- damage");
      shootsBoot.splice(index, 1);
      player.damage();
    } else if (shoot.x < 0) {
      shootsBoot.splice(index, 1);
    }
  });
  if (player.hp === 0) {
    win();
  }
}
function drawLife() {
  ctx.fillStyle = "black";
  ctx.fillRect(25, 25, 350, 40);
  ctx.fillRect(canvas.width - 375, 25, 350, 40);
  // ctx.drawImage()
  ctx.fillStyle = "red";
  ctx.fillRect(30, 30, (340 * player.hp) / 250, 30);
  ctx.fillRect(canvas.width - 30, 30, -((340 * boot.hp) / 250), 30);
}
start();
// addEventListener("keypress", function(e) {
//   console.log(e.keyCode);
//   switch (e.keyCode) {
//     case 119:
//       boot.moveUp();
//       break;
//     case 115:
//       boot.moveDown();
//       break;
//     case 105:
//       e.preventDefault();
//       player.moveUp();
//       break;
//     case 107:
//       e.preventDefault();
//       player.moveDown();
//       break;
//     default:
//       console.log("ya valió v");
//   }
// });

addEventListener("keyup", function(e) {
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 79:
      boot.moveUp();
      break;
    case 75:
      boot.moveDown();
      break;
    case 87:
      e.preventDefault();
      player.moveUp();
      break;
    case 83:
      e.preventDefault();
      player.moveDown();
      break;
    default:
      console.log("ya valió v");
  }
});

addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 68:
      player.shoot();
      break;
    case 74:
      boot.shoot();
      break;
  }
});
