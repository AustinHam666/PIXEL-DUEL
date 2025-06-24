import Menu from "./scenes/menu.js";
import Mapa1 from "./scenes/mapa1.js";
import Mapa2 from "./scenes/mapa2.js";
import Mapa3 from "./scenes/mapa3.js";
import Mapa4 from "./scenes/mapa4.js";
import Mapa5 from "./scenes/mapa5.js";
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
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  scene: [Menu, Mapa1, Mapa2, Mapa3, Mapa4, Mapa5, Settings, Credits, Score],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
