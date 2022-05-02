class Play extends Phaser.Scene {
        constructor() {
                super("playScene");
        }

        //lerp helper function
        lerp(start, end, amt) {
                return (1 - amt) * start + amt * end
        }

        preload() {
                // load sfx & background music
                this.load.audio('collision', './assets/knockdown.wav');
                this.load.audio('music', './assets/dinosong2.mp3');
                this.load.audio('dash', './assets/dash.mp3');

                //this.load.image('dino', './assets/dino.png');
                this.load.image('log', './assets/log.png');
                this.load.image('tile', './assets/background.png');
                this.load.spritesheet('dino', './assets/dino.png', { frameWidth: 50, frameHeight: 102, startFrame: 0, endFrame: 7 });
        }

        create() {
                this.gameOver = false;

                // play bgm
                this.bgm = this.sound.add('music', {
                        mute: false,
                        volume: 0.3,
                        rate: 1,
                        loop: true
                });
                this.bgm.play();

                // define keys
                keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
                keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
                keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
                keyDASH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LSHIFT);

                this.physics.world.gravity.y = 0;

                //player animation
                this.anims.create({
                        key: 'wiggle',
                        frames: this.anims.generateFrameNumbers('dino', { start: 0, end: 7 }),
                        frameRate: 30,
                        repeat: -1
                });
                this.anims.create({
                        key: 'Rdash',
                        frames: this.anims.generateFrameNumbers('dino', { start: 4, end: 6 }),
                        frameRate: 30,

                });
                this.anims.create({
                        key: 'Ldash',
                        frames: this.anims.generateFrameNumbers('dino', { start: 0, end: 2 }),
                        frameRate: 30,


                });

                //place holder for text
                let menuConfig = {
                        fontFamily: 'Calibri',
                        fontSize: '28px',
                        // backgroundColor: '#F3B141',
                        color: '#00840E',
                        align: 'center',
                        padding: {
                                top: 5,
                                bottom: 5,
                        },
                        fixedWidth: 0
                }

                // place tile sprite
                this.bgtile = this.add.tileSprite(0, 0, 720, 540, 'tile').setOrigin(0, 0);
                this.bgspeed = 4;
                this.progress = 0;

                // create player model
                this.dinosaur = this.physics.add.sprite(centerX, h - 54, 'dino').setOrigin(0.5);
                this.dinosaur.destroyed = false;
                this.dinosaur.anims.play('wiggle');
                this.dinosaur.setImmovable(false);
                // this.dinosaur.setMaxVelocity(0, 400);
                this.dinosaur.setVelocityX(0);
                //this.dinosaur.setBounce(0.5);
                this.dinosaur.setCollideWorldBounds(true);
                this.dinosaur.body.allowGravity = false;
                this.dinosaur.body.setSize(30, 45);

                // add keys
                cursors = this.input.keyboard.createCursorKeys();

                // obstacle group
                this.ObstacleGroup = this.add.group();
                this.ObstacleGroup.runChildUpdate = true;
                this.ObstacleGroup.active = true;

                //player var
                this.speed = 0;
                this.speedScale = 1;
                this.speedCap = 240;
                this.isDashing = false;

                //for spawning sp
                this.spBuffer = 1;
                this.gameStart = false;
                this.score = 0;

                //place holder for tutorial
                this.Text1 = this.add.text(game.config.width / 2, game.config.height / 2, 'Controls: <A & D> to move, <SPACE> to dash', menuConfig).setOrigin(0.5);
                // menuConfig.backgroundColor = '#FFFFFF';
                menuConfig.color = '#BC1700';
                menuConfig.fontSize = '24px';
                this.Text2 = this.add.text(game.config.width / 2, game.config.height / 3 * 2, '[Press SPACE to start]', menuConfig).setOrigin(0.5);
        }

        update(time, delta) {

                if (this.gameStart == false) {
                        //if press any key
                        if (keyA.isDown || keyD.isDown || keySPACE.isDown || keyDASH.isDown) {
                                this.gameStart = true;
                                this.time.delayedCall(1500, () => {
                                        this.addObstacle();
                                });
                                this.Text1.setVisible(false);
                                this.Text2.setVisible(false);
                        }
                } else if (this.gameOver == false) {
                        this.score += delta;
                        // check for gameover
                        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
                                this.scene.restart();
                        }
                        if (!this.gameOver) {
                                this.bgtile.tilePositionY -= this.bgspeed;
                        }

                        // player movements & dash
                        if (this.dinosaur.destroyed == false) {
                                if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.isDashing == false) {
                                        this.speedScale = 5;
                                        this.isDashing = true;
                                        this.dinosaur.anims.stop();
                                        this.cameras.main.shake(100, 0.002);
                                        if (keyA.isDown) {
                                                this.speed = -960;
                                                this.dinosaur.anims.play('Ldash');
                                                this.sound.play('dash');
                                        }
                                        else if (keyD.isDown) {
                                                this.speed = 960;
                                                this.dinosaur.anims.play('Rdash');
                                                this.sound.play('dash');
                                        }

                                }
                                if (keyA.isDown) {
                                        if (this.speed > -this.speedCap) {
                                                this.speed -= 60;
                                        }

                                }
                                else if (keyD.isDown) {
                                        if (this.speed < this.speedCap) {
                                                this.speed += 60;
                                        }

                                }
                                else {
                                        if (this.speed > 0) {
                                                this.speed -= 20;
                                        } else if (this.speed < 0) {
                                                this.speed += 20;
                                        }
                                }
                                if (this.isDashing) {
                                        this.speedScale -= 0.2;
                                        // if(this.speedCap > 240) {
                                        //         this.speedCap -= 120;
                                        // }

                                        if (this.speed > 240) {
                                                this.speed -= 40;
                                        } else if (this.speed < -240) {
                                                this.speed += 40;
                                        }
                                        if (this.speedScale < 1) {
                                                this.dinosaur.anims.play('wiggle');
                                                this.isDashing = false;
                                                this.speedScale = 1;
                                        }
                                }
                                this.dinosaur.setVelocityX(this.speed);

                                // check for collisions
                                this.physics.world.collide(this.dinosaur, this.ObstacleGroup, this.DinoCollision, null, this);
                        }
                } else {
                        //lerp bgspeed to 0
                        this.bgspeed = this.lerp(4, 0, this.progress / 3000);
                        this.bgtile.tilePositionY -= this.bgspeed;
                        if (this.progress < 3000) {
                                this.progress += delta;
                        } else {
                                this.progress = 3000;
                        }
                }

                //this.ObstacleGroup.getChildren().forEach(this.stopMove, this);
        }

        addObstacle(num = 1) {
                //spawn num times
                if (!this.gameOver) {
                        for (let i = 0; i < num; i++) {
                                let obstacle = new Obstacle(this, 250);
                                obstacle.setScale(0.5, 0.5)
                                this.ObstacleGroup.add(obstacle);
                        }

                        this.time.delayedCall(1000 * Math.floor(Math.random() * 2 + 1) * this.spBuffer, () => {
                                this.addObstacle(Math.floor(Math.random() * 3) + 1);
                        });

                        //5% chance to spawn a powerup

                        if (Math.random() < 0.08) {
                                this.addObstacleSpecial(Math.floor(Math.random() * 3 + 1));
                                this.spBuffer = 2;
                        }
                }

        }

        //process string to spawn obstacles
        addObstacleSpecial(num = 1) {
                this.randnum = Math.floor(Math.random() * 3 + 1);
                for (let i = 0; i < this.randnum; i++) {

                        let obstacle = new Obstacle(this, 350, true);
                        obstacle.setScale(0.2, 0.2)
                        //obstacle.body.setSize(50, 50);
                        this.ObstacleGroup.add(obstacle);
                }

                if (num > 0) {
                        this.time.delayedCall(400 * Math.floor(Math.random() * 5 + 1), () => {
                                this.addObstacleSpecial(num - 1);
                        });
                } else {
                        this.spBuffer = 1;
                }
        }

        stopMove(target) {
                target.over = true;
        }

        //stupidity
        justUpdate(target) {
                target.update();
        }


        DinoCollision() {
                // if dinosaur collide, gameover
                this.gameOver = true;
                this.dinosaur.destroyed = true;
                this.sound.play('collision');
                this.bgm.stop();
                this.cameras.main.shake(1000, 0.0075);
                this.dinosaur.destroy();

                // display gameover
                this.Text1.setText("GAME OVER");
                this.Text1.setVisible(true);
                this.Text2.setText("Your score: " + Math.floor(this.score));
                this.Text2.setVisible(true);

                //loop through all object from group and stop them
                this.ObstacleGroup.getChildren().forEach(this.stopMove, this);

                // after gameover, delay 5 seconds and go to menu
                this.time.delayedCall(5000, () => {
                        this.gameOver = true;
                        this.scene.start('menuScene');
                });
        }
}