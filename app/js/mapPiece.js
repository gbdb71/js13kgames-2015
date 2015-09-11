import {Tilemap} from '../engine/tilemap';
import {Random} from '../engine/random';
import {Enemy} from './enemy';

export class MapPiece extends Tilemap{
  constructor(options){

    super(options);

    this.enemies = [];

    this.placeEnemies();

  }

  placeEnemies(){

    for (let i = 0; i < 3; i++) {

      let emptyTile = this.findEmptyTile();
      console.log(emptyTile);
      this.enemies[i] = new Enemy({
        x: (emptyTile.x * 16) + this.x,
        y: (emptyTile.y * 16) + this.y,
        width: 16,
        height: 16
      });

    };

  }

  findEmptyTile(){

    let random_x = Random.int(0, this.cols - 1);
    let random_y = Random.int(0, this.rows - 1);
    console.log(random_x * 16, random_y * 16);
    if(this.tileIsSolid(random_x * 16, random_y * 16) == false){
      return {x: random_x, y: random_y};
    } else {
      if(Random.int(0, 1) == 0){
        return {x: random_x, y: Random.int(0, 1)};
      } else {
        return {x: random_x, y: Random.int(this.rows - 2, this.rows - 1)};
      }

    }

  }

  draw(){
    super.draw();

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    };

  }

  update(){
    super.update();

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
    };

  }
}