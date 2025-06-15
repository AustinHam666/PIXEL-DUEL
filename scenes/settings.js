export default class Settings extends Phaser.Scene {
  constructor() {
    super('settings');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');

    this.add.text(400, 80, 'Settings', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 200, 'Volumen: [    ]', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 260, 'Pantalla: [    ]', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    const backBtn = this.add.text(400, 400, 'Volver', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    backBtn.on('pointerover', () => backBtn.setStyle({ fill: '#f0f' }));
    backBtn.on('pointerout', () => backBtn.setStyle({ fill: '#ffffff' }));
    backBtn.on('pointerdown', () => this.scene.start('menu'));
  }
}
