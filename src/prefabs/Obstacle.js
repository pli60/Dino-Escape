class Obstacle extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, velocity, sp = false) {
                // call Phaser Physics Sprite constructor
                super(scene, 20 + 102 * (Math.floor(Math.random() * 6 + 1)), -120, 'log');
                // set up physics sprite Phaser.Math.Between(-600, 0)
                scene.add.existing(this);               // add to existing scene, displayList, updateList
                scene.physics.add.existing(this); // add to physics system
                this.sp = sp;
                this.over = false;
                this.scene = scene;      // scene reference
                this.velocity = velocity;
                this.setVelocityY(velocity); 
                this.setImmovable();
                this.tint = Math.random() * 0xFFFFFF;   // randomize tint
                this.newObstacle = true;                 // custom property to control barrier spawning
                this.body.setSize(this.width - 30, this.height -10);

        }

        update() {
                // add new log when previous log hits centerY
                // if (this.newObstacle && this.y < centerY) {
                //         this.newObstacle = false;
                //         this.scene.addObstacle(this.parent, this.velocity);
                // }

                //stop moving if gameover
                //this.body.velocity.y = 0;
                if(this.over == true){
                        this.body.velocity.y = this.scene.lerp(this.velocity, 0, this.scene.progress/3000);
                        // if(this.body.velocity.y > 0){
                        //         this.body.velocity.y -= 5;
                        // }else{
                        //         this.body.velocity.y = 0;
                        // }
                }
                // destroy log if it reaches the bottom of the screen
                if (this.y > this.height + this.scene.game.config.height) {
                        this.destroy();
                }
        }

        stop(){

                //this.body.velocity.y = 0;
                this.over = true;

        }
}