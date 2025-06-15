export default class Credits extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');

    this.add.text(400, 80, 'Credits', {
      fontFamily: '"Press Start 2P"',
      fontSize: '20px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 200, 'Desarrollado por:', {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 240, 'AUSTIN', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#f0f'
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
