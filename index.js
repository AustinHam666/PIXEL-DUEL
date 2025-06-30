import Menu from "./scenes/menu.js";
import Mapa from "./scenes/mapa.js";
import Settings from "./scenes/settings.js";
import Score from "./scenes/score.js";  
import Credits from "./scenes/credits.js";

const HUD_ALTO = 16; 

const config = {
  type: Phaser.AUTO,
  width: 60 * 16,
  height: (30 * 16) + HUD_ALTO, // Suma el HUD a la altura del mapa
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 400,
      height: 225 + HUD_ALTO, // Ajusta la altura mínima para incluir el HUD
    },
    max: {
      width: window.innerWidth,
      height: window.innerHeight + HUD_ALTO, // Ajusta la altura máxima para incluir el HUD
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