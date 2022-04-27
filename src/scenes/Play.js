class Play extends Phaser.Scene {
        constructor(){
                super("playScene");
        }

        preload() {
                // load images/tile sprites
                this.load.image('dino', './assets/dino.png');
                this.load.image('log', './assets/log.png');
                this.load.image('tile', './assets/background.png');
        }

        create() {
                this.gameOver = false;

                // play bgm
                // this.bgm = this.sound.add('bgm', {
                //         mute: false,
                //         volume: 1,
                //         rate: 1,
                //         loop: true
                // });
                // this.bgm.play();

                // define keys
                keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
                keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
                keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

                // player animation
                // this.anims.create({
                //         key: 'wiggle',
                //         frames: this.anims.generateFrameNumbers('dino', { start: 0, end: 1 }),
                //         frameRate: 30,
                //         repeat: -1
                //     });

                // place tile sprite
                this.bgtile = this.add.tileSprite(0, 0, 640, 480, 'tile').setOrigin(0, 0);

                // create player model
                this.dinosaur = this.physics.add.sprite(centerX, h - 40, 'dino').setOrigin(0.5);
                this.dinosaur.destroyed = false;
                this.dinosaur.setImmovable(false);
                // this.dinosaur.setMaxVelocity(0, 400);
                this.dinosaur.setVelocityX(0);
                this.dinosaur.setBounce(0.2);
                this.dinosaur.setCollideWorldBounds(true);
                this.dinosaur.body.allowGravity = false;
                
                // add keys
                cursors = this.input.keyboard.createCursorKeys();

                // obstacle group
                this.ObstacleGroup = this.add.group();

                // spawning obstacles
                this.time.delayedCall(1000, () => {
                        this.addObstacle();
                });
        }

        update() {
                // check for gameover
                if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        this.scene.restart();
                }
                if (!this.gameOver) {
                        this.bgtile.tilePositionY -= 2;
                }

                // player movements
                if (this.dinosaur.destroyed = false) {
                        if (cursors.A.isDown) {
                                this.dinosaur.setVelocityX(-200);
                                // this.dinosaur.anims.play('wiggle');
                        }
                        else if (cursors.D.isDown) {
                                this.dinosaur.setVelocityX(200);
                                // this.dinosaur.anims.play('wiggle');
                        }
                        else {
                                this.dinosaur.setVelocityX(0);
                        }
                        // check for collisions
                        this.physics.world.collide(this.dinosaur, this.ObstacleGroup, this.DinoCollision, null, this);
                }
        }

        addObstacle() {
                // create new obstacles
                let obstacle = new Obstacle(this, 400);
                this.ObstacleGroup.add(obstacle);
        }

        DinoCollision() {
                // if dinosaur collide, gameover
                this.dinosaur.destroyed = true;
                // this.sound.play('death', { volume: 0.5 });
                this.cameras.main.shake(1000, 0.0075);
                this.dinosaur.destroy();
                // display gameover


                // after gameover, delay 3 seconds and go to menu
                this.time.delayedCall(3000, () => {
                        this.gameOver = true;
                        this.scene.start('menuScene');
                });
        }
}