import {Game} from '../engine/game';
import {Vector2} from '../engine/vector2';
import {Tilemap} from '../engine/tilemap';
import {MAPS} from './maps';

//generate a random map; used only for debug
function generateMap(){

  let row = 24;
  let col = 15;
  let map = [];

  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {

      let index = row * x + y;
      if(Math.random() * 2 > 1){
         map[index] = 1;
      } else {
        map[index] = 0;
      }
    }
  };

  return map;
}

class NewGame extends Game{
  constructor(options){
    super(options);

    this.map = new Tilemap({
      map: MAPS[0],
      width: 240,
      height: 384,
      rows: 24,
      cols: 15,
      x: 0,
      y: 0
    });

    this.map2 = new Tilemap({
      map: MAPS[1],
      width: 240,
      height: 384,
      rows: 24,
      cols: 15,
      x: 0,
      y: 384
    });


  }

  draw(){

    super.draw();

    this.map.draw();
    this.map2.draw();

  }

  update(){
    super.update();

  }

}

const game = new NewGame({
  //Hack so the RegPack compiler can work
  //Thanks to @Siorki
  //https://twitter.com/Siorki/status/637386161544163329
  name: '-',
  screen: {
    size: new Vector2(240, 384),
    center: true,
    background: '#ccc'
  },
  containerID: 'container'
});