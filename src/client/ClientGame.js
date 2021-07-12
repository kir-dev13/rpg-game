import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../config/sprites';

import levelCfg from '../config/world.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, { cfg });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', () => {
        this.map.init();
      });
      this.engine.start();
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      // console.log('Game INIT');
      // console.log(levelCfg.map.length);
      // console.log(ClientGame.map.levelCfg);
      // console.log(ClientGame.game.map);
    }
  }
}
export default ClientGame;
