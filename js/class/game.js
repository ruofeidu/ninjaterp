'use strict';
/**
 * Global game manager
 * Author: Ruofei Du
 */
var game = {
	started		:	false,
	tutorial	:	false,
	isOver		: 	false,
	godmode		:	false,
	stopAudio	:	false,
	startTime	:	0,
	totalTime	:	63,
	timeLeft	:	63,
	tutorialStep : -1,
}

/**
 * Show the tutorial of the game
 */
game.tutorial = function() {
	console.log('game tutorial');
	if (game.tutorialStep === -1) {
		audio.tutorial.play(); 
		game.tutorialStep = 0; 
		instruction.showIns(); 
	} else
	if (game.tutorialStep === 0) {
		setTimeout(function(){ 
			instruction.showWind(); 
		}, 1500);
		setTimeout(function(){ 
			game.tutorialStep = 1; 
			garbage.buildInFront(); 
		}, 2500);
	} else
	if (game.tutorialStep === 1) {
		setTimeout(function(){ 
			instruction.showWater(); 
		}, 1500);
		setTimeout(function(){ 
			game.tutorialStep = 2; 
			peasant.buildInFront(30.0 / 180.0 * Math.PI);  
		}, 2500);
	} else 
	if (game.tutorialStep === 2) {
		setTimeout(function(){ 
			instruction.showFire(); 
		}, 1500);
		
		setTimeout(function(){ 
			game.tutorialStep = 3; 
			factory.buildInFront(180.0 / 180.0 * Math.PI);  
		}, 2500);
	} else {
		setTimeout(function(){ 
			game.tutorialStep = -1; 
			game.start();   
		}, 3500);
	}
}

/**
 * Start the game, yeah!
 */
game.start = function() {
	game.tutorialStep = -1; 
	game.startTime	= 	+new Date(); 
	game.timeLeft 	=	game.totalTime;
	game.isOver		=	false; 
	setTimeout(function(){ garbage.build(); }, Paras.garbage.initTime);
	setTimeout(function(){ peasant.buildInFront() }, Paras.peasant.initTime);
	setTimeout(function(){ factory.buildInFront() }, Paras.factory.initTime);
	if (!audio.tutorial.paused) {
		audio.tutorial.pause(); 
		audio.tutorial.currentTime = 0; 
	}
	audio.bgm.play(); 
	game.started = true; 
	//surus.initPosition(); 
	surus.cheering = false; 
	surus.curState = SURUS_IDLE; 
	score.mesh.visible = false; 
	tto.play(); 
}

/**
 * Update the game in the render loop
 */
game.update = function() {
	if (!game.started) return; 
	var curTime = +new Date(); 
	game.timeLeft = game.totalTime - Math.floor( (curTime - game.startTime) / 1000 ); 
	if (game.timeLeft <= 0) {
		game.over();
	}
}

/**
 * End the game, close all audio and visual, cheers()!
 */
game.over = function() {
	if (game.isOver) return; 
	game.isOver = true; 
	game.stopAudio = true;
	factory.hide();
	peasant.hide(); 
	garbage.hideAll(); 
	
	surus.cheer(); 
	score.show(); 
}
