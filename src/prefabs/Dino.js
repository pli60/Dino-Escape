class Dino extends Phaser.GameObjects.Sprite {
        constructor(scene, x, y, texture, frame, keyA, keyS, keySPACE) {
                super(scene, x, y, texture, frame);
                // add object to existing scene
                scene.add.existing(this);
                this.keyA = keyA;
                this.keyS = keyS;
                this.keySpace = keySPACE;

                this.sfx = scene.sound.add('sfx'); // add rocket sfx
        }

        update() {

        }

        reset() {

        }

}