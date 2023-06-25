class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
        // keysPressed is a Set that will hold the keys currently being pressed.
        this.keysPressed = new Set();
        // lastAnimKey is a string that will hold the last direction that the player moved in.
        this.lastAnimKey = '';
        // keys is an array of the keys we will listen for.
        this.keys = ['W', 'A', 'S', 'D'];
        // actions is an object mapping keys to their respective actions.
        this.actions = {
            'W': this.moveUp.bind(this),
            'A': this.moveLeft.bind(this),
            'S': this.moveDown.bind(this),
            'D': this.moveRight.bind(this)
        };
        this.house = null; // Declare here
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
        this.house = map.createLayer('Boundary', tileset); // Assign here
        // Set the 'Boundary' layer to collide.
        this.player = this.physics.add.sprite(30*16, 23*16, 'charDown');
        this.physics.add.collider(this.player, this.house); // Access with this.house
        this.house.setCollision([4897, 5044, 5045], true);
        
        

        // Add a collision event.
        this.physics.world.on('collide', function () {
            console.log('Collision happened!');
        });
        

        // Directions for animations.
        const anims = ['up', 'down', 'right', 'left'];

        // Create animations for each direction.
        anims.forEach(anim => {
            this.anims.create({
                key: anim,
                frames: this.anims.generateFrameNumbers(`char${anim.charAt(0).toUpperCase() + anim.slice(1)}`, {start: 0, end: 7}),
                frameRate: 13,
                repeat: -1
            });
        });
    }

    update() {
        // Reset the player's velocity.
        this.player.setVelocity(0, 0);
    
        // Check for key presses.
        if (this.cursors.W.isDown && !this.keysPressed.has('W')) {
            this.keysPressed.add('W');
        } else if (!this.cursors.W.isDown) {
            this.keysPressed.delete('W');
        }
    
        if (this.cursors.A.isDown && !this.keysPressed.has('A')) {
            this.keysPressed.add('A');
        } else if (!this.cursors.A.isDown) {
            this.keysPressed.delete('A');
        }
    
        if (this.cursors.S.isDown && !this.keysPressed.has('S')) {
            this.keysPressed.add('S');
        } else if (!this.cursors.S.isDown) {
            this.keysPressed.delete('S');
        }
    
        if (this.cursors.D.isDown && !this.keysPressed.has('D')) {
            this.keysPressed.add('D');
        } else if (!this.cursors.D.isDown) {
            this.keysPressed.delete('D');
        }
    
        // If any keys are being pressed, take the last one and perform the corresponding action.
        if (this.keysPressed.size > 0) {
            let lastKeyPressed = Array.from(this.keysPressed).pop();
            this.actions[lastKeyPressed]();
        } else {
            // If no keys are being pressed and an animation is playing, stop the animation and set the player's texture to the first frame of the last animation played.
            if (this.player.anims.isPlaying) {
                this.player.anims.stop();
                this.player.setTexture(`char${this.lastAnimKey.charAt(0).toUpperCase() + this.lastAnimKey.slice(1)}`, 0);
            }
        }
    }
    
    

    // These four methods move the player in the specified direction and play the corresponding animation.
    moveUp() {
        this.player.setVelocityY(-75); // Adjust the velocity value as needed
        this.lastAnimKey = 'up';
        this.player.anims.play('up', true);
    }
    
    moveDown() {
        this.player.setVelocityY(75); // Adjust the velocity value as needed
        this.lastAnimKey = 'down';
        this.player.anims.play('down', true);
    }
    
    moveRight() {
        this.player.setVelocityX(75); // Adjust the velocity value as needed
        this.lastAnimKey = 'right';
        this.player.anims.play('right', true);
    }
    
    moveLeft() {
        this.player.setVelocityX(-100); // Adjust the velocity value as needed
        this.lastAnimKey = 'left';
        this.player.anims.play('left', true);
    }
}
