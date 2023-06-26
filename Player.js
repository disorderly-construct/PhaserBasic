class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'charDown');
  
      // Add this object to the existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Enable physics for this player
      this.setCollideWorldBounds(true);
  
      // Initialize keysPressed
      this.keysPressed = new Set();
  
      // Initialize lastAnimKey
      this.lastAnimKey = '';
  
      // Create the animations
      this.createAnimations(scene);
    }
  
    createAnimations(scene) {
      // Directions for animations
      const anims = ['up', 'down', 'right', 'left'];

      this.actions = {
        W: this.moveUp.bind(this),
        A: this.moveLeft.bind(this),
        S: this.moveDown.bind(this),
        D: this.moveRight.bind(this),
      };
  
      // Create animations for each direction
      anims.forEach(anim => {
        scene.anims.create({
          key: anim,
          frames: scene.anims.generateFrameNumbers(`char${anim.charAt(0).toUpperCase() + anim.slice(1)}`, { start: 0, end: 7 }),
          frameRate: 13,
          repeat: -1
        });
      });
    }
  
    update(cursors) {
      // Reset the player's velocity.
      this.setVelocity(0, 0);
  
      // Check for key presses.
      if (cursors.W.isDown && !this.keysPressed.has('W')) {
        this.keysPressed.add('W');
      } else if (!cursors.W.isDown) {
        this.keysPressed.delete('W');
      }
  
      if (cursors.A.isDown && !this.keysPressed.has('A')) {
        this.keysPressed.add('A');
      } else if (!cursors.A.isDown) {
        this.keysPressed.delete('A');
      }
  
      if (cursors.S.isDown && !this.keysPressed.has('S')) {
        this.keysPressed.add('S');
      } else if (!cursors.S.isDown) {
        this.keysPressed.delete('S');
      }
  
      if (cursors.D.isDown && !this.keysPressed.has('D')) {
        this.keysPressed.add('D');
      } else if (!cursors.D.isDown) {
        this.keysPressed.delete('D');
      }
  
      // If any keys are being pressed, take the last one and perform the corresponding action.
      if (this.keysPressed.size > 0) {
        let lastKeyPressed = Array.from(this.keysPressed).pop();
        this.actions[lastKeyPressed]();
      } else {
        // If no keys are being pressed and an animation is playing, stop the animation and set the player's texture to the first frame of the last animation played.
        if (this.anims.isPlaying) {
          this.anims.stop();
          this.setTexture(`char${this.lastAnimKey.charAt(0).toUpperCase() + this.lastAnimKey.slice(1)}`, 0);
        }
      }
    }
  
    moveUp() {
      this.setVelocityY(-75);
      this.lastAnimKey = 'up';
      this.anims.play('up', true);
    }
  
    moveDown() {
      this.setVelocityY(75);
      this.lastAnimKey = 'down';
      this.anims.play('down', true);
    }
  
    moveRight() {
      this.setVelocityX(75);
      this.lastAnimKey = 'right';
      this.anims.play('right', true);
    }
  
    moveLeft() {
      this.setVelocityX(-100);
      this.lastAnimKey = 'left';
      this.anims.play('left', true);
    }
  }
  