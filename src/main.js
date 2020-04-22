import 'phaser';
import ArenaScene from './scenes/ArenaScene';
import UpgradeScene from './scenes/UpgradeScene';
import BootScene from './scenes/BootScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    parent: 'content',
    width: 1280,
    height: 800,
    // background color of the game
    backgroundColor: 0x6dc4f2,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        BootScene,
        ArenaScene,
        UpgradeScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
