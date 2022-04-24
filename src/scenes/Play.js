class Play extends Phaser.Scene {
        constructor(){
                super("playScene");
        }

        preload() {
                // load images/tile sprites
                this.load.image('dino', './assets/dino.png');
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
                cursors = this.input.keyboard.createCursorKeys();

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
                dinosaur = this.physics.add.sprite(centerX, 0, 'dino').setOrigin(0.5);
                dinosaur.destroyed = false;
                dinosaur.setImmovable();
                dinosaur.setMaxVelocity(0, 400);
                dinosaur.setBounce(0.2);
                dinosaur.setCollideWorldBounds(true);
                dinosaur.body.allowGravity = false;
                
                this.physics.add.collider(dinosaur, this.ObstacleGroup);

                // obstacle group
                this.ObstacleGroup = this.add.group();

                // spawning obstacles
                this.time.delayedCall(1000, () => {
                        this.addObstacle();
                });
        }

        update() {
                // check for gameover
                if (this.gameOver && cursors.SPACE.isDown) {
                        this.scene.restart();
                }
                if (!this.gameOver) {
                        this.bgtile.tilePositionY -= 2;
                }

                // player movements
                if (cursors.A.isDown) {
                        player.setVelocityX(-200);
                        player.anims.play('wiggle');
                }
                else if (cursors.D.isDown) {
                        player.setVelocityX(200);
                        player.anims.play('wiggle');
                }
                else {
                        player.setVelocityX(0);
                }

        }

        addObstacle() {
                // create new obstacles
                let obstacle = new Obstacle(this, 400);
                this.ObstacleGroup.add(obstacle);
        }

        DinoCollision() {
                // if dinosaur collide, gameover
                dinosaur.destroyed = true;
                this.sound.play('death', { volume: 0.5 });
                this.cameras.main.shake(2500, 0.0075);
                dinosaur.destroy();
                // display gameover


                // after gameover, delay 3 seconds and go to menu
                this.time.delayedCall(3000, () => {
                        this.scene.start('menuScene');
                });
        }

}