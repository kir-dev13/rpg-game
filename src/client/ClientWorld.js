class ClientWorld {
  constructor(game, engine, levelCfg) {
    // Object.assign(this, {
    //   game,
    //   engine,
    //   levelCfg,
    //   height: levelCfg.map.length,
    //   width: levelCfg.map[0].length,
    // });
    this.game = game;
    this.engine = engine;
    this.levelCfg = levelCfg;
    this.height = levelCfg.map.length;
    this.width = levelCfg.map[0].length;
    console.log('this.height: ', this.height);
    console.log('this.width: ', this.width);
  }

  init() {
    let mapPicture = null;
    for (let j = 0; j < this.height; j += 1) {
      for (let i = 0; i < this.width; i += 1) {
        switch (true) {
          case j < 1:
            mapPicture = 'wall';
            break;
          default:
            mapPicture = 'grass';
        }
        this.engine.renderSpriteFrame({
          sprite: ['terrain', mapPicture],
          frame: 0,
          // x: 0,
          x: i * 32,
          // y: 0,
          y: j * 32,
          w: 32,
          h: 32,
        });
      }
    }
  }
}

export default ClientWorld;
