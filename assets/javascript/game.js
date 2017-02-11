/*  Douglas Aquilino       February 11, 2017   */
/*  RCB - "Star Wars RPG" Homework #4           */
/*                game.js                      */


/*		                   NOTES

	fix attack function
	
===============================================*/


// Global Variable Declarations
	var yourCharacter = 0;
	var yourEnemy = 0;
	var enemiesLeft = 3;
	var thisClass = "";
	var chooseCharacterFlag= false;


	// character object constructor 
	function character(health, attack, counterAttack )
	{

		// =============== character properties ==================
		//private
		const HEALTH = health;
		const ATTACK = attack;
		const COUNTERATTACK = counterAttack; 

		//public
		this.currentAttack = attack;
		this.currentHealth = HEALTH;
			
		// =========== character methods =======================

		//DONE!
		// Returns characters COUNTERATTACK
		this.getCounterAttack = function()
		{
			return COUNTERATTACK;
		};//END getCounterAttack

		//DONE!
		// Returns characters ATTACK
		this.getAttack = function()
		{
			return ATTACK;
		};//END getCounterAttack

		//DONE!
		//Resets characters stats
		this.resetStats = function()
		{
			this.currentHealth = HEALTH;
			this.currentAttack = ATTACK;
			
		};//END restGame

		//MOVED OUTSIDE OBJECT - REMOVE
		// You attacks enemy: enemy's health dec. by current attack 
		// Enemy attacks you: your health dec. by enemy's counter attack
		// Your current attack increments.
		this.attack = function(enemy)
		{

			this.decEnemyHealth(enemy);
			
			//check if enemies dies here
			this.decYourHealth(enemy);
			//check if you die here
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
		this.isDead = function()
		{
			if(this.currentHealth <= 0)
			{
				return true;
			}
				return false;
		};//END compare

			
		//Moved out of object. Dont need anymore
		this.battle = function(enemy)  
		{
			this.attack(enemy);
			this.incAttack();
			//more 
			
			//
			if(this.isDead())
			{
				return true;
			}
				return false;
		};

	};//END character constructor

	
	// Create our four characters objects
	//character(health, attack, counterAttack )
	var beastBoy = new character(100,20,25);
	var starfire = new character(200,10,10);
	var robin = new character(150,30,15);
	var raven = new character(120,25,20);
	
	
	// Constant Array containing our four character objects for looping
	const characters = ["beastBoy","starfire","robin","raven"];

//===================================================================
//===================================================================
//===================================================================	

$(document).ready(function()
{ 
	// Assign each characters class its corresponding object.
	$(".beastBoy").data("objectName", beastBoy);
	$(".starfire").data("objectName", starfire);
	$(".robin").data("objectName", robin);
	$(".raven").data("objectName", raven);
	
	//Called to display characters health.
	displayHealth();
	
	// Event Hander 
	$(".character").on("click", function()
	{	
		//Gets last given class of character
		thisClass = $(this).attr('class').split(' ').pop();

		// If your character is not yet chosen.
		if(!chooseCharacterFlag)
		{
			//Assigns yourCharacter object associated with character class
		 	yourCharacter = $("." + thisClass).data("objectName");
		 	
		 	chooseCharacter(this);
		 	hideYourCharacter(thisClass);
		 	$("#enemies").css("display","inherit");
		 	return;
		}

			 
		if(($(this).attr("class").indexOf("enemy")) < 0)
		{
			alert("Please click on an enemy");
		 	return;
		}

		//Assigns yourEnemy object associated with character class
		yourEnemy = $("." + thisClass).data("objectName");

		//Removes selected enemy from enemy choices 
		$("#enemies >." + thisClass).css("display", "none");
		
		//Displays Fight Arena.
		$("#arena").css("display", "inherit");
		$("#arena >." + thisClass).css("display", "inherit");

		//Reveals "Attack" button and attack panel
		$("#attack-button").css("display", "inherit");
		$("#attack-panel").html("PRESS ATTACK!!!") ;
		$("#attack-panel").css("display", "inherit");



	});//END .on("click")

	$("#attack-button").on("click", function(){
		attack();
	});

	$("#play-again-button").on("click", function()
	{
		resetGame();
	});

	

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

	
//===================================================================
//===================================================================
//===================================================================	


// Game Functions

//Resets all object, variable, element to original state.
function resetGame()
{
	//Resets each character objects stats.
	characters.forEach(function(element)
	{
		window[element].resetStats();
	});

	//Displays reset health stats.
	displayHealth();

	yourCharacter = 0;
	yourEnemy = 0;
	enemiesLeft = 3;
	var thisClass = "";
	chooseCharacterFlag= false;

	//resets title
	$("#characters-h1").html("Choose A Character");
	
	//"Hides"; setting "display: none" to the following

		//Attach button
		$("#attack-button").css("display", "none");

		//Attack Panel
		$("#attack-panel").css("display", "none");


		//Play Again button 
		$("#play-again-button").css("display", "none");
	
		//Chose an Enemy to Attack
		$("#enemies").css("display", "none");
		
		//Fight Arena
		$("#arena").css("display", "none");
		
		//Characters in Fight Arena
		characters.forEach(function(element)
		{
			$("#arena >." + element).css("display", "none");

		});


	//"Shows"; setting "display: inherit" to the following.
		
		//Characters in Choose a Character
		characters.forEach(function(element)
		{
			$("#characters >." + element).css("display", "inherit");

		});
		
		//Characters in Choose an Enemy
		characters.forEach(function(element)
		{
			$("#enemies >." + element).css("display", "inherit");

		});

}//END restGame()

// May not need.
// work on this array may need to be string.
// function spliceArray(x){
	
// 	var index = currentCharacters.indexOf(x);
// 	currentCharacters.splice(index, 1);

// }


	//Maybe redo this.
	// Hides characters you didn't choose from characters.
	// Changes character heading.
	// Sets chooseCharacterFlat to true.
	function chooseCharacter(characterThis)
	{
		
		$("#characters-h1").html("Your Character");	

		 	for (var i = 1;i<5;i++)
		 	{
		 		if(($(characterThis).attr("id")) != i)
		 		{
		 			var id = "#" + i;
		 			$(id).css("display", "none");
		 		}
		 	}
		 
		chooseCharacterFlag = true;
	}//END chooseCharacter

	// Removes your Character from enemies
	function hideYourCharacter(charClass){

		$("#enemies >." + charClass ).css("display","none");
		$("#arena >." + charClass).css("display","none");
	}//END hideYourCharacter()

	function displayHealth()
	{		
		characters.forEach(function(element){
			
			$("." + element + "-health").html(window[element].currentHealth);
			
		});

	}// END displayHealth()

	
	//Attack function
	function attack()
	{
		//You attack enemy.  
		yourCharacter.decEnemyHealth(yourEnemy);
		{
			displayHealth(); 
						
			$("#attack-panel").html("YOU ATTACKED " + thisClass.toUpperCase() +" FOR " + yourCharacter.currentAttack + " DAMAGE!");
			
			yourCharacter.incAttack();		
			
			// Checks if enemy was killed.			
			if(yourEnemy.isDead())
			{
				enemiesLeft--;
							
				$("#attack-panel").append("<br>You Have Defeated "+ thisClass.toUpperCase() + " !!!") ;
				$("#arena >." + thisClass).css("display","none");
				
				if(enemiesLeft > 0)
				{			
					$("#attack-panel").append("<br>Please Choose Another Enemy!!!") ;
					$("#attack-button").css("display", "none");
					return 0 ;		
				}// END if
				else
				{			
					$("#attack-panel").html("YOU WON!  ALL ENEMIES HAVE BEEN DEFEATED!");
					$("#arena").css("display","none");
					$("#enemies").css("display","none");
					$("#attack-button").css("display", "none");
					$("#play-again-button").css("display", "inherit");
					
					return 0;
				}//END else
			
			}//END if(yourEnemy.isDead())
		
		}//END You Attack Enemy
			

		//Enemy Attacks You.
		yourCharacter.decYourHealth(yourEnemy);
		{
			displayHealth();
			
			$("#attack-panel").append("<br>" + thisClass.toUpperCase() + " ATTACKS YOU FOR " + yourEnemy.getCounterAttack() + " DAMAGE!");	
			
			if(yourCharacter.isDead())
			{			
				$("#attack-panel").html("YOU HAVE BEEN DEFEATED!!!");
				$("#arena").css("display","none");
				$("#enemies").css("display","none");
				$("#attack-button").css("display", "none");
				$("#play-again-button").css("display", "inherit");
				return 0;
			}//END if
		
		}//END Enemy Attacks You
		
	}//END attack();