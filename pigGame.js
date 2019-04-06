var score=[0,0];
var roundScore=[0,0];
var activePlayer,i;
i=activePlayer;
var gameStatus;
var audio1=new Audio('roll.wav');
var audio2=new Audio('newGame.mp3');
var audio3=new Audio('hold.mp3');
var audio4=new Audio('gameStart.mp3');
var audio5=new Audio('winning.mp3');
var player1,player2,lastDice;
audio4.play();
init();
function noNames()
{
	if(player1===""  || player2==="")
	{
		document.getElementById('name-0').textContent='Player 1' ;
		document.getElementById('name-1').textContent='Player 2' ;
	}
	if(winningScore==="")
	{
		winningScore=100;
	}
}
noNames();
function init()
{
    gameStatus=true;
    i=0;
	player1=prompt("Enter first player's name ");
	player2=prompt("Enter second player's name ");
	winningScore=prompt("Set the winning score");
	
	document.getElementById('name-0').textContent=player1;
	document.getElementById('name-1').textContent=player2;
	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';
	document.getElementById('score-0').textContent='0';
	document.getElementById('score-1').textContent='0';
	document.querySelector('.dice').style.display= "none";
	document.getElementById('dice1').style.display= "none";
	score=[0,0];
	roundScore=[0,0];
	document.querySelector('.player-' + i + '-panel').classList.remove('winner');
	
	document.querySelector('.player-0-panel').classList.remove('looser');
	document.querySelector('.player-1-panel').classList.remove('looser');
	
}

function newGame()
{
	init();
	noNames();
	audio2.play();
	document.querySelector('.player-0-panel').classList.add('active');
	if(i===0)
	{
		i=1;
		document.querySelector('.player-' + i + '-panel').classList.remove('winner');
		document.querySelector('.player-1-panel').classList.remove('active');
		//document.getElementById('name-' + i).textContent='Player 2' ;
	}
		i=0;
}

document.querySelector('.btn-new').addEventListener('click',newGame);
document.querySelector('.btn-roll').addEventListener('click',rollDice);
document.querySelector('.btn-hold').addEventListener('click',hold);

function rollDice()
{
	if(gameStatus)
	{
		audio1.play();
		var dice = Math.floor(Math.random()*6)+1;
		var dice1 = Math.floor(Math.random()*6)+1;
	    document.querySelector('.dice').style.display= "block";
		document.getElementById('dice1').style.display= "block";
	    document.querySelector('.dice').src="dice-" + dice + ".png";
	    document.getElementById('dice1').src="dice-" + dice1 + ".png";
	    score[i]+=dice+dice1;
	    document.getElementById('current-' + i).textContent=score[i];
		/*if(lastDice===6 && dice===6)
		{
			score[i]=0;
			roundScore[i]=0;
			document.getElementById('score-' + i).textContent='0';
			nextPlayer();
		}*/
	    if(dice===1 || dice1===1)
	    {
		 nextPlayer();
		 score[i]=0;
		 document.getElementById('current-' + i).textContent='0';
	   }
	   lastDice=dice;
	   
	}
	
}

function nextPlayer()
{
	if(i===0)
	{
		i=1;
		document.querySelector('.player-1-panel').classList.toggle('active');
		document.querySelector('.player-0-panel').classList.toggle('active');
		score=[0,0];
		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';
	}
	else
	{
		i=0;
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		score=[0,0];
		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';
	}
	document.querySelector('.dice').style.display= "none";
	document.getElementById('dice1').style.display= "none";
}

function hold()
{
	if(gameStatus)
	{
		if(score[i]!==0)
		{
			audio3.play();
		    roundScore[i]+=score[i];
            score=[0,0];
	        document.getElementById('score-' + i).textContent=roundScore[i];
	        document.getElementById('current-' + i).textContent='0';
	        if(roundScore[i]>=winningScore)
	        {
		      winner();
		      gameStatus=false;
		
	        }
	        nextPlayer();
		}
		
	}
	
}
function winner()
	{
		document.querySelector('.player-' + i + '-panel').classList.add('winner');
		document.getElementById('name-' + i).textContent='WINNER!';
		audio5.play();
		if(i===0)
		{
			i=1;
			document.querySelector('.player-' + i + '-panel').classList.add('looser');
			document.getElementById('name-' + i).textContent='LOOSER!';
		}
		else{
			i=0;
			document.querySelector('.player-' + i + '-panel').classList.add('looser');
			document.getElementById('name-' + i).textContent='LOOSER!';
		}
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
	}	
	
	