let game;

function startGame() {
    game = new Game(1);
    window.requestAnimationFrame(frame);
}

function frame() {
    if (!game.Running) { game = null; return; }
    
    game.Players.forEach(player => {
        if (player.delayCheck) {
            player.down();
            player.DrawBoard(document.getElementById("canvas_" + player.id));
        }
    });
    
    window.requestAnimationFrame(frame);
}

function endGame() {
    game.Running = false;
}