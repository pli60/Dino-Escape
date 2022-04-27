class Menu extends Phaser.Scene {
        constructor(){
                super("menuScene");
        }

        preload() {
                // load audio
                this.load.audio('select', './assets/select.wav');
        }

        create() {
                // define keys
                keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }

        update() {
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        // game.settings = {
                                
                        // }
                        this.scene.start('playScene');
                }
        }

}