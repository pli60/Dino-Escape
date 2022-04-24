class obstacle extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, velocity) {
                // call Phaser Physics Sprite constructor
                super(scene, game.config.height + dinoHeight, Phaser.Math.Between(dinoWidth / 2, game.config.width - dinoWidth / 2), 'obstacle');
                // set up physics sprite
                scene.add.existing(this);               // add to existing scene, displayList, updateList
                scene.physics.add.existing(this);       // add to physics system
                this.setVelocityX(velocity);            // make it go!
                this.setImmovable();
                this.tint = Math.random() * 0xFFFFFF;   // randomize tint
                this.newObstacle = true;                 // custom property to control barrier spawning
        }

        update() {


                if (this.y < -this.height) {
                        this.destroy();

                }

        }
}