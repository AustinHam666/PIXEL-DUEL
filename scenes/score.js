export default class Score extends Phaser.Scene {
  constructor() {
    super('score');
  }

  create() {
    const { width, height } = this.sys.game.config;

    // Fondo negro
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000);

    // Título
    this.add.text(width / 2, height * 0.1, 'CONTROLES', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    const controles = [
      { label: 'Jugador 1 (Rojo)', color: '#ff4444', y: height * 0.22 },
      { label: 'Mover: Flechas ← ↑ ↓ →', color: '#ffffff', y: height * 0.27 },
      { label: 'Disparar: ENTER', color: '#ffffff', y: height * 0.32 },
      { label: '', color: '#ffffff', y: height * 0.36 },
      { label: 'Jugador 2 (Azul)', color: '#44ccff', y: height * 0.41 },
      { label: 'Mover: W A S D', color: '#ffffff', y: height * 0.46 },
      { label: 'Disparar: ESPACIO', color: '#ffffff', y: height * 0.51 },
      { label: '', color: '#ffffff', y: height * 0.55 },
      { label: 'Controles de menú', color: '#cc44ff', y: height * 0.60 },
      { label: 'Seleccionar: ENTER o clic', color: '#ffffff', y: height * 0.65 },
      { label: 'Arriba/Abajo: ↑ ↓ o mouse', color: '#ffffff', y: height * 0.70 },
      { label: 'Volver: clic en "Volver"', color: '#ffffff', y: height * 0.75 }
    ];

    controles.forEach(ctrl => {
      if (ctrl.label) {
        this.add.text(width / 2, ctrl.y, ctrl.label, {
          fontFamily: '"Press Start 2P"',
          fontSize: '16px',
          fill: ctrl.color
        }).setOrigin(0.5);
      }
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