class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', this.levelCfg.map[i][j][this.levelCfg.map[i][j].length - 1]],
          frame: 0,
          x: j * 32,
          y: i * 32,
          w: 32,
          h: 32,
        });
      }
    }
  }
  // init() {
  //   this.levelCfg.map.forEach((cfgRow, yCoord) => {
  //     cfgRow.forEach((cfgCell, xCoord) => {
  //       this.engine.renderSpriteFrame({
  //         sprite: ['terrain', cfgCell[0]],
  //         frame: 0,
  //         x: xCoord * 32,
  //         y: yCoord * 32,
  //         w: 32,
  //         h: 32,
  //       });
  //     });
  //   });
  // }
}

export default ClientWorld;
