import Menu from './scenes/menu.js';
import Mapa1 from './scenes/mapa1.js';
import Settings from './scenes/settings.js';
import Credits from './scenes/credits.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Menu, Mapa1, Settings, Credits],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(config);
