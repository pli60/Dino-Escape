const { Game } = require("phaser");

class Menu extends Phaser.Scene {
        constructor(){
                super("menuScene");
        }

        preload() {
                // load audio
                this.load.audio('sfx_select', './assets/select.wav');
        }

        create() {

        }

        update() {
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        game.settings = {
                                
                        }
                        this.scene.start('playScene');
                }
        }

}