import Menu from "./scenes/menu.js";
import Mapa1 from "./scenes/mapa1.js";
import Settings from "./scenes/settings.js";
import Score from "./scenes/score.js";  
import Credits from "./scenes/credits.js";
import Mapa2 from "./scenes/mapa2.js";
import Mapa3 from "./scenes/mapa3.js";
import Mapa4 from "./scenes/mapa4.js";
import Mapa5 from "./scenes/mapa5.js";
import PostNivel from "./escenas/postnivel.js";
import Final from "./escenas/final.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Mapa1, Mapa2, Mapa3, Mapa4, Mapa5, PostNivel, Final],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);