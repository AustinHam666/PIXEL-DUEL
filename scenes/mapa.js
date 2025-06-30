export default class Mapa extends Phaser.Scene {
  constructor() {
    super("mapa");
    this.mapas = ["mapa1","mapa2","mapa3","mapa4","mapa5"]
    this.mapaActual = ""
  }

  init(data) {
    this.tiempoRestante = 1;
    this.puntosRojo = typeof data.puntosRojo === "number" ? data.puntosRojo : 0;
    this.puntosAzul = typeof data.puntosAzul === "number" ? data.puntosAzul : 0;
    this.hudAlto = 16; // Altura del HUD superior aún más compacta
    this.finished = false;

    this.mapasNoUsados = data.mapasNoUsados || this.mapas
    this.mapasUsados = data.mapasUsados || []

    // Deteriminar cuando ya recorrio todos
    if (this.mapasNoUsados.length ===  0) {
      this.scene.start("Final")
      return;
    }

    // Buscar un mapa no usado
    this.mapaActual = Phaser.Utils.Array.RemoveRandomElement(this.mapasNoUsados);
    Phaser.Utils.Array.Add(this.mapasUsados, this.mapaActual); 
  }

  preload() {
    this.load.image("new-texture", "public/assets/objetos/new-texture.png");
    this.load.tilemapTiledJSON("mapa1", `public/assets/tilemap/mapa1.json`);
    this.load.tilemapTiledJSON("mapa2", `public/assets/tilemap/mapa2.json`);
    this.load.tilemapTiledJSON("mapa3", `public/assets/tilemap/mapa3.json`);
    this.load.tilemapTiledJSON("mapa4", `public/assets/tilemap/mapa4.json`);
    this.load.tilemapTiledJSON("mapa5", `public/assets/tilemap/mapa5.json`);

    this.load.image("naveazul", "public/assets/objetos/naveazul.png");
    this.load.image("naveroja", "public/assets/objetos/naveroja.png");
    this.load.image("balasazules", "public/assets/objetos/balasazules.png");
    this.load.image("balasrojas", "public/assets/objetos/balasrojas.png");
  }

  create() {
    const { width, height } = this.sys.game.config;
    this.hudAlto = 16; // HUD más pequeño
    const hudOffsetY = this.hudAlto;

    // Mapa y plataformas desplazados hacia abajo por el HUD
    const map = this.make.tilemap({ key: this.mapaActual });
    const tileset = map.addTilesetImage("new-texture", "new-texture");
    map.createLayer("fondo", tileset, 0, hudOffsetY);
    const platformLayer = map.createLayer("plataforma", tileset, 0, hudOffsetY);
    platformLayer.setCollisionByProperty({ colision: true });

    const objetos = map.getObjectLayer("objetos").objects;
    const player1Spawn = objetos.find(obj => obj.name === "player1");
    const player2Spawn = objetos.find(obj => obj.name === "player2");

    // Spawns desplazados por el HUD
    this.spawnRojo = { x: player1Spawn.x, y: player1Spawn.y + hudOffsetY };
    this.spawnAzul = { x: player2Spawn.x, y: player2Spawn.y + hudOffsetY };

    // Naves en la posición desplazada
    this.naveRoja = this.physics.add.sprite(this.spawnRojo.x, this.spawnRojo.y, "naveroja");
    this.naveAzul = this.physics.add.sprite(this.spawnAzul.x, this.spawnAzul.y, "naveazul");

    // Escalar las naves
    this.naveRoja.setScale(2);
    this.naveAzul.setScale(2);

    this.naveRoja.setData('direccion', 'right');
    this.naveAzul.setData('direccion', 'left');

    // Proyectiles
    this.proyectiles = this.physics.add.group();

    // Balas
    this.balasAzules = this.physics.add.group(); 
    this.balasRojas = this.physics.add.group(); 

    // Collider de balas AZULES con plataformas ULTRA GOD
    this.physics.add.collider(this.balasAzules, platformLayer, (bala) => {
      bala.destroy();
    });

    // Collider de balas ROJAS con plataformas ULTRA GOD
    this.physics.add.collider(this.balasRojas, platformLayer, (bala) => {
      bala.destroy();
    });

    // Collider de balas ROJAS con nave azul
    this.physics.add.overlap(this.balasRojas, this.naveAzul, (bala, nave) => {
      console.log("Bala colisiona con nave azul");
      this.resetGame(this.naveAzul);
    });

    // Collider de balas AZULES con nave roja
    this.physics.add.overlap(this.balasAzules, this.naveRoja, (bala, nave) => {
      console.log("Bala colisiona con nave roja");
      this.resetGame(this.naveRoja);
    });

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclaEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.teclasWASD = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      disparar: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
    this.teclaJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

    this.keyProximaEscena = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    // HUD en la parte superior, fijo
    this.hudSuperior = this.add.rectangle(width / 2, 0, width, this.hudAlto, 0x000000, 0.7)
      .setOrigin(0.5, 0).setDepth(0.9).setScrollFactor(0);
    this.textoTemporizador = this.add.text(width / 2, 2, this.tiempoRestante.toString(), {
      fontFamily: '"Press Start 2P"',
      fontSize: "10px",
      fill: "#ffffff"
    }).setOrigin(0.5, 0).setDepth(1).setScrollFactor(0);
    this.textoPuntosAzul = this.add.text(4, 2, this.puntosAzul, {
      fontFamily: '"Press Start 2P"',
      fontSize: "10px",
      fill: "#44ccff"
    }).setOrigin(0, 0).setDepth(1).setScrollFactor(0);
    this.textoPuntosRojo = this.add.text(width - 4, 2, this.puntosRojo, {
      fontFamily: '"Press Start 2P"',
      fontSize: "10px",
      fill: "#ff4444"
    }).setOrigin(1, 0).setDepth(1).setScrollFactor(0);
    this.indicadorRecargaRojo = this.add.text(width - 28, 2, '', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#ff4444'
    }).setOrigin(1, 0).setDepth(2).setScrollFactor(0);
    this.indicadorRecargaAzul = this.add.text(28, 2, '', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      fill: '#44ccff'
    }).setOrigin(0, 0).setDepth(2).setScrollFactor(0);

    // Temporizador
    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTemporizador,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.naveAzul, platformLayer);
    this.physics.add.collider(this.naveRoja, platformLayer);

    this.maxBalas = 3;
    this.balasRestantesRojo = this.maxBalas;
    this.balasRestantesAzul = this.maxBalas;
    this.recargandoRojo = false;
    this.recargandoAzul = false;
  }

  update() {
    const velocidad = 200;
  
    // EJECUTAR SIEMPRE Y CUANDO NO HAYA TERMINADO EL NIVEL
    if (!this.finished) {
      // Movimiento ROJA
      this.naveRoja.setVelocity(0);
      if (this.cursors.left.isDown) {
        this.naveRoja.setVelocityX(-velocidad);
        this.naveRoja.setData('direccion', 'left');
        this.naveRoja.setAngle(180);
      }
      if (this.cursors.right.isDown) {
        this.naveRoja.setVelocityX(velocidad);
        this.naveRoja.setData('direccion', 'right');
        this.naveRoja.setAngle(0);
      }
      if (this.cursors.up.isDown) {
        this.naveRoja.setVelocityY(-velocidad);
        this.naveRoja.setData('direccion', 'up');
        this.naveRoja.setAngle(-90);
      }
      if (this.cursors.down.isDown) {
        this.naveRoja.setVelocityY(velocidad);
        this.naveRoja.setData('direccion', 'down');
        this.naveRoja.setAngle(90);
      }

      if (Phaser.Input.Keyboard.JustDown(this.teclaEnter)) {
        this.dispararProyectil(this.naveRoja);
      }

      if (Phaser.Input.Keyboard.JustDown(this.keyProximaEscena)) {
        this.proximaEscena()
      }

      // Movimiento AZUL
      this.naveAzul.setVelocity(0);
      if (this.teclasWASD.left.isDown) {
        this.naveAzul.setVelocityX(-velocidad);
        this.naveAzul.setData('direccion', 'left');
        this.naveAzul.setAngle(180);
      }
      if (this.teclasWASD.right.isDown) {
        this.naveAzul.setVelocityX(velocidad);
        this.naveAzul.setData('direccion', 'right');
        this.naveAzul.setAngle(0);
      }
      if (this.teclasWASD.up.isDown) {
        this.naveAzul.setVelocityY(-velocidad);
        this.naveAzul.setData('direccion', 'up');
        this.naveAzul.setAngle(-90);
      }
      if (this.teclasWASD.down.isDown) {
        this.naveAzul.setVelocityY(velocidad);
        this.naveAzul.setData('direccion', 'down');
        this.naveAzul.setAngle(90);
      }

      if (Phaser.Input.Keyboard.JustDown(this.teclasWASD.disparar)) {
        this.dispararProyectil(this.naveAzul);
      }
    }

    if (this.finished && Phaser.Input.Keyboard.JustDown(this.teclaJ)) {
      console.log("Tecla J presionada, proxima escena");
      this.proximaEscena();
      this.finished = false;
    }
  }
  resetGame(nave) {
    this.balasAzules.clear(true, true);
    this.balasRojas.clear(true, true);
    this.naveRoja.setPosition(this.spawnRojo.x, this.spawnRojo.y);
    this.naveAzul.setPosition(this.spawnAzul.x, this.spawnAzul.y);

    if (nave === this.naveAzul) {
      this.puntosRojo++;
      this.textoPuntosRojo.setText(this.puntosRojo.toString());
    } else {
      this.puntosAzul++;
      this.textoPuntosAzul.setText(this.puntosAzul.toString());
    }

    this.balasRestantesRojo = this.maxBalas;
    this.balasRestantesAzul = this.maxBalas;
    this.recargandoRojo = false;
    this.recargandoAzul = false;
    this.indicadorRecargaRojo.setText('');
    this.indicadorRecargaAzul.setText('');
  }

  dispararProyectil(nave) {
    const direccion = nave.getData('direccion');
    let puedeDisparar = true;
    let jugador = '';

    if (nave === this.naveRoja) {
      jugador = 'rojo';
      if (this.balasRestantesRojo <= 0 || this.recargandoRojo) puedeDisparar = false;
    } else {
      jugador = 'azul';
      if (this.balasRestantesAzul <= 0 || this.recargandoAzul) puedeDisparar = false;
    }

    if (!puedeDisparar) return;

    if (jugador === 'rojo') {
      this.bala = this.balasRojas.create(nave.x, nave.y, 'balasrojas');
      this.balasRestantesRojo--;
      if (this.balasRestantesRojo === 0) {
        this.recargandoRojo = true;
        this.indicadorRecargaRojo.setText('R');
        this.time.delayedCall(1000, () => {
          this.balasRestantesRojo = this.maxBalas;
          this.recargandoRojo = false;
          this.indicadorRecargaRojo.setText('');
        });
      }
    } else {
      this.bala = this.balasAzules.create(nave.x, nave.y, 'balasazules');
      this.balasRestantesAzul--;
      if (this.balasRestantesAzul === 0) {
        this.recargandoAzul = true;
        this.indicadorRecargaAzul.setText('R');
        this.time.delayedCall(1000, () => {
          this.balasRestantesAzul = this.maxBalas;
          this.recargandoAzul = false;
          this.indicadorRecargaAzul.setText('');
        });
      }
    }

    this.bala.setScale(1.1); // Mucho más grandes
    const velocidad = 400;

    switch (direccion) {
      case 'left':
        this.bala.setVelocity(-velocidad, 0);
        break;
      case 'right':
        this.bala.setVelocity(velocidad, 0);
        break;
      case 'up':
        this.bala.setVelocity(0, -velocidad);
        break;
      case 'down':
        this.bala.setVelocity(0, velocidad);
        break;
      default:
        this.bala.setVelocity(velocidad, 0);
    }
  }

  actualizarTemporizador() {
    if (this.finished) return;
    this.tiempoRestante--;
    this.textoTemporizador.setText(this.tiempoRestante.toString());

    if (this.tiempoRestante <= 0) {
      this.finished = true;
      console.log(this.finished);
      this.pausaJuego();
    }
  }

  pausaJuego() {
    this.finished = true;

    this.naveAzul.setVelocity(0);
    this.naveRoja.setVelocity(0);
    this.physics.pause();

    // Ocultar los puntajes pequeños del HUD, el temporizador y los indicadores de recarga
    this.textoPuntosAzul.setVisible(false);
    this.textoPuntosRojo.setVisible(false);
    this.textoTemporizador.setVisible(false);
    this.indicadorRecargaRojo.setVisible(false);
    this.indicadorRecargaAzul.setVisible(false);

    // Fondo negro
    this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      1
    ).setOrigin(0.5);

    // Texto arriba centrado
    this.add.text(this.cameras.main.centerX, this.cameras.main.height * 0.18, "PRESS J TO CONTINUE", {
      fontFamily: '"Press Start 2P"',
      fontSize: "20px",
      fill: "#ff0000"
    }).setOrigin(0.5).setDepth(1);

    // Puntaje azul a la izquierda
    this.add.text(this.cameras.main.centerX - 120, this.cameras.main.centerY, this.puntosAzul.toString(), {
      fontFamily: '"Press Start 2P"',
      fontSize: "32px",
      fill: "#44ccff"
    }).setOrigin(0.5).setDepth(1);

    // Puntaje rojo a la derecha
    this.add.text(this.cameras.main.centerX + 120, this.cameras.main.centerY, this.puntosRojo.toString(), {
      fontFamily: '"Press Start 2P"',
      fontSize: "32px",
      fill: "#ff4444"
    }).setOrigin(0.5).setDepth(1);

    // Guion en el centro
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "-", {
      fontFamily: '"Press Start 2P"',
      fontSize: "32px",
      fill: "#ffffff"
    }).setOrigin(0.5).setDepth(1);
  }

  proximaEscena() {
    // Volver a mostrar los puntajes pequeños, el temporizador y los indicadores de recarga al reanudar el juego
    this.textoPuntosAzul.setVisible(true);
    this.textoPuntosRojo.setVisible(true);
    this.textoTemporizador.setVisible(true);
    this.indicadorRecargaRojo.setVisible(true);
    this.indicadorRecargaAzul.setVisible(true);
    console.log("Proxima escena")
    if (this.mapasUsados.length === 5) {
      console.log("Todos los mapas usados, finalizando juego");
      this.reiniciarJuego();
    }
    this.scene.start("mapa", {
      mapasNoUsados : this.mapasNoUsados,
      mapasUsados : this.mapasUsados,
      puntosRojo : this.puntosRojo,
      puntosAzul : this.puntosAzul,
    })
  }
}