let config = {
        type: Phaser.AUTO,
        width: 640,
        height: 480,
        physics:{
                default: 'arcade',
                arcade:{
                        gravity:{x: 0, y: 300},
                        debug: true
                }
        },
        scene: [ Menu, Play ],
        backgroundColor: 0x9F4A54
}

let game = new Phaser.Game(config);

// define global variables
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let score;
let paddle = null;
const dinoWidth = 64;
const dinoHeight = 128;
const dinoVelocity = 200;

// reserve keys
let cursors;
let keySPACE;