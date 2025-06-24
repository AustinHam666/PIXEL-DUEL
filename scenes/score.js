export default class Score extends Phaser.Scene {
  constructor() {
    super('score');
  }

  init(data) {
    // Recibimos los puntajes desde otra escena (si hay)
    this.scores = data.scores || [];
  }

  create() {
    const { width, height } = this.sys.game.config;

    // Fondo negro
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000);

    // Título
    this.add.text(width / 2, height * 0.1, 'MEJORES PUNTAJES', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Asegurar al menos 5 entradas con "AAA" y 0 si faltan
    const defaultEntries = Array.from({ length: 5 }, (_, i) => ({ name: 'AAA', score: 0 }));
    const displayScores = [...this.scores, ...defaultEntries].slice(0, 5);

    // Mostrar tabla
    const startY = height * 0.25;
    const spacing = 50;

    displayScores.forEach((entry, i) => {
      const nameText = this.add.text(width * 0.35, startY + i * spacing, entry.name, {
        fontFamily: '"Press Start 2P"',
        fontSize: '18px',
        fill: '#ffcc00'
      }).setOrigin(0.5);

      const scoreText = this.add.text(width * 0.65, startY + i * spacing, entry.score.toString(), {
        fontFamily: '"Press Start 2P"',
        fontSize: '18px',
        fill: '#ffffff'
      }).setOrigin(0.5);
    });

    // Instrucción para volver
    const backText = this.add.text(width / 2, height * 0.9, 'Volver', {
      fontFamily: '"Press Start 2P"',
      fontSize: '14px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('menu');
    });
  }
}
