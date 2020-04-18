import 'phaser';
import ArenaScene from './scenes/ArenaScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 800,
    height: 600,
    // background color of the game
    backgroundColor: 0x6dc4f2,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        ArenaScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
