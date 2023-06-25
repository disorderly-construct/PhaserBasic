var config = {
    type: Phaser.CANVAS,
    parent: 'game-wrapper',
    width: 1280,
    height: 720,
    antialias: false, // Disable antialiasing for sprite graphical issue
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: false
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Scene1, Scene2]
};


var game = new Phaser.Game(config);

function preload() {
    
}

function create() {
    
}

function update() {
}