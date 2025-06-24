export default class Mapa3 extends Phaser.Scene {
  constructor() {
    super("mapa3");
  }

  init() {
    this.tiempoRestante = 60;
    this.puntosRojo = 0;
    this.puntosAzul = 0;
    this.hudAlto = 24;
  }

  preload() {
    this.load.image("new-texture", "public/assets/objetos/new-texture.png");
    this.load.tilemapTiledJSON("mapa3", "public/assets/tilemap/mapa3.json");

    this.load.image("naveRoja", "public/assets/objetos/naveroja.png");
    this.load.image("naveAzul", "public/assets/objetos/naveazul.png");
    this.load.image("proyectil", "public/assets/objetos/proyectil.png");
  }

  create() {
    const { width } = this.sys.game.config;
    this.cameras.main.setBackgroundColor("#000000");

    const map = this.make.tilemap({ key: "mapa3" });
    const tileset = map.addTilesetImage("new-texture", "new-texture");

    const fondo = map.createLayer("fondo", tileset, 0, 0);
    const plataforma = map.createLayer("plataforma", tileset, 0, 0);
    plataforma.setCollisionByProperty({ collides: true });

    const objetos = map.getObjectLayer("objetos")?.objects || [];
    const player1Spawn = objetos.find(obj => obj.name === "player1");
    const player2Spawn = objetos.find(obj => obj.name === "player2");

    if (!player1Spawn || !player2Spawn) {
      console.warn("Faltan los objetos 'player1' o 'player2' en el mapa.");
      return;
    }

    this.naveRoja = this.physics.add.sprite(player1Spawn.x, player1Spawn.y, "naveRoja")
      .setCollideWorldBounds(true).setData("direccion", "right");

    this.naveAzul = this.physics.add.sprite(player2Spawn.x, player2Spawn.y, "naveAzul")
      .setCollideWorldBounds(true).setData("direccion", "left");

    this.physics.add.collider(this.naveRoja, plataforma);
    this.physics.add.collider(this.naveAzul, plataforma);

    this.proyectiles = this.physics.add.group();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclaEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.teclasWASD = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      disparar: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    // HUD
    this.hudSuperior = this.add.rectangle(width / 2, 0, width, this.hudAlto, 0x000000, 0.6)
      .setOrigin(0.5, 0).setDepth(0.9);

    this.textoTemporizador = this.add.text(width / 2, 4, this.tiempoRestante.toString(), {
      fontFamily: '"Press Start 2P"',
      fontSize: "12px",
      fill: "#ffffff"
    }).setOrigin(0.5, 0).setDepth(1);

    this.textoPuntosAzul = this.add.text(8, 4, "0", {
      fontFamily: '"Press Start 2P"',
      fontSize: "12px",
      fill: "#44ccff"
    }).setOrigin(0, 0).setDepth(1);

    this.textoPuntosRojo = this.add.text(width - 8, 4, "0", {
      fontFamily: '"Press Start 2P"',
      fontSize: "12px",
      fill: "#ff4444"
    }).setOrigin(1, 0).setDepth(1);

    this.physics.add.overlap(this.proyectiles, this.naveAzul, (proyectil) => {
      if (proyectil.disparadoPor === "rojo") {
        this.puntosRojo++;
        this.textoPuntosRojo.setText(this.puntosRojo.toString());
        this.explotarNave(this.naveAzul);
      }
      proyectil.destroy();
    });

    this.physics.add.overlap(this.proyectiles, this.naveRoja, (proyectil) => {
      if (proyectil.disparadoPor === "azul") {
        this.puntosAzul++;
        this.textoPuntosAzul.setText(this.puntosAzul.toString());
        this.explotarNave(this.naveRoja);
      }
      proyectil.destroy();
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTemporizador,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    const velocidad = 200;

    // Nave Roja (Flechas)
    this.naveRoja.setVelocity(0);
    if (this.cursors.left.isDown) this.naveRoja.setVelocityX(-velocidad).setData("direccion", "left");
    if (this.cursors.right.isDown) this.naveRoja.setVelocityX(velocidad).setData("direccion", "right");
    if (this.cursors.up.isDown) this.naveRoja.setVelocityY(-velocidad).setData("direccion", "up");
    if (this.cursors.down.isDown) this.naveRoja.setVelocityY(velocidad).setData("direccion", "down");

    if (Phaser.Input.Keyboard.JustDown(this.teclaEnter)) {
      this.dispararProyectil(this.naveRoja, this.naveRoja.getData("direccion"), "rojo");
    }

    // Nave Azul (WASD)
    this.naveAzul.setVelocity(0);
    if (this.teclasWASD.left.isDown) this.naveAzul.setVelocityX(-velocidad).setData("direccion", "left");
    if (this.teclasWASD.right.isDown) this.naveAzul.setVelocityX(velocidad).setData("direccion", "right");
    if (this.teclasWASD.up.isDown) this.naveAzul.setVelocityY(-velocidad).setData("direccion", "up");
    if (this.teclasWASD.down.isDown) this.naveAzul.setVelocityY(velocidad).setData("direccion", "down");

    if (Phaser.Input.Keyboard.JustDown(this.teclasWASD.disparar)) {
      this.dispararProyectil(this.naveAzul, this.naveAzul.getData("direccion"), "azul");
    }
  }

  dispararProyectil(nave, direccion, disparadoPor) {
    const proyectil = this.proyectiles.create(nave.x, nave.y, "proyectil");
    proyectil.disparadoPor = disparadoPor;

    const velocidad = 300;
    switch (direccion) {
      case "left": proyectil.setVelocity(-velocidad, 0); break;
      case "right": proyectil.setVelocity(velocidad, 0); break;
      case "up": proyectil.setVelocity(0, -velocidad); break;
      case "down": proyectil.setVelocity(0, velocidad); break;
    }
  }

  explotarNave(nave) {
    nave.disableBody(true, true);
    this.time.delayedCall(500, () => {
      nave.enableBody(true, Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), true, true);
    });
    this.proyectiles.clear(true, true);
  }

  actualizarTemporizador() {
    this.tiempoRestante--;
    this.textoTemporizador.setText(this.tiempoRestante.toString());

    if (this.tiempoRestante <= 0) {
      this.scene.pause();
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "00", {
        fontFamily: '"Press Start 2P"',
        fontSize: "48px",
        fill: "#ff0000"
      }).setOrigin(0.5);
    }
  }
}
