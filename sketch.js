var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feeddog=createButton("Feed The Dog");
  feeddog.position(700,95);
  feeddog.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref('LastFed').on('value',function(data){
    lastFed = data.val()
  })
 
  //write code to display text lastFed time here
  fill(255,255,254);
   textSize(15); 
   if(lastFed>=12){ text("Last Feed : "+ lastFed%12 + " PM", 350,30); }
   else if(lastFed==0){ text("Last Feed : 12 AM",350,30); }
   else{ text("Last Feed : "+ lastFed + " AM", 350,30); }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var stock = foodObj.getFoodStock();
  if (stock<= 0){
    stock = stock*0;

  }
  else {
    stock = stock -1 ;

  }
  foodObj.updateFoodStock(stock);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    LastFed:hour()
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

