/*  Douglas Aquilino       February 11, 2017   */
/*  RCB - "Star Wars RPG" Homework #4           */
/*                game.js                      */


/*		                   NOTES

	1.) choose yourCharacter
		display
	
function fight(){	(recursive Function)(Not in object)
	
	2.) choose enemy.                 	
	3.) (attack)(in object i.e. yourPlayer.attack(enemy))
		
		if win:
			check if enemies left
				if yes 
					fight();
				if no
					you win
					reset game
		if lose:
			you lose
			reset game
}
===================== General Note ===================
put characters in array.(string or objects)
	remove yourcharacter.
	remove enemies as you go.

	string to object refference: this[x] or window[x] 
------------------------------------------

MOVED Win ALERT and LOSE ALERT outside object

------------------------------------------
Array methods:
	indexOf()  returns index in not in array -1;
	map(). used to copy array
	splice(index, 0) remove element to delete.
---------------------------------------------------
If i use css show hide. hide taken out of flow.

===============================================*/


// Global Variable Declarations
	var yourCharacter = 0;
	var yourScore;
	var enemyScore;
	// Copy of 'characters' array to use in game 
	var currentCharacters = [];


	// character object constructor function
	function character(health, attack, counterAttack )
	{

		// =============== character properties ==================
		//private
		const HEALTH = health;
		const ATTACK = attack;
		const COUNTERATTACK = counterAttack;  //test

		//public
		this.currentAttack = attack;
		this.currentHealth = HEALTH;
			
		// =========== character methods =======================

		//DONE!
		// Returns characters COUNTERATTACK
		this.getCounterAttack = function(){
			return COUNTERATTACK;
		};//END getCounterAttack

		//DONE!
		//Resets characters stats
		this.resetStats = function()
		{
			this.currentHealth = HEALTH;
			this.currentAttack = ATTACK;
			
		};//END restGame

		//DONE!
		// You attacks enemy: enemy's health dec. by current attack 
		// Enemy attacks you: your health dec. by enemy's counter attack
		// Your current attack increments.
		this.attack = function(enemy){

			this.decYourHealth(enemy);
			this.decEnemyHealth(enemy);
			this.incAttack();
		};
		
		//DONE!
		//Increments Current Attack Power
		this.incAttack  = function() 
		{
			this.currentAttack += ATTACK;

		};//END incAttack
		
		//DONE!
		//Decrements your health by enemy's counter attack value.
		this.decYourHealth = function(enemy)
		{		
			this.currentHealth -=  enemy.getCounterAttack();
			
		};//END decYourHealth

		//DONE!
		//Decrements enemy's health by your current attack value.
		this.decEnemyHealth = function(enemy)
		{		
			enemy.currentHealth -=  this.currentAttack;
			
		};//END decEnemyHealth
		
		
		//DONE!
		// Check if your dead
		this.isDead = function(x)
		{
			if(this.currentHealth <= 0)
			{
				return true;
			}
				return false;
		};//END compare

		
		// might move out of object.
		this.display = function()
		{			
		};
		
		this.start = function()  // may not need this see resetGame
		{			
		};
		
		//test
		this.battle = function(enemy)  
		{
			this.attack(enemy);
			this.incAttack();
			//more 
			
			// might need to move out of object
			if(this.isDead())
			{
				return true;
			}
				return false;
		};

	};//END character constructor

	
	// Create our four characters objects
	var character1 = new character(100,10,10);
	var character2 = new character(200,20,20);
	var character3 = new character(30,31,32);
	var character4 = new character(40,41,42);
	
	// Constant Array containing our four characters names
//const characters = ["character1","character2","character3","character4"];
	
	// test 
	const characters = [character1,character2,character3,character4];
	
	

	// Use Css show hide for this. or  jQuery show/hide?
	//test function for copying characters to div2. remove didnt work
	function enemies(){
		$("#yourCharacter").html("Your Character!");
		$("#div1").clone().appendTo("#div2");
		console.log();
		$("#choose").remove("#div1");

	}

	
$(document).ready(function()
{ 
	
	// Assign each character div its corresponding object name.
	$("#character1").data("object", character1);
	$("#character2").data("object", character2);
	$("#character3").data("object", character3);
	$("#character4").data("object", character4);
	

	/*  =========== Code test box =======================*/
					
	
	


/*-------------------------------------------------------*/



	// Event Hander For Gems
	$(".character").on("click", function()
	{
		

		 if((typeof yourCharacter) != "object")
		 {
		 	// When characters click on gets corresponding object
		 	// .display just for test purposes
		 	var thisId = $("#" + $(this).attr("id"))
		 	yourCharacter = thisId.data("object");
		yourCharacter.display(); // Test Code remove
		thisId.css("border-color", "red");// Test Code remove
		enemies();// Test Code remove
		 }

		 
	});//END .on("click")





	// When "Show Instructions" button clicked. Instructions display.
	$("#show").on("click",function()
	{
		$("#instructions-col").slideDown(1000);	//1000 milisecond delay
	});

	//When "Hide Instructions" button clicked. Instructions hide.
	$("#hide").on("click",function()
	{
		$("#instructions-col").slideUp(1000);	//1000 milisecond delay
	});

});//END $(document).ready


// Put Functions down here otherwise cont all

function resetGame(){

	// Makes a copy of 'characters' array.
	currentCharacter = characters.map(function(x){return x;});
	
	//Resets each character objects stats.
	characters.forEach(function(element){
		element.resetStats();
	});

	//NEED CODE IN HERE TO REST DISPLAY.

}


// work on this array may need to be string.
function spliceArray(x){
	
	var index = currentCharacters.indexOf(x);
	currentCharacters.splice(index, 1);

}

