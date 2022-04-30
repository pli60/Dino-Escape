class Play extends Phaser.Scene {
        constructor(){
                super("playScene");
        }

        //lerp helper function
        lerp (start, end, amt){
                return (1-amt)*start+amt*end
        }

        preload() {
                // load images/tile sprites
                //this.load.image('dino', './assets/dino.png');
                this.load.image('log', './assets/log.png');
                this.load.image('tile', './assets/background.png');

                this.load.spritesheet('dino', './assets/dino.png', {frameWidth: 50, frameHeight: 102, startFrame: 0, endFrame: 7});
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

                // place tile sprite
                this.bgtile = this.add.tileSprite(0, 0, 720, 540, 'tile').setOrigin(0, 0);

                // create player model
                this.dinosaur = this.physics.add.sprite(centerX, h - 54, 'dino').setOrigin(0.5);
                this.dinosaur.destroyed = false;
                this.dinosaur.anims.play('wiggle');
                this.dinosaur.setImmovable(false);
                // this.dinosaur.setMaxVelocity(0, 400);
                this.dinosaur.setVelocityX(0);
                this.dinosaur.setBounce(0.5);
                this.dinosaur.setCollideWorldBounds(true);
                this.dinosaur.body.allowGravity = false;
                this.dinosaur.body.setSize(30, 80);
                
                // add keys
                cursors = this.input.keyboard.createCursorKeys();

                // obstacle group
                this.ObstacleGroup = this.add.group();

                //player var
                this.speed = 0;
                this.speedScale = 1;
                this.speedCap = 240;

                this.isDashing = false;

                //for spawning sp
                this.spBuffer = 1;

                // spawning obstacles
                this.time.delayedCall(2000, () => {
                        this.addObstacle();
                });
        }

        update() {
                // check for gameover
                if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        this.scene.restart();
                }
                if (!this.gameOver) {
                        this.bgtile.tilePositionY -= 4;
                }

                // player movements & dash
                if (this.dinosaur.destroyed == false) {
                        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.isDashing == false) {
                                this.speedScale = 5;
                                this.isDashing = true;
                                this.dinosaur.anims.stop();
                                this.cameras.main.shake(100, 0.002);
                                if(keyA.isDown){
                                        this.speed = -960;
                                        this.dinosaur.anims.play('Ldash');
                                }
                                else if(keyD.isDown){
                                        this.speed = 960;
                                        this.dinosaur.anims.play('Rdash');
                                }
                                
                        }
                        if (keyA.isDown) {
                                if(this.speed > -this.speedCap) {
                                        this.speed -=60;
                                }


                                // this.dinosaur.anims.play('wiggle');
                        }
                        else if (keyD.isDown) {
                                if(this.speed < this.speedCap) {
                                        this.speed += 60;
                                }

                                // this.dinosaur.anims.play('wiggle');
                        }
                        else {
                                if(this.speed > 0) {
                                        this.speed -= 20;
                                }else if(this.speed < 0) {
                                        this.speed += 20;
                                }
                        }
                        if(this.isDashing) {
                                this.speedScale -= 0.2;
                                // if(this.speedCap > 240) {
                                //         this.speedCap -= 120;
                                // }
                                
                                if(this.speed > 240) {
                                        this.speed -= 40;
                                }else if(this.speed < -240) {
                                        this.speed += 40;
                                }
                                if(this.speedScale < 1) {
                                        this.dinosaur.anims.play('wiggle');
                                        this.isDashing = false;
                                        this.speedScale = 1;
                                }
                        }
                        this.dinosaur.setVelocityX(this.speed);

                        // check for collisions
                        this.physics.world.collide(this.dinosaur, this.ObstacleGroup, this.DinoCollision, null, this);
                }
        }

        addObstacle(num = 1) {
                // create new obstacles
                
                //spawn num times
                for (let i = 0; i < num; i++) {

                        let obstacle = new Obstacle(this, 250);
                        obstacle.setScale(0.5,0.5)
                        this.ObstacleGroup.add(obstacle);
                }
                
                this.time.delayedCall(1000 * Math.floor(Math.random() * 2 + 1) * this.spBuffer, () => {
                        this.addObstacle(Math.floor(Math.random() * 3) + 1);
                });
                
                //50% chance to spawn a powerup

                if(Math.random() < 0.08){
                        this.addObstacleSpecial(Math.floor(Math.random() * 3 + 1));
                        this.spBuffer = 2;
                }
        }

        //process string to spawn obstacles
        addObstacleSpecial(num = 1){

                for (let i = 0; i < (Math.floor(Math.random() * 2 + 1)); i++) {

                        let obstacle = new Obstacle(this, 400);
                        obstacle.setScale(0.8,0.8)
                        //obstacle.body.setSize(50, 50);
                        this.ObstacleGroup.add(obstacle);
                }

                if(num > 0){
                        this.time.delayedCall(400 * Math.floor(Math.random() * 5 + 1), () => {
                                this.addObstacleSpecial(num-1);
                        });
                }else{
                        this.spBuffer = 1;
                }
        }

        

        DinoCollision() {
                // if dinosaur collide, gameover
                this.gameOver = true;
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