export default class Credits extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');

    const centerX = this.cameras.main.centerX;
    const startY = 100;
    const spacing = 40;

    // Título
    this.add.text(centerX, startY, 'Credits', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Subtítulo
    this.add.text(centerX, startY + spacing * 2, 'Desarrollado por:', {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Nombre del desarrollador
    this.add.text(centerX, startY + spacing * 2.8, 'AUSTIN HAM', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ff0000'
    }).setOrigin(0.5);

    // Botón "Volver"
    const backBtn = this.add.text(centerX, startY + spacing * 5, 'Volver', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    backBtn.on('pointerover', () => backBtn.setStyle({ fill: '#f0f' }));
    backBtn.on('pointerout', () => backBtn.setStyle({ fill: '#ffffff' }));
    backBtn.on('pointerdown', () => this.scene.start('menu'));
  }
}
