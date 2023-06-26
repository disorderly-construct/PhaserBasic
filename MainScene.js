class MainScene extends Phaser.Scene {
    constructor() {
        super("playGame");
        // keys is an array of the keys we will listen for.
        this.keys = ['W', 'A', 'S', 'D'];
    }

    preload() {
        // Path to the image assets.
        const assetsPath = 'assets/images/cozyPeople/firstChar/';
        // Directions that the character spritesheet has.
        const directions = ['Down', 'Right', 'Up', 'Left'];

        // Load tilemap and tileset images.
        this.load.image('tiles', 'assets/images/cozyFarm/cozyFarmGlobal.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/maps/testMap.json');

        // Load character spritesheets for each direction.
        directions.forEach(direction => {
            this.load.spritesheet(`char${direction}`, `${assetsPath}${direction}/char${direction}.png`, {
                frameWidth: 32,
                frameHeight: 32
            });
        });
    }

    create() {
        // Add key listeners for WASD keys.
        this.cursors = this.input.keyboard.addKeys('W,A,S,D');

        // Create the tilemap and tileset.
        const map = this.make.tilemap({key: 'tilemap', tileWidth: 16, tileHeight: 16});
        const tileset = map.addTilesetImage('cozyFarmGlobal', 'tiles');

        // Create the layers of the tilemap.
        this.ground = map.createLayer('Ground', tileset);
        this.house = map.createLayer('Boundary', tileset);
        // Set the 'Boundary' layer to collide.
        this.house.setCollision([4897, 5044, 5045], true);

        // Create the player
        this.player = new Player(this, 30*16, 23*16);

        // Add a collision event.
        this.physics.add.collider(this.player, this.house);        
    }

    update() {
        this.player.update(this.cursors);
    }
}
