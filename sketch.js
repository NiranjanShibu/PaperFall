var plane, planeIMG, planeIMG2;
var bgIMG;
var windIMG;
var rockIMG;
var rockGroup, windGroup;
//var edges;

function preload() {
 
  planeIMG = loadImage("Airplane.png");
  planeIMG2 = loadImage("Airplane2.png");
  bgIMG = loadImage("Background3.jpg");
  windIMG = loadImage("Wind.png");
  rockIMG = loadImage("Rock2.png");
  
}

function setup() {
  createCanvas(950,530); 
  
  plane = createSprite(500, 10, 30, 30);
  plane.addImage(planeIMG2);
  plane.scale = 0.0115;
  plane.velocityY = 0.35;

  //plane.debug = true;
  plane.setCollider("rectangle", 0, 40, 260, 120);

  //edges = createEdgeSprites();

  rockGroup = new Group();
  windGroup = new Group();

}

function draw() {

  background(bgIMG);

  if(keyDown("right") || keyDown("d")){
    plane.x = plane.x + 5;
    plane.addImage(planeIMG2);
    plane.scale = 0.0115;
  }
  if(keyDown("left") || keyDown("a")){
    plane.x = plane.x - 5;
    plane.addImage(planeIMG);
    plane.scale = 0.36;
  }

  if(plane.x <= 35){
    plane.x = plane.x + 12;
  }
  if(plane.x >= 915){
    plane.x = plane.x - 12;
  }

  //plane.bounceOff(edges);

  makeWind();
  makeRock();

      for (var i = 0; i < windGroup.length; i++) {
          if (windGroup.get(i).isTouching(plane)) {

            console.log("wind touched");
            plane.y -= 30;                 
            windGroup.get(i).destroy();                
          }
        }
  //if(windGroup.isTouching(plane)){
    //console.log("wind touched");
    //plane.y -= 30; 
    //windGroup.destroyEach();
  //}

  if(rockGroup.isTouching(plane)){
    plane.y += 30; 
    rockGroup.destroyEach();
  }

  drawSprites()

}

function makeWind(){

  if(frameCount%100 === 0){
    var wind = createSprite(10, -8, 15, 15);
    wind.addImage(windIMG);
    wind.velocityY = 1;
    wind.scale = 0.013;
    wind.x = Math.round(random(20, 930));

    //wind.debug = true;

    windGroup.add(wind);
  }

}

function makeRock(){

  if(frameCount%100 === 0){
    var rock = createSprite(10, -8, 15, 15);
    rock.addImage(rockIMG);
    rock.velocityY = 1;
    rock.scale = 0.1;
    rock.x = Math.round(random(20, 930));

    rockGroup.add(rock);
  }

}