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

  // Volumen
  this.volumen = 5; // Valor inicial (0-10)
  this.volumenText = this.add.text(centerX, startY + spacing * 2, `Volumen: [${this.volumen}]`, {
    fontFamily: '"Press Start 2P"',
    fontSize: '12px',
    fill: '#ffffff'
  }).setOrigin(0.5);

  // Instrucciones para ajustar
  this.add.text(centerX, startY + spacing * 2.5, '← / → para ajustar', {
    fontFamily: '"Press Start 2P"',
    fontSize: '10px',
    fill: '#cccccc'
  }).setOrigin(0.5);

  // Control de volumen con flechas
  this.input.keyboard.on('keydown-LEFT', () => {
    if (this.volumen > 0) {
      this.volumen--;
      this.volumenText.setText(`Volumen: [${this.volumen}]`);
      this.sound.volume = this.volumen / 10;
    }
  });
  this.input.keyboard.on('keydown-RIGHT', () => {
    if (this.volumen < 10) {
      this.volumen++;
      this.volumenText.setText(`Volumen: [${this.volumen}]`);
      this.sound.volume = this.volumen / 10;
    }
  });

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
