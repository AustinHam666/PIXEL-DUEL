import Menu from "./scenes/menu.js";
import Mapa from "./scenes/mapa.js";
import Settings from "./scenes/settings.js";
import Score from "./scenes/score.js";  
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
      width: 1500,
      height: 1000,
    },
  },
  scene: [Menu, Mapa, Settings, Credits, Score],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true, // Asegura que los píxeles se representen correctamente
  }
};

const game = new Phaser.Game(config);
