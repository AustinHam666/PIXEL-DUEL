export default class Mapa1 extends Phaser.Scene {
  constructor() {
    super('mapa1');
  }

 init() {
        this.totalItems = 0;
    }

  preload() {
    this.load.image('tilemap', 'public/assets/objetos/texture.png');
    this.load.image('naveazul', 'public/assets/objetos/naveazul.png');
    this.load.image('naveroja', 'public/assets/objetos/naveroja.png');
    this.load.tilemapTiledJSON('mapa1', 'public/assets/tilemap/mapateller1.json');
  }

create() {
  // Crea el fondo
  const { width, height } = this.sys.game.config;
  this.add.image(width/2, height/2, 'fondo').setDisplaySize(width, height);

  // Crea el tilemap
  const map = this.make.tilemap({ key: 'mapa1' });
  const tileset = map.addTilesetImage('pared', 'tilemap'); 
  const tileset2 = map.addTilesetImage('fondo', 'tilemap');

  const plataformas = map.createLayer('plataforma', tileset, 0, 0);
  plataformas.setCollisionByProperty({ collides: true }); // Si marcaste tiles como colisionables en Tiled

  // Busca los objetos de los jugadores en la capa de objetos
  const objetos = map.getObjectLayer('objetos').objects;
  const player1Spawn = objetos.find(obj => obj.name === 'player1');
  const player2Spawn = objetos.find(obj => obj.name === 'player2');

  // Crea las naves en las posiciones de los objetos
  this.naveRoja = this.physics.add.sprite(player1Spawn.x, player1Spawn.y, 'naveRoja');
  this.naveAzul = this.physics.add.sprite(player2Spawn.x, player2Spawn.y, 'naveAzul');

  // Haz que las naves colisionen con las plataformas
  this.physics.add.collider(this.naveRoja, plataformas);
  this.physics.add.collider(this.naveAzul, plataformas);
  }
  }