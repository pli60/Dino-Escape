class Menu extends Phaser.Scene {
        constructor(){
                super("menuScene");
        }

        preload() {
                // load audio
                this.load.audio('select', './assets/select.mp3');
        }

        create() {
                // define keys
                keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }

        update() {
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        // game.settings = {
                                
                        // }
                        this.sound.play('select');
                        this.scene.start('playScene');
                }
        }

}