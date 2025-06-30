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
    this.add.text(centerX, startY, 'Creditos', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Subtítulo
    this.add.text(centerX, startY + spacing * 2, 'Desarrollado por:', {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      fill: '#cc44ff' // Cambiado a violeta del menú
    }).setOrigin(0.5);

    // Nombre del desarrollador
    this.add.text(centerX, startY + spacing * 2.8, 'AUSTIN HAM', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#cc44ff'
    }).setOrigin(0.5);

this.add.text(centerX, startY + spacing * 3.6, 'Audio por freesound.org:', {
  fontFamily: '"Press Start 2P"',
  fontSize: '10px',
  fill: '#cccccc'
}).setOrigin(0.5);

this.add.text(centerX, startY + spacing * 4.1, 'Mars army by szegvari', {
  fontFamily: '"Press Start 2P"',
  fontSize: '10px',
  fill: '#cccccc'
}).setOrigin(0.5);

this.add.text(centerX, startY + spacing * 4.4, 'https://freesound.org/s/560746/', {
  fontFamily: '"Press Start 2P"',
  fontSize: '10px',
  fill: '#cccccc'
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
