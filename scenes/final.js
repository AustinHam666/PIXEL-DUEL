export default class Final extends Phaser.Scene {
  constructor() {
    super("Final");
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 40, "Juego Terminado", {
      fontFamily: '"Press Start 2P"',
      fontSize: "20px",
      fill: "#ffffff"
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, "¡Gracias por jugar!", {
      fontFamily: '"Press Start 2P"',
      fontSize: "16px",
      fill: "#ffff00"
    }).setOrigin(0.5);
  }
}
