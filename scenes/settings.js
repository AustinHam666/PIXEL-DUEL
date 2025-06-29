export default class Settings extends Phaser.Scene {
  constructor() {
    super('settings');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');

    const centerX = this.cameras.main.centerX;
    const startY = 100;
    const spacing = 60;

    // Título
    this.add.text(centerX, startY, 'Configuracion', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Opciones
    this.add.text(centerX, startY + spacing * 2, 'Volumen: [    ]', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(centerX, startY + spacing * 3, 'Pantalla: [    ]', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff'
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
