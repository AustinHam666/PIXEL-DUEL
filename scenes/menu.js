export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('fondo', 'assets/fondo.png'); // Ajusta la ruta si es necesario
  }

  create() {
    const { width, height } = this.sys.game.config;

    this.add.image(width / 2, height / 2, 'fondo').setDisplaySize(width, height);

    this.add.text(width / 2, height * 0.15, 'Pixel Duel', {
      fontFamily: '"Press Start 2P"',
      fontSize: '48px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    const options = ['Play', 'Settings', 'Credits', 'Exit'];
    options.forEach((option, i) => {
      const text = this.add.text(width / 2, height * 0.35 + i * 80, option, {
        fontFamily: '"Press Start 2P"',
        fontSize: '28px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();

      text.on('pointerover', () => text.setStyle({ fill: '#f0f' }));
      text.on('pointerout', () => text.setStyle({ fill: '#ffffff' }));

      text.on('pointerdown', () => {
        switch (option) {
          case 'Play':
            this.scene.start('mapa1');
            break;
          case 'Settings':
            this.scene.start('settings');
            break;
          case 'Credits':
            this.scene.start('credits');
            break;
          case 'Exit':
            alert('Gracias por jugar Pixel Duel :)');
            break;
        }
      });
    });
  }
}