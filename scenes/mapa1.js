export default class Mapa1 extends Phaser.Scene {
  constructor() {
    super("mapa1");
  }

  init() {
    this.totalItems = 0;
  }

  preload() {
    this.load.image("new-texture", "public/assets/objetos/new-texture.png");
    //this.load.image("environment", "public/assets/objetos/environment.png");
    this.load.tilemapTiledJSON("mapa1", "public/assets/tilemap/mapa1.json");
    // this.load.image("naveazul", "public/assets/objetos/naveazul.png");
    // this.load.image("pared", "public/assets/objetos/pared.png");
    // this.load.image("fondo", "public/assets/objetos/fondo.png");
    // this.load.image("naveroja", "public/assets/objetos/naveroja.png");
  }

  create() {
    // Crea el fondo
    const { width, height } = this.sys.game.config;

    // Crea el tilemap
    const map = this.make.tilemap({ key: "mapa1" });
    const tileset = map.addTilesetImage("new-texture", "new-texture");

    const fondo = map.createLayer("fondo", tileset, 0, 0);
    const plataforma = map.createLayer("plataforma", tileset, 0, 0);

    // primero cargar el score

    // segundo cargar el personaje

    // para disparar en direccion donde mira el jugador
    // jugador x - y velocityXY
    // crear un rectagulo que se mueva en la direccion del jugador

    this.add.rectangle(300, 100, 80, 10, 0x00f000, 0.5);

    // //plataforma.setCollisionByProperty({ collides: true }); // Si marcaste tiles como colisionables en Tiled

    // // Busca los objetos de los jugadores en la capa de objetos
    // const objetos = map.getObjectLayer("objetos").objects;
    // const player1Spawn = objetos.find((obj) => obj.name === "player1");
    // const player2Spawn = objetos.find((obj) => obj.name === "player2");

    // // Crea las naves en las posiciones de los objetos
    // this.naveRoja = this.physics.add.sprite(
    //   player1Spawn.x,
    //   player1Spawn.y,
    //   "naveRoja"
    // );
    // this.naveAzul = this.physics.add.sprite(
    //   player2Spawn.x,
    //   player2Spawn.y,
    //   "naveAzul"
    // );

    // // Haz que las naves colisionen con las plataformas
    // this.physics.add.collider(this.naveRoja, plataformas);
    // this.physics.add.collider(this.naveAzul, plataformas);
  }
}
