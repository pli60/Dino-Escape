class Obstacle extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, velocity) {
                // call Phaser Physics Sprite constructor
                super(scene, 30 + 100 * (Math.floor(Math.random() * 6 + 1)), -640, 'log');
                // set up physics sprite Phaser.Math.Between(-600, 0)
                scene.add.existing(this);               // add to existing scene, displayList, updateList
                scene.physics.add.existing(this);       // add to physics system
                this.setVelocityY(velocity);            // make it go!
                this.setImmovable();
                this.tint = Math.random() * 0xFFFFFF;   // randomize tint
                this.newObstacle = true;                 // custom property to control barrier spawning
                this.body.setSize(this.width - 30, this.height -10);

        }

        update() {
                // add new log when previous log hits centerY
                if (this.newObstacle && this.y < centerY) {
                        this.newObstacle = false;
                        this.scene.addObstacle(this.parent, this.velocity);
                }

                // destroy log if it reaches the bottom of the screen
                if (this.y < -this.height) {
                        this.destroy();
                }
        }
}