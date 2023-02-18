// CONSTANTES
const WIDTH = 900;
const HEIGHT = 900;
const BACKGROUND_COLOR = "black";

const STAR_COLOR = "white";
const STAR_NB = 15;
const STAR_SIZE_MIN = 2;
const STAR_SIZE_MAX = 12;
const STAR_SPEED = 1;

const ASTEROID_NB = 20;
const ASTEROID_SIZE_MIN = 30;
const ASTEROID_SIZE_MAX = 65;
const ASTEROID_SPEEDS = [4, 5, 7, 10];

const CAPSULE_SPEED = 10;
const CAPSULE_SIZE = 70;
const CAPSULE_Y = 150;

const GAME_OVER_WIDTH = 850;
const GAME_OVER_HEIGHT = 425;

const DIRECTION = {NONE: 0, LEFT: 1, RIGHT: 2};

const IMG_GAME_OVER = "ressources/game_over.png"
const IMG_CAPSULE = "ressources/capsule.png"
const IMG_ASTEROID_1 = "ressources/asteroid1.png"
const IMG_ASTEROID_2 = "ressources/asteroid2.png"
const IMG_ASTEROID_3 = "ressources/asteroid3.png"
const IMG_ASTEROID_4 = "ressources/asteroid4.png"

// VARIABLES
let game_over = false;
let stars = [];
let asteroids = [];
let capsule;

// CLASSES
// Définition de l'étoile


// Définition de l'astéroide
class Asteroid {
    constructor() {
        this.position = createVector(0, 0);
        this.init();
    }

    init() {
        this.size = random(ASTEROID_SIZE_MIN, ASTEROID_SIZE_MAX);
        this.position.set(random(-this.size, WIDTH), random(-this.size, -HEIGHT));
        this.speed = random(ASTEROID_SPEEDS);
    }

    display() {
        image(
            this.img,
            this.position.x, this.position.y,
            this.size, this.size
            )
    }

    checkCollision(capsule) {
        if (this.position.y > HEIGHT)
            this.init();
    }
    
    fall() {
        this.position.y += this.speed;
    }
}

// Définition de la capsule
class Capsule {
    constructor() {
        this.direction = "NONE"
        this.speed = CAPSULE_SPEED;
        this.size = CAPSULE_SIZE;
        this.position = createVector(0, 0);
    }

    display() {
        image(capsule_img, this.position.x, this.position.y, this.size, this.size);
    }

    move() {
        if (this.direction === DIRECTION.LEFT)
            this.position.x -= 0;
        if (this.direction === DIRECTION.RIGHT)
            this.position.x += 0;
    }
}

// FONCTIONS
// Fonction executée avant setup pour charger des ressources
function preload() {
    
}

// Fonction executée au lancement du jeu
function setup() {
    createCanvas(WIDTH, HEIGHT);
    
    capsule = new Capsule();

    for (var i = 0; i < STAR_NB; i++)
        stars.push(new Star());

    for (var i = 0; i < ASTEROID_NB; i++)
        asteroids.push(new Asteroid());
}

// Fonction executée en boucle tant que le jeu est ouvert
function draw() {
    clear();
    background(BACKGROUND_COLOR);

    for (const star of stars) {
        star.fall();
        star.display();
    }

    capsule.move();
    capsule.display();

    for (const asteroid of asteroids) {
        asteroid.fall();
        asteroid.checkCollision(capsule);
        asteroid.display();
    }
}

// Fonction executée lorsqu'une touche est pressée
function keyPressed() {
    if (keyCode === LEFT_ARROW)
        capsule.direction = DIRECTION.LEFT;
    else if (keyCode === RIGHT_ARROW)
        capsule.direction = DIRECTION.RIGHT;
}

// Fonction executée lorsqu'une touche est relachée
function keyReleased() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {}
        capsule.direction = DIRECTION.NONE;
}
