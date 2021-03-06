import {Core} from './core';
const SAT = require('./sat/SAT.js');

export class Tilemap{

  constructor(options){

    this.map = options.map;
    this.tilesize = 16;
    this.width = options.width;
    this.height = options.height;
    this.rows = options.rows;
    this.cols = options.cols;
    this.x = options.x;
    this.y = options.y;

    this.mapImage = new Image();
    this.mapImage.src = options.src;

  }

  draw(){

    Core.ctx.drawImage(this.mapImage, this.x - Core.camera.x, this.y - Core.camera.y);

  }

  tileIsSolid(x, y){

    x = (x) / this.tilesize >> 0;
    y = (y) / this.tilesize >> 0;

    return this.map[this.cols * y + x] > 0;

  }

    checkTileCollision(w, h, object, separate){

      if(this.tileIsSolid((w * 16) - this.x, (h * 16) - this.y) && (object.colliding == false || separate == true)){

        object.shape.pos.x = object.nextPosition.x;
        object.shape.pos.y = object.nextPosition.y;

        Tilemap.tileShape.pos.x = w * 16;
        Tilemap.tileShape.pos.y = h * 16;

        object.colliding = SAT.testPolygonPolygon(object.shape, Tilemap.tileShape, Tilemap.collisionResponse);

        if(separate){
          object.nextPosition.x -= Tilemap.collisionResponse.overlapV.x;
          object.nextPosition.y -= Tilemap.collisionResponse.overlapV.y;
        }

        Tilemap.collisionResponse.clear();

      }
      //debug stuff
      /*Core.ctx.fillStyle = 'rgba(15,200,15, 0.2)';
      Core.ctx.fillRect((w * 16) - Core.camera.x, (h * 16) - Core.camera.y, 16, 16);

      Core.ctx.fillStyle = 'rgba(122,255,255, 0.2)';
      Core.ctx.fillRect(object.nextPosition.x - Core.camera.x, object.nextPosition.y - Core.camera.y, object.width, object.height);*/

  }

  checkCollision(object, separate = true){

    let minX = Math.floor(((object.nextPosition.x)) / 16);
    let maxX = Math.floor(((object.nextPosition.x) + 16) / 16);
    let minY = Math.floor(((object.nextPosition.y)) / 16);
    let maxY = Math.floor(((object.nextPosition.y) + 16) / 16);

    if(object.velocity.y <= 0){

      for (let h = maxY; h >= minY; h--) {
        for (let w = maxX; w >= minX; w--) {

          this.checkTileCollision(w, h, object, separate);

        }
      }

    } else if(object.velocity.y >= 0){

      for (let h = minY; h <= maxY; h++) {
        for (let w = minX; w <= maxX; w++) {

          this.checkTileCollision(w, h, object, separate);

        }
      }

    }

    if(separate){
      object.x = object.nextPosition.x;
      object.y = object.nextPosition.y;
    }

    return object.colliding;

  }

  update(){


  }

}

Tilemap.tileShape = new SAT.Box(new SAT.Vector(0, 0), 16, 16).toPolygon();
Tilemap.collisionResponse = new SAT.Response();