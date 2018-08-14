var context;
var canvas;


document.addEventListener('DOMContentLoaded', function(){
	canvas=document.getElementById("canvas");
    context= canvas.getContext("2d");
	
	
	
});


var user;
var shape=new Object();
var ghost1=new Object();
var ghost2=new Object();
var ghost3=new Object();
var character=new Object();
var board;
var board2;
var score;
var pac_color;
var start_time;
var time_elapsed;    
var interval;
var ghostInterval;
var board3;
var charac=true;
var life=3;
var lastDirection=4;//right
var newDirection=4;
var actionSide=4;
var timeSel;
var ghostSel;
var audio;
var wallsBoard;
var bfsBoard;
var end;
var start;
var startinterval
var timeStart;
var startflag1;
var startflag2;
var message;
var aboutTime; 
var aboutEndTime;
var addAbout;
var about2=0;
var timeEnd;
var endInterval;
var users = ["a"];
var passwords = ["a"];

function Start() {
	
	//init
	end=false;
	addAbout=0;
	message="";
	charac=true;
	audio = new Audio('pacman.mp3');
	audio.play();
	eat=false;
	about2=0;
	var e = document.getElementById('h1');
	e.style.opacity="1";
	
	var e = document.getElementById('h2');
	e.style.opacity="1";
	

	var e = document.getElementById('h3');
	e.style.opacity="1";
	
	var e2 = document.getElementById('humb3');
	e2.style.opacity=1;
	var e2 = document.getElementById('chip2');
	e2.style.opacity=1;
	
	
	life=3;
	lastDirection=4;//right
	newDirection=4;
	actionSide=4;

	
	
	///get player choose
	var numBalls=document.getElementById("rangevalue").value;
	

	
	var time=document.getElementById("time");
	timeSel = time.selectedIndex;
	if(timeSel==0)
		timeSel=60;
	if(timeSel==1)
		timeSel=90;
	if(timeSel==2)
		timeSel=120;
	if(timeSel==3)
		timeSel=150;
	
	lblScore.value = 0;
	lblTime.value = 0+"/"+timeSel;
	
	var ghost=document.getElementById("numGhost");
	ghostSel = ghost.selectedIndex;
	///
	
	
	
	board = new Array();
	score = 0;
	pac_color="yellow";

	var food60=parseInt(numBalls*0.6);//5
	var food30=parseInt(numBalls*0.3);//15
	var food10=numBalls-food60-food30;//25
	
	
	

	

	for (var i = 0; i < 17; i++) {//init
		board[i] = new Array();
	}
	


	board[1][1]=4;
	board[2][1]=4;
	board[4][1]=4;
	board[5][1]=4;
	board[6][1]=4;
	board[8][0]=4;
	board[8][1]=4;
	board[8][2]=4;
	board[8][3]=4;
	board[10][1]=4;
	board[11][1]=4;
	board[12][1]=4;
	board[14][1]=4;
	board[15][1]=4;
	board[1][3]=4;
	board[2][3]=4;
	board[3][3]=4;
	board[4][3]=4;
	board[5][3]=4;
	board[6][3]=4;
	board[6][4]=4;
	board[6][5]=4;
	board[5][5]=4;
	board[4][5]=4;
	board[3][5]=4;
	board[2][5]=4;
	board[0][5]=4;
	board[10][3]=4;
	board[11][3]=4;
	board[12][3]=4;
	board[13][3]=4;
	board[14][3]=4;
	board[15][3]=4;
	board[10][4]=4;
	board[10][5]=4;
	board[11][5]=4;
	board[12][5]=4;
	board[13][5]=4;
	board[14][5]=4;
	board[16][5]=4;
	board[8][5]=4;
	board[8][6]=4;
	board[8][7]=4;
	board[7][7]=4;
	board[6][7]=4;
	board[9][7]=4;
	board[10][7]=4;
	board[15][7]=4;
	board[14][7]=4;
	board[13][7]=4;
	board[12][7]=4;
	board[1][7]=4;
	board[2][7]=4;
	board[3][7]=4;
	board[4][7]=4;
	board[1][9]=4;
	board[2][9]=4;
	board[2][10]=4;
	board[15][9]=4;
	board[14][9]=4;
	board[14][10]=4;
	board[12][9]=4;
	board[11][9]=4;
	board[10][9]=4;
	board[12][10]=4;
	board[4][9]=4;
	board[5][9]=4;
	board[6][9]=4;
	board[4][10]=4;
	board[8][9]=4;
	board[8][10]=4;
	
	
	wallsBoard=copy(board);
	board2=copy(board);
	board3=copy(board);
	character.i=16;
	character.j=10;
	board3[16][10]=8;//character
	
	
	if(ghostSel==0||ghostSel==1||ghostSel==2)//ghosts
	{
		board2[0][0]=5;//g1
		ghost1.i=0;
		ghost1.j=0;
		if(ghostSel==1||ghostSel==2)
		{
			board2[16][0]=6;//g2
			ghost2.i=16;
			ghost2.j=0;
			if(ghostSel==2)
			{
				board2[0][10]=7;//g3
				ghost3.i=0;
				ghost3.j=10;
			}
		}
		
	}

	var flag=false;
	while(flag==false)//pacman
	{
		var i=Math.floor(Math.random() * 17) + 0 ; 
		var j=Math.floor(Math.random() * 11) + 0 ; 
		if(board[i][j]!=4&&board2[i][j]==undefined&&(i!=16&&j!=16))
		{
				
			board[i][j]=2;
			flag=true;
			shape.i=i;
			shape.j=j;
		}
			
	}
	
	
	while(food60>0)//ball5
	{
		var i=Math.floor(Math.random() * 17) + 0 ; 
		var j=Math.floor(Math.random() * 11) + 0 ; 
		
		
		if(board[i][j]==undefined)
		{
			board[i][j] = 60;
			food60=food60-1;
		}
	}
	
	

	while(food30>0)//ball15
	{
		var i=Math.floor(Math.random() * 17) + 0 ; 
		var j=Math.floor(Math.random() * 11) + 0 ; 
		
		
			if(board[i][j]==undefined)
		{
			board[i][j] = 30;
			food30=food30-1;
		}
	}
	

	while(food10>0)//ball25
	{
		var i=Math.floor(Math.random() * 17) + 0 ; 
		var j=Math.floor(Math.random() * 11) + 0 ; 
		
	
			if(board[i][j]==undefined)
		{
			board[i][j] = 10;
			food10=food10-1;
			
			
		}
	}
	var chips=false;
	while(chips==false)//chips
	{
		var i=Math.floor(Math.random() * 17) + 0 ; 
		var j=Math.floor(Math.random() * 11) + 0 ; 
		
	
			if(board[i][j]==undefined)
		{
			board[i][j] = 11;	
			chips=true;
		}
	}
	time_elapsed=0;
	
	start=3;
	timeStart=new Date();
	startflag1=true;
	startflag2=true;
	
	startinterval=setInterval(drawStart, 80);
	start_time= "";
	
	

}



function drawStart(){
	var now=new Date();
	Draw();
	
	showhide('game','board');

	if(startflag1==true&&((now-timeStart)-parseInt(addAbout*1000)>1000&&(now-timeStart)-parseInt(addAbout*1000)<=2000))
	{
			
		start--;
		startflag1=false;
	}
	if(startflag2==true&&((now-timeStart)-parseInt(addAbout*1000)>2000&&(now-timeStart)-parseInt(addAbout*1000)<=3000))
	{
		start--;
		startflag2=false;
	}
	if((now-timeStart)-parseInt(addAbout*1000)>3000)
	{
		addAbout=0;
		start--;
		 window.clearInterval(startinterval);
			keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
	}, false);
	start_time= new Date();
	interval=setInterval(UpdatePosition, 80);
	ghostInterval=setInterval(updateGhostPos, 320);
	
	}
	
	
}




function drawAfterHit(){
	var now=new Date();
	Draw();
	
	if(startflag1==true&&((now-timeStart)-parseInt((addAbout*1000)-about2)>1000&&(now-timeStart)-parseInt((addAbout*1000)-about2)<=2000))
	{
		start--;
		startflag1=false;
	}
	if(startflag2==true&&((now-timeStart)-parseInt((addAbout*1000)-about2)>2000&&(now-timeStart)-parseInt((addAbout*1000)-about2)<=3000))
	{
		start--;
		startflag2=false;
	}
	if((now-timeStart)-parseInt((addAbout*1000)-about2)>3000)
	{
		
		addAbout=addAbout+3;
		start--;
		 window.clearInterval(startinterval);
			keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
	}, false);

	audio.play();
	
	interval=setInterval(UpdatePosition, 80);
	ghostInterval=setInterval(updateGhostPos, 320);
	
	}
	
	
}




function gameOver()
{
	Draw();
	var now=new Date();
	if(now-timeEnd>2000)
	{
		 window.clearInterval(endInterval);
		
	}
}



function startAfterHit(){
	//לעצור את הזמן ולהראות שהיתה התנגשותת
	////להוריד חיים
	life--;
	if(life==2)
	{
		var e = document.getElementById('h1');
		e.style.opacity="0.2";
		timeStart=new Date();
		start=3;
			 setTimeout(function(){
			 window.clearInterval(interval);
				}, 50);
				audio.pause();
				var au=new Audio ('pacman_death.WAV');
		au.play();
			setTimeout(function(){
			 window.clearInterval(ghostInterval);
				}, 50);	
				startflag1=true;
	startflag2=true;
	
		startinterval=setInterval(drawAfterHit, 80);
		
	}
	if(life==1)
	{
		about2=addAbout*1000;
		var e = document.getElementById('h2');
		e.style.opacity="0.2";
			timeStart=new Date();
		start=3;
			 setTimeout(function(){
			 window.clearInterval(interval);
				}, 50);
				audio.pause();
				var au=new Audio ('pacman_death.WAV');
		au.play();
			setTimeout(function(){
			 window.clearInterval(ghostInterval);
				}, 50);	
				startflag1=true;
	startflag2=true;
	//addAbout=addAbout-3;
		startinterval=setInterval(drawAfterHit, 80);
	}
	if(life==0)
	{
		var e = document.getElementById('h3');
		e.style.opacity="0.2";
	}
	
	
	if(life==0)
	{
		timeEnd=new Date();
		message="You Lost!";
		 setTimeout(function(){
			 window.clearInterval(interval);
				}, 50);
				audio.pause();
				
			setTimeout(function(){
			 window.clearInterval(ghostInterval);
				}, 50);			
		end=true;
		endInterval=setInterval(gameOver,80);
		var au=new Audio ('pacman_death.WAV');
		au.play();
	
	}
	else
	{
			if(ghostSel==0||ghostSel==1||ghostSel==2)//ghosts
			{
				board2[ghost1.i][ghost1.j]=0;
				board2[0][0]=5;//g1
				ghost1.i=0;
				ghost1.j=0;
				if(ghostSel==1||ghostSel==2)
				{
					board2[ghost2.i][ghost2.j]=0;
					board2[16][0]=6;//g2
					ghost2.i=16;
					ghost2.j=0;
					if(ghostSel==2)
					{
						board2[ghost3.i][ghost3.j]=0;
						board2[0][10]=7;//g3
						ghost3.i=0;
						ghost3.j=10;
					}
				}
				
			}
	}
	

}
 function walls(){
	var gradient = context.createLinearGradient(0, 0, 850, 0);
	// our three color stops
	gradient.addColorStop(0.1, "#99004d");
	gradient.addColorStop(0.3, "#ff1a8c");
	gradient.addColorStop(0.5, "#ff66b3");
	gradient.addColorStop(0.7,"#ff1a8c");
	gradient.addColorStop(0.9, "#99004d");
	// assigning the gradient
	
	
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(60,60);
	context.lineTo(150,60);
	context.lineTo(150,100);
	context.lineTo(60,100);
	context.lineTo(60,60);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();

	context.fillStyle = gradient;
	context.fill();
	
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(210,60);
	context.lineTo(350,60);
	context.lineTo(350,100);
	context.lineTo(210,100);
	context.lineTo(210,60);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(800,60);
	context.lineTo(710,60);
	context.lineTo(710,100);
	context.lineTo(800,100);
	context.lineTo(800,60);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(650,60);
	context.lineTo(510,60);
	context.lineTo(510,100);
	context.lineTo(650,100);
	context.lineTo(650,60);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(410,0);
	context.lineTo(410,190);
	context.lineTo(450,190);
	context.lineTo(450,0);
	context.lineTo(410,0);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(60,160);
	context.lineTo(350,160);
	context.lineTo(350,300);
	context.lineTo(110,300);
	context.lineTo(110,260);
	context.lineTo(310,260);
	context.lineTo(310,200);
	context.lineTo(60,200);
	context.lineTo(60,160);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();

	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(800,160);
	context.lineTo(510,160);
	context.lineTo(510,300);
	context.lineTo(750,300);
	context.lineTo(750,260);
	context.lineTo(550,260);
	context.lineTo(550,200);
	context.lineTo(800,200);
	context.lineTo(800,160);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(0,260);
	context.lineTo(50,260);
	context.lineTo(50,300);
	context.lineTo(0,300);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(860,260);
	context.lineTo(810,260);
	context.lineTo(810,300);
	context.lineTo(860,300);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();;
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(410,260);
	context.lineTo(450,260);
	context.lineTo(450,360);
	context.lineTo(550,360);
	context.lineTo(550,400);
	context.lineTo(310,400);
	context.lineTo(310,360);
	context.lineTo(410,360);
	context.lineTo(410,260);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(60,360);
	context.lineTo(60,400);
	context.lineTo(250,400);
	context.lineTo(250,360);
	context.lineTo(60,360);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(800,360);
	context.lineTo(800,400);
	context.lineTo(610,400);
	context.lineTo(610,360);
	context.lineTo(800,360);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(60,460);
	context.lineTo(60,500);
	context.lineTo(110,500);
	context.lineTo(110,553);
	context.lineTo(150,553);
	context.lineTo(150,460);
	context.lineTo(60,460);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(800,460);
	context.lineTo(800,500);
	context.lineTo(750,500);
	context.lineTo(750,553);
	context.lineTo(710,553);
	context.lineTo(710,460);
	context.lineTo(800,460);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(210,460);
	context.lineTo(350,460);
	context.lineTo(350,500);
	context.lineTo(250,500);
	context.lineTo(250,553);
	context.lineTo(210,553);
	context.lineTo(210,460);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(410,460);
	context.lineTo(450,460);
	context.lineTo(450,553);
	context.lineTo(410,553);
	context.lineTo(410,460);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
	
	context.beginPath();
	context.lineWidth=5;
	context.moveTo(510,460);
	context.lineTo(650,460);
	context.lineTo(650,553);
	context.lineTo(610,553);
	context.lineTo(610,500);
	context.lineTo(510,500);
	context.lineTo(510,460);
	context.lineJoin="round";
	context.lineCap="round";
	context.strokeStyle="#ff80bf";
	context.stroke();
	context.fillStyle = gradient;
	context.fill();
	
 }


function copy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copy(v) : v;
   }
   return output;
}

 function findRandomEmptyCell(board){
	var i = Math.floor((Math.random() * 17) + 0);
	var j = Math.floor((Math.random() * 11) + 0);
	while(board[i][j]!=0)
	{
		i = Math.floor((Math.random() * 17) + 0);
		j = Math.floor((Math.random() * 11) + 0);
	}
	return [i,j];             
 }

function GetKeyPressed() {
	if (keysDown[38]) {//up
		return 1;
	}
	if (keysDown[40]) { //down
		return 2;
	}
	if (keysDown[37]) { //left
		return 3;
	}
	if (keysDown[39]) { //right
		return 4;
	}
}



function Draw() {
	canvas.width=canvas.width; //clean board
	context.beginPath();
	context.rect(0, 0, 862, 558);
	context.fillStyle = "#ff80bf";
	context.fill();
	context.beginPath();
	context.rect(5, 5, 850, 548);
	context.fillStyle = "black";
	context.fill();
	lblScore.value = score;
	lblTime.value = parseInt(time_elapsed)+"/"+timeSel;
	for (var i = 0; i < 17; i++) {
		for (var j = 0; j < 11; j++) {
			var center = new Object();
			center.x = i * 50 + 30;
			center.y = j * 50 + 30;
			
			
			
			if (board[i][j] == 60) {//balls
				 
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "#00ffff"; //color 
				context.fill();
			
			
			}
			
			 else if (board[i][j] == 30) {//balls
				 
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = '#ff8080'; //color 
				context.fill();
			
			}
			
			
			 else if (board[i][j] == 10) {//balls
				 
				context.beginPath();
				context.arc(center.x, center.y, 11, 0, 2 * Math.PI); // circle
				context.fillStyle = '#ff00ff'; //color 
				context.fill();
			
			}
			if(board[i][j]==11)//chip
			{
				var img = document.getElementById("chip");
				context.drawImage(img, center.x-25, center.y-30,50,55); 
		
			}
			
			if(board3[i][j]==8)//character
			{
				var img = document.getElementById("sushi");
				context.drawImage(img, center.x-30, center.y-30,60,55); 
			}
			
			
			
			if(board3[i][j]==50)
			{
				context.font = "20px Century Gothic";
				context.fillStyle = "white";
				context.fillText("50",center.x, center.y);
				
			}
			
			
			
			if (board[i][j] == 2) {
		
				
					if(actionSide==4)//right
					{
						context.beginPath();
						if(eat==true)
						{
							context.arc(center.x, center.y, 25, 0, 2* Math.PI); //body circle
							eat=false;
						}
						else
						{
							context.arc(center.x, center.y, 25, 0.15 * Math.PI, 1.85 * Math.PI); //body half circle
						}
						context.lineTo(center.x, center.y);
						context.fillStyle = pac_color; //color 
						context.fill();
						context.beginPath();
						context.arc(center.x + 5, center.y - 15, 4, 0, 2 * Math.PI); // eye circle
						context.fillStyle = "black"; //color 
						context.fill();
						
						
						//seret
						context.beginPath();
						context.moveTo(center.x - 23, center.y - 15);
						context.lineTo(center.x - 19, center.y - 40);
						context.lineTo(center.x - 3, center.y - 30);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						
						context.beginPath();
						context.moveTo(center.x - 23, center.y - 15);
						context.lineTo(center.x - 50, center.y - 3);
						context.lineTo(center.x - 25, center.y +4);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						context.beginPath();
						context.arc(center.x - 23, center.y - 15, 4, 0, 2 * Math.PI); 
						context.fillStyle = "white"; //color 
						context.fill();
				
					}
					if(actionSide==3)//left
					{
						context.beginPath();
						if(eat==true)
						{
							context.arc(center.x, center.y, 25, 0, 2* Math.PI); //body half circle
							eat=false;
						}
						else
						{
							context.arc(center.x, center.y, 25, 1.15 * Math.PI, 0.85 * Math.PI); //body half circle
						}
						context.lineTo(center.x, center.y);
						context.fillStyle = pac_color; //color 
						context.fill();
						context.beginPath();
						context.arc(center.x - 5, center.y - 15, 4, 0, 2 * Math.PI); // eye circle
						context.fillStyle = "black"; //color 
						context.fill();
						
						
						//seret
						context.beginPath();
						context.moveTo(center.x + 23, center.y - 15);
						context.lineTo(center.x +19, center.y - 40);
						context.lineTo(center.x + 3, center.y - 30);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						
						context.beginPath();
						context.moveTo(center.x + 23, center.y - 15);
						context.lineTo(center.x + 50, center.y - 3);
						context.lineTo(center.x + 25, center.y +4);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						context.beginPath();
						context.arc(center.x + 23, center.y - 15, 4, 0, 2 * Math.PI);
						context.fillStyle = "white"; //color 
						context.fill();
						
						
						
					}
					if(actionSide==31)//up from left
					{
						context.beginPath();
						if(eat==true)
						{
							context.arc(center.x, center.y, 25, 0, 2 * Math.PI); //body half circle
							eat=false;
						}
						else
						{
							context.arc(center.x, center.y, 25, 1.65 * Math.PI, 1.35 * Math.PI); //body half circle
						}
						
					
						context.lineTo(center.x, center.y);
						context.fillStyle = pac_color; //color 
						context.fill();
						context.beginPath();
						context.arc(center.x +15, center.y-5, 4, 0, 2 * Math.PI); // eye circle
						context.fillStyle = "black"; //color 
						context.fill();
						
						
					
						
						
						
							
						//seret
						context.beginPath();
						context.moveTo(center.x + 15, center.y + 23);
						context.lineTo(center.x +3, center.y + 50);
						context.lineTo(center.x -4, center.y + 25);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						
						context.beginPath();
						context.moveTo(center.x + 15, center.y +23);
						context.lineTo(center.x + 40, center.y + 19);
						context.lineTo(center.x + 30, center.y +3);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						context.beginPath();
						context.arc(center.x + 15, center.y + 23, 4, 0, 2 * Math.PI);
						context.fillStyle = "white"; //color 
						context.fill();
						
						
						
						
					}
					if(actionSide==41)//up from right
					{
						
						context.beginPath();
						if(eat==true)
						{
							context.arc(center.x, center.y, 25, 0, 2 * Math.PI); //body half circle
							eat=false;
						}
						else{
							context.arc(center.x, center.y, 25, 1.65 * Math.PI, 1.35 * Math.PI); //body half circle
						}
						
						
						context.lineTo(center.x, center.y);
						context.fillStyle = pac_color; //color 
						context.fill();
						context.beginPath();
						context.arc(center.x -15, center.y-5, 4, 0, 2 * Math.PI); // eye circle
						context.fillStyle = "black"; //color 
						context.fill();
						
						
						
						//seret
						context.beginPath();
						context.moveTo(center.x - 15, center.y + 23);
						context.lineTo(center.x -3, center.y + 50);
						context.lineTo(center.x +4, center.y + 25);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						
						context.beginPath();
						context.moveTo(center.x - 15, center.y +23);
						context.lineTo(center.x - 40, center.y + 19);
						context.lineTo(center.x - 30, center.y +3);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						context.beginPath();
						context.arc(center.x - 15, center.y + 23, 4, 0, 2 * Math.PI);
						context.fillStyle = "white"; //color 
						context.fill();
				
					}
				
				
				
					if(actionSide==32)//down from left
					{
						
						context.beginPath();
						if(eat==true)
						{
							context.arc(center.x, center.y, 25, 0, 2 * Math.PI); //body half circle
							eat=false;
						}
						else
						{
							context.arc(center.x, center.y, 25, 0.65 * Math.PI, 0.35 * Math.PI); //body half circle
						}
						
						context.lineTo(center.x, center.y);
						context.fillStyle = pac_color; //color 
						context.fill();
						context.beginPath();
						context.arc(center.x -15, center.y+5, 4, 0, 2 * Math.PI); // eye circle
						context.fillStyle = "black"; //color 
						context.fill();
						
						
						
						
						
						
						//seret
						context.beginPath();
						context.moveTo(center.x - 15, center.y - 23);
						context.lineTo(center.x -40, center.y - 19);
						context.lineTo(center.x - 30, center.y - 3);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						
						context.beginPath();
						context.moveTo(center.x - 15, center.y - 23);
						context.lineTo(center.x - 3, center.y - 50);
						context.lineTo(center.x + 4, center.y -25);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						context.beginPath();
						context.arc(center.x - 15, center.y - 23, 4, 0, 2 * Math.PI);
						context.fillStyle = "white"; //color 
						context.fill();
					}
					if(actionSide==42)//down from right
					{
						context.beginPath();
						if(eat==true)
						{
								context.arc(center.x, center.y, 25, 0, 2 * Math.PI); //body half circle
								eat=false;
						}
						else
						{
								context.arc(center.x, center.y, 25, 0.65 * Math.PI, 0.35 * Math.PI); //body half circle
						}
					
						context.lineTo(center.x, center.y);
						context.fillStyle = pac_color; //color 
						context.fill();
						context.beginPath();
						context.arc(center.x +15, center.y+5, 4, 0, 2 * Math.PI); // eye circle
						context.fillStyle = "black"; //color 
						context.fill();
						
						
						
						//seret
						context.beginPath();
						context.moveTo(center.x + 15, center.y - 23);
						context.lineTo(center.x +40, center.y - 19);
						context.lineTo(center.x + 30, center.y - 3);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						
						context.beginPath();
						context.moveTo(center.x + 15, center.y - 23);
						context.lineTo(center.x + 3, center.y - 50);
						context.lineTo(center.x - 4, center.y -25);
						context.fillStyle = '#ff1a8c'; //color 
						context.fill();
						
						context.beginPath();
						context.arc(center.x +15, center.y - 23, 4, 0, 2 * Math.PI);
						context.fillStyle = "white"; //color 
						context.fill();
					}
				
				
			}
				
			
			
		
			///ghosts
			 if (board2[i][j] == 5) {
				
				var img = document.getElementById("g1");
				context.drawImage(img, center.x-30, center.y-30,55,55); 
				
			}
			
			
			 if (board2[i][j] == 6) {
				 
				var img = document.getElementById("g2");
				context.drawImage(img, center.x-30, center.y-30,55,55); 
			
			}
			
			 if (board2[i][j] == 7) {
				 
				var img = document.getElementById("g3");
				context.drawImage(img, center.x-30, center.y-30,55,55); 
			
			}
			
			
			
		}
	}
	walls();
	if(start>0){
		context.font = "100px Century Gothic";
		context.strokeStyle = "yellow";
		context.strokeText(start,400, 280);
		context.fillStyle="black";
		context.fillText(start,400, 280);
	}
	if(message=="You Lost!")
	{
		context.font = "100px Century Gothic";
		context.strokeStyle = "yellow";
		context.strokeText(message,200, 280);
		context.fillStyle="black";
		context.fillText(message,200, 280);
	}
	if(message=="points")
	{
		message="You got "+score+" points, You can do better!";
		context.font = "35px Century Gothic";
		context.strokeStyle = "yellow";
		context.strokeText(message,100, 280);
		context.fillStyle="black";
		context.fillText(message,100, 280);
		message="points";
	}
	if(message=="We have a winner!!!")
	{
		
		context.font = "60px Century Gothic";
		context.strokeStyle = "yellow";
		context.strokeText(message,150, 280);
		context.fillStyle="black";
		context.fillText(message,150, 280);
	}
	

	if(end==false&&(board2[shape.i][shape.j]==5||board2[shape.i][shape.j]==6||board2[shape.i][shape.j]==7))
	{
		startAfterHit();
	}
}		

var eat=false;


function UpdatePosition() {
	board[shape.i][shape.j]=0;
	var x = GetKeyPressed();
	
	if(x!==undefined)
	{
		eat=true;
		lastDirection=newDirection;
		newDirection=x;
		if(newDirection==3)//left
			actionSide=3;
		if(newDirection==4)//right
			actionSide=4;
		if(newDirection==1&&(lastDirection==3||(lastDirection==2&&actionSide==42)))
			actionSide=31;
		if(newDirection==1&&(lastDirection==4||(lastDirection==2&&actionSide==32)))
			actionSide=41;
		if(newDirection==2&&(lastDirection==3||(lastDirection==1&&actionSide==41)))
			actionSide=32;
		if(newDirection==2&&(lastDirection==4||(lastDirection==1&&actionSide==31)))
			actionSide=42;
	}

	
	if(x==1)
	{
		if(shape.j>0 && board[shape.i][shape.j-1]!=4)
		{
			shape.j--;
		}
	}
	if(x==2)
	{
		if(shape.j<10 && board[shape.i][shape.j+1]!=4)
		{
			shape.j++;
		}
	}
	if(x==3)
	{
		if(shape.i>0 && board[shape.i-1][shape.j]!=4)
		{
			shape.i--;
		}
	}
	if(x==4)
	{
		if(shape.i<16 && board[shape.i+1][shape.j]!=4)
		{
			shape.i++;
		}
	}
	if(board[shape.i][shape.j]==60)
	{
		score=score+5;
	}
	if(board[shape.i][shape.j]==30)
	{
		score=score+15;
	}
	if(board[shape.i][shape.j]==10)
	{
		score=score+25;
	}
	if(board[shape.i][shape.j]==11)
	{
		score=score+30;
		var e2 = document.getElementById('chip2');
		e2.style.opacity=0.2;
		
	}
	board[shape.i][shape.j]=2;
	var currentTime=new Date();
	time_elapsed=((currentTime-start_time)/1000)-parseInt(addAbout);
	if(score>=200&&time_elapsed<=10)
	{
		pac_color="#ffb3d1";
	}
	


	
	Draw();
	if(charac==true&&shape.i==character.i&&shape.j==character.j)
	{
		score=score+50;
		board3[character.i][character.j]=50;
		charac=false;
		
		var e2 = document.getElementById('humb3');
		e2.style.opacity=0.2;
		
		setTimeout(function(){
			 board3[character.i][character.j]=0;
				}, 2000);
		
		
	}
	
	

	
	if(time_elapsed>=timeSel&&score<700)
	{
	timeEnd=new Date();
		message="points";
		 setTimeout(function(){
			 window.clearInterval(interval);
				}, 50);
				audio.pause();
				
			setTimeout(function(){
			 window.clearInterval(ghostInterval);
				}, 50);			
		end=true;
		endInterval=setInterval(gameOver,80);
		var au=new Audio ('pacman_death.WAV');
		au.play();
		
	}
	if(time_elapsed>=timeSel&&score>=700)
	{
		timeEnd=new Date();
		message="We have a winner!!!";
		 setTimeout(function(){
			 window.clearInterval(interval);
				}, 50);
				audio.pause();
				
			setTimeout(function(){
			 window.clearInterval(ghostInterval);
				}, 50);			
		end=true;
		endInterval=setInterval(gameOver,80);
		var au=new Audio ('pacman_intermission.WAV');
		au.play();
	
	}
	var outOfBalls=false
	
	for (var i = 0; i < 17; i++) 
	{
		for (var j = 0; j < 11; j++) 
		{
			if(board[i][j]==60||board[i][j]==30||board[i][j]==10)
			{
				outOfBalls=true;
				break;
			}
			
		}
	}
	if(outOfBalls==false)//נגמרו הכדורים
	{
		timeEnd=new Date();
		message="We have a winner!!!";
		 setTimeout(function(){
			 window.clearInterval(interval);
				}, 50);
				audio.pause();
				
			setTimeout(function(){
			 window.clearInterval(ghostInterval);
				}, 50);			
		end=true;
		endInterval=setInterval(gameOver,80);
		var au=new Audio ('pacman_intermission.WAV');
		au.play();
	}
	
}




function updateGhostPos(){
	
	
	//ghostSel=0->1 ghost
	//first ghost always shows
	if(charac==true)//character position
	{
		var flag=false;
		while(flag==false)
		{
			var side=Math.random();
			if(side<0.25)//up
			{
				if(character.j-1>=0&&board3[character.i][character.j-1]!=4)
				{
					board3[character.i][character.j]=0;
					board3[character.i][character.j-1]=8;
					character.j=character.j-1;
					flag=true;
				}
			}
			if(side>=0.25&&side<0.5)//down
			{
				if(character.j+1<11&&board3[character.i][character.j+1]!=4)
				{
					board3[character.i][character.j]=0;
					board3[character.i][character.j+1]=8;
					character.j=character.j+1;
					flag=true;
					
				}
			}
			if(side>=0.5&&side<0.75)//left
			{
				if(character.i-1>0&&board3[character.i-1][character.j]!=4)
				{
					board3[character.i][character.j]=0;
					board3[character.i-1][character.j]=8;
					character.i=character.i-1;
					flag=true;
				}
			}
			if(side>=0.75)//right
			{
				if(character.i+1<17&&board3[character.i+1][character.j]!=4)
				{
					board3[character.i][character.j]=0;
					board3[character.i+1][character.j]=8;
					character.i=character.i+1;
					flag=true;
				}
			}
			
		}
	}
	
	bfs();
	board2[ghost1.i][ghost1.j]=0;
	var newI=ghost1.i;
	var newJ=ghost1.j;
	var minDistace=bfsBoard[ghost1.i][ghost1.j];
	if(ghost1.i+1<17&&board2[ghost1.i+1][ghost1.j]!=4)
	{
		var dist=bfsBoard[ghost1.i+1][ghost1.j];
		if(dist<minDistace)
		{
			minDistace=dist;
			newI=ghost1.i+1;
			newJ=ghost1.j;
		}
		
	}
	if(ghost1.i-1>=0&&board2[ghost1.i-1][ghost1.j]!=4)
	{
		var dist=bfsBoard[ghost1.i-1][ghost1.j];
		if(dist<minDistace)
		{
			minDistace=dist;
			newI=ghost1.i-1;
			newJ=ghost1.j;
		}
	}
	if(ghost1.j+1<11&&board2[ghost1.i][ghost1.j+1]!=4)
	{
		var dist=bfsBoard[ghost1.i][ghost1.j+1];
		if(dist<minDistace)
		{
			minDistace=dist;
			newI=ghost1.i;
			newJ=ghost1.j+1;
		}
	}
	if(ghost1.j-1>=0&&board2[ghost1.i][ghost1.j-1]!=4)
	{

		var dist=bfsBoard[ghost1.i][ghost1.j-1];
		if(dist<minDistace)
		{
			minDistace=dist;
			newI=ghost1.i;
			newJ=ghost1.j-1;
		}
	}
	
	
	ghost1.i=newI;
	ghost1.j=newJ;
	board2[newI][newJ]=5;
	
	
	
	
	if(ghostSel==1||ghostSel==2)//secound
	{
		if(board2[ghost2.i][ghost2.j]!=5)
			board2[ghost2.i][ghost2.j]=0;
		var newI=ghost2.i;
		var newJ=ghost2.j;

		var minDistace=bfsBoard[ghost2.i][ghost2.j];
		if(ghost2.i+1<17&&board2[ghost2.i+1][ghost2.j]!=4&&board2[ghost2.i+1][ghost2.j]!=5)
		{
			var dist=bfsBoard[ghost2.i+1][ghost2.j];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost2.i+1;
				newJ=ghost2.j;
			}
			
		}
		if(ghost2.i-1>=0&&board2[ghost2.i-1][ghost2.j]!=4&&board2[ghost2.i-1][ghost2.j]!=5)
		{
			var dist=bfsBoard[ghost2.i-1][ghost2.j];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost2.i-1;
				newJ=ghost2.j;
			}
		}
		if(ghost2.j+1<11&&board2[ghost2.i][ghost2.j+1]!=4&&board2[ghost2.i][ghost2.j+1]!=5)
		{

			var dist=bfsBoard[ghost2.i][ghost2.j+1];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost2.i;
				newJ=ghost2.j+1;
			}
		}
		if(ghost2.j-1>=0&&board2[ghost2.i][ghost2.j-1]!=4&&board2[ghost2.i][ghost2.j-1]!=5)
		{

			var dist=bfsBoard[ghost2.i][ghost2.j-1];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost2.i;
				newJ=ghost2.j-1;
			}
		}
		ghost2.i=newI;
		ghost2.j=newJ;
		board2[newI][newJ]=6;
	}
	
	
	
	
	
	if(ghostSel==2)//third
	{
		if(	board2[ghost3.i][ghost3.j]!=5&&	board2[ghost3.i][ghost3.j]!=6)
			board2[ghost3.i][ghost3.j]=0;

		var newI=ghost3.i;
		var newJ=ghost3.j;
		var minDistace=bfsBoard[ghost3.i][ghost3.j];
		if(ghost3.i+1<17&&board2[ghost3.i+1][ghost3.j]!=4&&board2[ghost3.i+1][ghost3.j]!=5&&board2[ghost3.i+1][ghost3.j]!=6)
		{
			var dist=bfsBoard[ghost3.i+1][ghost3.j];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost3.i+1;
				newJ=ghost3.j;
			}
			
		}
		if(ghost3.i-1>=0&&board2[ghost3.i-1][ghost3.j]!=4&&board2[ghost3.i-1][ghost3.j]!=5&&board2[ghost3.i-1][ghost3.j]!=6)
		{
			var dist=bfsBoard[ghost3.i-1][ghost3.j];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost3.i-1;
				newJ=ghost3.j;
			}
		}
		if(ghost3.j+1<11&&board2[ghost3.i][ghost3.j+1]!=4&&board2[ghost3.i][ghost3.j+1]!=5&&board2[ghost3.i][ghost3.j+1]!=6)
		{

			var dist=bfsBoard[ghost3.i][ghost3.j+1];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost3.i;
				newJ=ghost3.j+1;
			}
		}
		if(ghost3.j-1>=0&&board2[ghost3.i][ghost3.j-1]!=4&&board2[ghost3.i][ghost3.j-1]!=5&&board2[ghost3.i][ghost3.j-1]!=6)
		{

			var dist=bfsBoard[ghost3.i][ghost3.j-1];
			if(dist<minDistace)
			{
				minDistace=dist;
				newI=ghost3.i;
				newJ=ghost3.j-1;
			}
		}
		ghost3.i=newI;
		ghost3.j=newJ;
		board2[newI][newJ]=7;
	}

	
}





 function showhide(id1,id2) {//hide id1, show id2
 
	
       	var e = document.getElementById(id1);
		e.style.display = 'none';
		var e2 = document.getElementById(id2);
		e2.style.display='block';
	
		
}


function login(){

	 	user = document.getElementById('uname').value;
		var pass=document.getElementById('psw').value;
		var len=users.length;
		var flag=false;
		for(var i=0; i<len; i++)
		{
			
			if(users[i]==user)
			{
				
				if(passwords[i]==pass)
				{	
					showhide('login','game');
					
					flag=true;
					document.getElementById('hellow').innerHTML="Hellow "+user+"!";
				}
					
				
			}
		}
		if(flag==false)
			alert("Worng username or password");
		
}
function regClick(){
	var game = document.getElementById('game');
	var board= document.getElementById('board');
	var logi= document.getElementById('login');
	var welc= document.getElementById('welcome');
	if(game.style.display=='block')
	{
		document.getElementById("username").value="";
		document.getElementById("first").value="";
		document.getElementById("last").value="";
		document.getElementById("email").value="";
		document.getElementById("password").value="";
		document.getElementById("birthday").value="";
		document.getElementById("psw").value="";
		document.getElementById("uname").value="";
		showhide('game','registration');
	}
	if(board.style.display=='block')
	{
		document.getElementById("username").value="";
		document.getElementById("first").value="";
		document.getElementById("last").value="";
		document.getElementById("email").value="";
		document.getElementById("password").value="";
		document.getElementById("birthday").value="";
		document.getElementById("psw").value="";
		document.getElementById("uname").value="";
	end=true;
	
	
			 window.clearInterval(startinterval);
			
	
			 window.clearInterval(interval);
			
				
			 window.clearInterval(drawStart);
			
			
			 window.clearInterval(ghostInterval);
			
				
	audio.pause();
	document.getElementById("time").selectedIndex=0;
	timeSel = time.selectedIndex;
	if(timeSel==0)
		timeSel=60;
	if(timeSel==1)
		timeSel=90;
	if(timeSel==2)
		timeSel=120;
	if(timeSel==3)
		timeSel=150;
	var ghost=document.getElementById("numGhost").selectedIndex=0;
	showhide('board','registration');
	}
	if(logi.style.display=='block')
	{
		showhide('login','registration');
		document.getElementById("psw").value="";
		document.getElementById("uname").value="";
		
	}
	if(welc.style.display!='none')
	{
		
		showhide('welcome','registration');
	}
}




function reg()
{
	

		var user = document.getElementById('username').value;
		var pass=document.getElementById('password').value;
		var last= document.getElementById('last').value;
		var first=document.getElementById('first').value;
		var mail=document.getElementById('email').value;
		var len=users.length;
		var free=true;
		for(var i=0; i<len; i++)
		{
			if(users[i]==user)
			{
				alert("Username already exists");
				free=false;
				break;
			}
			
		}
		if(free==true)
		{
			users.push(user);
			passwords.push(pass);
			showhide('registration','login');
		}
}

	 

	 
function bfs(){
	bfsBoard=copy(wallsBoard);
	for (var i = 0; i < 17; i++) {
		for (var j = 0; j < 11; j++) {
			if(bfsBoard[i][j]==4)
				bfsBoard[i][j]=10000;//wall
			else
				bfsBoard[i][j]=-1
		}
	}
	var Pacpos=new Object();

	Pacpos.i=shape.i;
	Pacpos.j=shape.j;
	var queue = [];
	queue.push(Pacpos);
	bfsBoard[shape.i][shape.j]=0;
	
	while(queue.length>0)
	{
			
		var node = queue.shift();
		if(node.i+1<17&&bfsBoard[node.i+1][node.j]==-1)
		{
			bfsBoard[node.i+1][node.j]=bfsBoard[node.i][node.j]+1;
			var newNode=new Object();
			newNode.i=node.i+1;
			newNode.j=node.j;
			queue.push(newNode);
		}
		if(node.i-1>=0&&bfsBoard[node.i-1][node.j]==-1)
		{
			bfsBoard[node.i-1][node.j]=bfsBoard[node.i][node.j]+1;
			var newNode=new Object();
			newNode.i=node.i-1;
			newNode.j=node.j;
			queue.push(newNode);
		}
		if(node.j+1<11&&bfsBoard[node.i][node.j+1]==-1)
		{
			bfsBoard[node.i][node.j+1]=bfsBoard[node.i][node.j]+1;
			var newNode=new Object();
			newNode.i=node.i;
			newNode.j=node.j+1;
			queue.push(newNode);
		}
		if(node.j-1>=0&&bfsBoard[node.i][node.j-1]==-1)
		{
			bfsBoard[node.i][node.j-1]=bfsBoard[node.i][node.j]+1;
			var newNode=new Object();
			newNode.i=node.i;
			newNode.j=node.j-1;
			queue.push(newNode);
		}
		
	}

}


function about(){
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	if(end==false)
	{
			 setTimeout(function(){
			 window.clearInterval(startinterval);
				}, 50);
	
		 setTimeout(function(){
			 window.clearInterval(interval);
				}, 50);
				
				setTimeout(function(){
			 window.clearInterval(ghostInterval);
				}, 50);
		audio.pause();
		aboutTime=new Date();
	
	}
	
	
	
	
}	 
	 
	 
	 
function aboutClose(){
	var modal = document.getElementById('myModal');
	modal.style.display = "none";
	if(end==false)
	{
			aboutEndTime=new Date();
			audio.play();
			addAbout=addAbout+((aboutEndTime-aboutTime)/1000);
			if(start>0)
				startinterval=setInterval(drawStart, 80);
			else
			{
				interval=setInterval(UpdatePosition, 80);
				ghostInterval=setInterval(updateGhostPos, 320);		
			}
			
	}

	
}	 
	 
	 
	 
	 
function newGame()
{
	var game = document.getElementById('game');
	var board= document.getElementById('board');

	if(game.style.display!='block'&&board.style.display!='block')
	{
		alert("You must login first");
			var welc = document.getElementById('welcome');
			var regi= document.getElementById('registration');
			if(welc.style.display=='block')
			{
				showhide('welcome','login');
				
			}
			if(regi.style.display=='block')
			{
				showhide('registration','login');
				
			}
		
	}
	else
	{
		end=true;
	showhide('board','game');
	
			 window.clearInterval(startinterval);
			
	
	
			 window.clearInterval(interval);
			
	
			 window.clearInterval(drawStart);
			
				
			
			 window.clearInterval(ghostInterval);
			
				
	audio.pause();
	document.getElementById("time").selectedIndex=0;
	timeSel = time.selectedIndex;
	if(timeSel==0)
		timeSel=60;
	if(timeSel==1)
		timeSel=90;
	if(timeSel==2)
		timeSel=120;
	if(timeSel==3)
		timeSel=150;
	var ghost=document.getElementById("numGhost").selectedIndex=0;

	}
	
	
	
}	 

function log(){
	
	var game = document.getElementById('game');
	var board= document.getElementById('board');
	var regi= document.getElementById('registration');
	var welc= document.getElementById('welcome');
	if(game.style.display=='block')
	{
		document.getElementById("username").value="";
		document.getElementById("first").value="";
		document.getElementById("last").value="";
		document.getElementById("email").value="";
		document.getElementById("password").value="";
		document.getElementById("birthday").value="";
		document.getElementById("psw").value="";
		document.getElementById("uname").value="";
		showhide('game','login');
	}
	if(board.style.display=='block')
	{
		document.getElementById("username").value="";
		document.getElementById("first").value="";
		document.getElementById("last").value="";
		document.getElementById("email").value="";
		document.getElementById("password").value="";
		document.getElementById("birthday").value="";
		document.getElementById("psw").value="";
		document.getElementById("uname").value="";
	end=true;
	
	
			 window.clearInterval(startinterval);
			
	
			 window.clearInterval(interval);
				
				
			 window.clearInterval(drawStart);
			
				
			 window.clearInterval(ghostInterval);
				
	audio.pause();
	document.getElementById("time").selectedIndex=0;
	timeSel = time.selectedIndex;
	if(timeSel==0)
		timeSel=60;
	if(timeSel==1)
		timeSel=90;
	if(timeSel==2)
		timeSel=120;
	if(timeSel==3)
		timeSel=150;
	var ghost=document.getElementById("numGhost").selectedIndex=0;
	showhide('board','login');
	}
	if(regi.style.display=='block')
	{
		showhide('registration','login');
		document.getElementById("username").value="";
		document.getElementById("first").value="";
		document.getElementById("last").value="";
		document.getElementById("email").value="";
		document.getElementById("password").value="";
		document.getElementById("birthday").value="";
		
	}
	if(welc.style.display!='none')
	{
		
		showhide('welcome','login');
	}
	
}
	 
	 
	 
	 
function cancelLogin(){
	showhide('login','welcome');
	document.getElementById("psw").value="";
	document.getElementById("uname").value="";
}	 
	
function canelReg(){
	showhide('registration','welcome');
	document.getElementById("username").value="";
	document.getElementById("first").value="";
	document.getElementById("last").value="";
	document.getElementById("email").value="";
	document.getElementById("password").value="";
	document.getElementById("birthday").value="";
}	
	 
	 
function logout(){
	var game = document.getElementById('game');
	var board= document.getElementById('board');

	if(game.style.display!='block'&&board.style.display!='block')
	{
		alert("You are logged out");	
	}
	if(game.style.display=='block')
	{
		document.getElementById("username").value="";
		document.getElementById("first").value="";
		document.getElementById("last").value="";
		document.getElementById("email").value="";
		document.getElementById("password").value="";
		document.getElementById("birthday").value="";
		document.getElementById("psw").value="";
		document.getElementById("uname").value="";
		showhide('game','welcome');
	}
	if(board.style.display=='block')
	{
		document.getElementById("username").value="";
		document.getElementById("first").value="";
		document.getElementById("last").value="";
		document.getElementById("email").value="";
		document.getElementById("password").value="";
		document.getElementById("birthday").value="";
		document.getElementById("psw").value="";
		document.getElementById("uname").value="";
	end=true;
	showhide('board','welcome');
	
			 window.clearInterval(startinterval);
				
	
			 window.clearInterval(drawStart);
			
	
			 window.clearInterval(interval);
			
				
				
			 window.clearInterval(ghostInterval);
			
	audio.pause();
	document.getElementById("time").selectedIndex=0;
	timeSel = time.selectedIndex;
	if(timeSel==0)
		timeSel=60;
	if(timeSel==1)
		timeSel=90;
	if(timeSel==2)
		timeSel=120;
	if(timeSel==3)
		timeSel=150;
	var ghost=document.getElementById("numGhost").selectedIndex=0;
	}
}	 
	 














$(function()
{

	$.validator.addMethod("notANumber", function(value, element) {
	  return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Letters only please</br>"); 
	
	$.validator.addMethod('validPassword', function(value, element) {
        return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
    }, 'Password must contain at least one numeric and one alphabetic character.</br>');
	
	$.validator.addMethod('notExistUserName', function(value, element) {
        var exist = false;
		for(var i = 0; i < users.length; i++) 
		{
			if (users[i].user_name === value) 
			{
				exist = true;
				break;
			}
		}
		return !(exist);
    }, 'Password must contain at least one numeric and one alphabetic character.');
	

	
	 $("form[name='regis2']").validate({
		 
		rules: {
		  first: {
			  required: true,
			  notANumber: true
		  },
		  last: {
			  required: true,
			  notANumber: true
		  },
		  username:{
			  required: true,
			  notExistUserName: true
		  },
		 birthday:{
			 required: true
		 },
		 
		  email: {
			required: true,
			email: true
		  },
		  password: {
			required: true,
			minlength: 8,
			validPassword: true
		  }
		},
		// Specify validation error messages
		messages: {
		  first: {
			  required: "Please enter your firstname</br>",
			  notANumber: "Only alphabatic characters allowed.</br>"
		  },
		  last: {
			  required: "Please enter your lastname</br>",
			  notANumber: "Only alphabatic characters allowed.</br>"
		  },
		  username: {
			  required: "Please enter your username</br>",
			  notExistUserName: "Username alredy exist.</br>"
		  },
		  password: {
			required: "Please provide a password</br>",
			minlength: "Your password must be at least 8 characters long</br>",
			validPassword: "Your Password must contain at least one numeric and one alphabetic character.</br>"
		  },
		   birthday: {
			   required: "Please provide your birthday</br>",
		  },
		  email: "Please enter a valid email address</br>"
		},
		submitHandler: function(form) {
		  form.submit();
		}
  });
})	 
	 
	 
	 
	 