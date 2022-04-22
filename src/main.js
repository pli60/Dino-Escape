let config = {
        type: Phaser.CANVAS,
        width: 640,
        height: 480,
        physics:{
                default: 'arcade',
                arcade:{
                        gravity:{y: 0},
                        debug: false
                }
        },
        scene: [ Menu, Play ],
        backgroundColor: 0x9F4A54
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyLEFT, keyRIGHT, keyA, keyD, keySpace;