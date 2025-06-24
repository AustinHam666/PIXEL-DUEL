export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('titulo', 'public/assets/objetos/titulo.png');
    this.load.image('pared', 'public/assets/objetos/pared.png');
    this.load.image('naveRoja', 'public/assets/naves/nave_roja.png');
    this.load.image('naveAzul', 'public/assets/naves/nave_azul.png');
  }

  create() {
    const { width, height } = this.sys.game.config;
    const paredHeight = 16;

    // Fondo negro
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000);

    // Bordes
    this.bordeSuperior = this.add.tileSprite(0, 0, width, paredHeight, 'pared')
      .setOrigin(0, 0)
      .setDepth(1);

    this.bordeInferior = this.add.tileSprite(0, height - paredHeight, width, paredHeight, 'pared')
      .setOrigin(0, 0)
      .setDepth(1);

    // Título
    const pixelText = this.add.text(width / 2, height * 0.18, 'PIXEL', {
      fontFamily: '"Press Start 2P"',
      fontSize: '28px',
      fill: '#ff0000'
    }).setOrigin(0.5);

    const duelText = this.add.text(width / 2, height * 0.26, 'DUEL', {
      fontFamily: '"Press Start 2P"',
      fontSize: '28px',
      fill: '#0000ff'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: [pixelText, duelText],
      alpha: { from: 1, to: 0.3 },
      duration: 300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Naves
    const naveWidth = 64;
    const naveHeight = 64;

    // Nave Roja (derecha, mitad izquierda visible)
    const naveRoja = this.add.image(width * 0.75, height * 0.5, 'naveRoja')
      .setDisplaySize(naveWidth, naveHeight)
      .setRotation(0);

    const mascaraRoja = this.make.graphics();
    mascaraRoja.fillStyle(0xffffff);
    mascaraRoja.beginPath();
    mascaraRoja.fillRect(-naveWidth / 2, -naveHeight / 2, naveWidth / 2, naveHeight);
    const maskRoja = mascaraRoja.createGeometryMask();
    naveRoja.setMask(maskRoja);

    // Nave Azul (izquierda, mitad derecha visible)
    const naveAzul = this.add.image(width * 0.25, height * 0.5, 'naveAzul')
      .setDisplaySize(naveWidth, naveHeight)
      .setRotation(Math.PI);

    const mascaraAzul = this.make.graphics();
    mascaraAzul.fillStyle(0xffffff);
    mascaraAzul.beginPath();
    mascaraAzul.fillRect(0, -naveHeight / 2, naveWidth / 2, naveHeight);
    const maskAzul = mascaraAzul.createGeometryMask();
    naveAzul.setMask(maskAzul);

    // Opciones del menú
    const options = ['Play', 'Score', 'Settings', 'Credits', 'Exit'];
    const spacing = 60;
    const startY = height * 0.38;

    options.forEach((option, i) => {
      const text = this.add.text(width / 2, startY + i * spacing, option, {
        fontFamily: '"Press Start 2P"',
        fontSize: '22px',
        fill: '#ffffff'
      }).setOrigin(0.5).setInteractive();

      text.on('pointerover', () => text.setStyle({ fill: '#f0f' }));
      text.on('pointerout', () => text.setStyle({ fill: '#ffffff' }));

      text.on('pointerdown', () => {
        switch (option) {
          case 'Play':
            this.scene.start('mapa1');
            break;
          case 'Score':
            this.scene.start('score');
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

  update() {
    this.bordeSuperior.tilePositionX -= 1.5;
    this.bordeInferior.tilePositionX += 1.5;
  }
}
