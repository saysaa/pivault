const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");

const gap = 100;
const pipeWidth = 50;
let constant;

let birdX = 50;
let birdY = 150;
const birdSize = 20;
const gravity = 0.5; // Ajuster la valeur de gravité pour un mouvement plus réaliste
const lift = -10; // Force appliquée lorsque l'oiseau monte
let velocity = 0;
let score = 0;

// Contrôles tactiles et clic de souris
canvas.addEventListener("touchstart", moveUp);
canvas.addEventListener("mousedown", moveUp);

function moveUp() {
    velocity = lift;
}

// Position des tuyaux
const pipe = [];
pipe[0] = { x: canvas.width, y: 0 };

function draw() {
    // Dessiner le fond
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeWidth + gap;
        // Dessiner les tuyaux
        ctx.fillStyle = "#228B22";
        ctx.fillRect(pipe[i].x, pipe[i].y, pipeWidth, pipeWidth);
        ctx.fillRect(pipe[i].x, pipe[i].y + constant, pipeWidth, canvas.height - (pipe[i].y + constant));

        pipe[i].x--;

        if (pipe[i].x === 250) { // Ajuster l'écart entre les tuyaux pour l'écran plus large
            pipe.push({ x: canvas.width, y: Math.floor(Math.random() * pipeWidth) - pipeWidth });
        }

        // Collision
        if (birdX + birdSize >= pipe[i].x && birdX <= pipe[i].x + pipeWidth &&
            (birdY <= pipe[i].y + pipeWidth || birdY + birdSize >= pipe[i].y + constant) ||
            birdY + birdSize >= canvas.height) {
            location.reload(); // Recharger la page
        }

        if (pipe[i].x === 5) {
            score++;
        }
    }

    // Dessiner le sol
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // Dessiner l'oiseau
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(birdX, birdY, birdSize, birdSize);

    // Appliquer la gravité et mettre à jour la position de l'oiseau
    velocity += gravity;
    birdY += velocity;

    // Limiter la vitesse de l'oiseau
    if (velocity > 10) {
        velocity = 10;
    }

    // Afficher le score
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 30);

    requestAnimationFrame(draw);
}

draw();