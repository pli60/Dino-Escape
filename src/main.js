/*
Game Name: Dino-Runner
Group Members: Ziyi Yu, Pengfei Li, Sean Lee
Date: 5/1/2022
Description: Dino-Runner is a game where you can run and dash to run through obstacles as a dinosaur.

Creative Tilt:
-tech: 
        One interesting design of our game is that we implemented the dashing ability utilizing physic.
        The dashing is achieved through a lot of playtesting to get the right feeling, which is really fun.
        We also tried to add animation, SFX and camera shake, and tried particles tring to make it the best.

        At the same time, we did a kind of complex level spawning system.
        The system handles two kinds of obstacles with special patterns, while still use randomness to make the game endless.
        THe system is also designed to be able to go with dynamic difficulty, but we didn;t implement it yet.

-sytle:
        The design of the game is we tired to focus on game feed back,
        and while tring to achieve that we implement the dashing animation and some control feedback to the player.
        
        We also tried to make the endless runner special by giving it two different kinds of different obstacles,
        which is spawned with different logic that makes it two different phases of the game.

        What's more, there is also logic that slowly blends the two phases together as an creative way to increase the difficulty:
        At the beginning, the two phase are seperated that when Rocks are spawned, Logs will be slowed.
        When the player have built up the model for the two different differen phases,
        The game will blend the two mode that the game will become more challenging.
        This is a creative approach as we are experimenting how player learns about game mechanics.
*/

let config = {
        type: Phaser.AUTO,
        width: 720,
        height: 540,
        physics:{
                default: 'arcade',
                arcade:{
                        gravity:{x: 0, y: 300},
                        debug: false
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
//const dinoVelocity = 200;

// reserve keys
let keySPACE, keyA, keyD, keyDASH;
var cursors;
