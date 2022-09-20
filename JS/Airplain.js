/// Variables 
var players = {
    left: 450,
    top:500,
}
var enemies = [
    {left:250,top:50},
    {left:350,top:50},
    {left:450,top:100},
    {left:550,top:50},
    {left:650,top:50}
]
var missiles = []

var missile_Possition = {
    left: players.left,
    top: players.top,
}
/// Draw Functions 
function drawPlayer (){
    content = "<div class='player' style = 'left:"+players.left+";top:"+players.top+"'></div>";
    document.getElementById("players").innerHTML = content;

}

function drawEnemy(){
    content="";
    for(var idx = 0;idx<enemies.length;idx++){
        content += "<div class='enemy' style = 'left:"+enemies[idx].left+";top:"+enemies[idx].top+"'></div>";
    }
    document.getElementById("enemies").innerHTML = content;
}

function drawMissiles(){
    content = "";
    for(var idx = 0;idx<missiles.length;idx++){
        content += "<div class='missile' style = 'left:"+missiles[idx].left+";top:"+missiles[idx].top+"'></div>";
        document.getElementById("missiles").innerHTML = content;
        missile_Possition.left = missiles[idx].left;
        missile_Possition.top = missiles[idx].top;
        if(missileTouch()){

        }
    }   
}

/// Action Functions
function moveEnemies(){
    if(enemies[1].top >= 500){
        enemies[0].top = 50;
        enemies[2].top = 100;
        enemies[1].top = 50;
        enemies[3].top = 50;
        enemies[4].top = 50;
    }else{
        // for(var idx = 0;idx<enemies.length;idx++){
        //     enemies[idx].top += 10;
        // }
    }
}

function moveMissiles (){
    for(var idx = 0;idx<missiles.length;idx++){
        missiles[idx].top -= 20;
    }
}

function missileTouch (){
    for(var idx = 0;idx<enemies.length;idx++){
        // var emenyR = [
        //     enemies[idx].top,
        //     enemies[idx].left
        // ];
        // d = [enemies[idx].left,enemies[idx].top,missile_Possition.left,missile_Possition.top];
        if(missile_Possition.top - enemies[idx].top <= 10 && missile_Possition.left - enemies[idx].left <= 10){
            destroyEnemy(idx);
            destroyMissle(idx);
        }
    }
}
function destroyEnemy(enemyIdx){
    // content = "<div class='enemies' style = background-image: none;'></div>"
    // document.getElementById("enemies").innerHTML = content;
    console.log("Enemy number",enemyIdx,"destroyed")
}
function destroyMissle(missleIdx){
    for(var idx = 0;idx<missiles.length;idx++){
        missiles[idx].top = 2000;
        missiles[idx].left = 2000;
    }
}
/// On key Functions
document.onkeydown = function(e){
    console.log(e);
    if(e.keyCode == 37 && players.left > 200 ){ // left
    players.left -= 10;
    }
    if(e.keyCode == 39 && players.left < 800){ // rigth
    players.left += 10;
    }
    if(e.keyCode == 38 && players.top > 350){ // down
    players.top -= 10;
    }
    if(e.keyCode == 40 && players.top < 530){  //up
    players.top += 10;
    }
    if(e.keyCode == 32 ){   //fire
    missiles.push({left:(players.left +30 ) ,top:(players.top - 8) })
    drawMissiles()
    }
    drawPlayer();
}
/// Game Loop
function gameLoop(){
    drawPlayer();
    moveEnemies();
    drawEnemy();
    moveMissiles();
    drawMissiles();
    setTimeout(gameLoop,200);
}
gameLoop();
