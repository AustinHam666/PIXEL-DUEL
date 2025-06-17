import Menu from "./scenes/menu.js";
import Mapa1 from "./scenes/mapa1.js";
import Settings from "./scenes/settings.js";
import Credits from "./scenes/credits.js";

const config = {
  type: Phaser.AUTO,
  width: 60 * 16,
  height: 30 * 16,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 400,
      height: 225, // Mantiene la relación 16:9 (400 ÷ 16 × 9 = 225)
    },
    max: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  scene: [Mapa1, Settings, Credits],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
