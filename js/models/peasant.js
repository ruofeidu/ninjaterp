'use strict';
/**
 * Lamberman initialization
 * @author Ruofei Du
 */
function initPeasant() {
	peasant = new THREE.SEA3D({
		autoPlay : false, 	// Auto play animations
		container : scene	// Container to add models
	});
	
	peasant.ready = false; 
	peasant.isBuilding = false; 
	peasant.isWorking = false; 
	peasant.isDestroyed = true; 
	peasant.radius = 0.0; 
	peasant.degree = 0.0; 
	peasant.initPos = []; 
	peasant.sid = 1; 
	
	/**
	 * Build a model of lamberman
	 */
	peasant.build = function(R, theta) {
		if (game.isOver) return; 
		if (R === undefined) R = Math.random() * 80 + 100;
		if (theta === undefined) theta = Math.random() * Math.PI * 2; 
		
		peasant.radius = R; 
		peasant.degree = theta; 
		peasant.isBuilding = true; 
		peasant.isWorking = true; 
		peasant.isDestroyed = false; 
		for (var i = 0; i < peasant.meshes.length; i++) {
			if (peasant.meshes[i].position) {
				peasant.meshes[i].position.copy(peasant.initPos[i]); 
				peasant.meshes[i].visible = true; 
			}
		}		
		for (var i = 0; i < peasant.meshes.length; i++) {
			if (peasant.meshes[i].position) {
				peasant.meshes[i].position.multiplyScalar ( 20 ); 
				peasant.meshes[i].translateX(R * Math.cos(theta)); 
				peasant.meshes[i].translateY(10.0); 
				peasant.meshes[i].translateZ(R * Math.sin(theta)); 
				peasant.meshes[i].scale.set(20, 20, 20); 
			}
		}
		peasant.work();
	}
	
	/**
	 * Build in front of the camera
	 */
	peasant.buildInFront = function(delta) {
		if (delta === undefined) delta = 0; 
		peasant.build(100.0, surus.getOrientation() + delta);
	}
	
	/**
	 * Private: hide the peasant
	 */
	peasant.hide = function() {
		for (var i = 0; i < peasant.meshes.length; i++) {
			if (peasant.meshes[i].position) {
				peasant.meshes[i].visible = false; 
			}
		}	
		if (audio.axe.isPlaying) audio.axe.stop(); 
	}
	
	/**
	 * Vanish the peasant and re-spawn
	 */
	peasant.vanish = function() {
		peasant.hide(); 
		if (game.tutorialStep === -1) setTimeout(function(){ peasant.build(); }, Paras.peasant.spawnTime);
	}
	
	/**
	 * Die the peasant
	 */
	peasant.die = function() {
		peasant.isBuilding = false; 
		peasant.isWorking = false; 
		peasant.isDestroyed = true; 
		if (audio.axe.isPlaying) audio.axe.stop(); 
		if (!audio.die.isPlaying) audio.die.play();
		
		for (var i = 0; i < peasant.meshes.length; i++) {
			if (peasant.meshes[i].animations[1]) {
				peasant.meshes[i].animations[1].reset();
				peasant.meshes[i].animations[1].stop();
			}
		}
		
		for (var i = 0; i < peasant.meshes.length; i++) {
			if (peasant.meshes[i].animations[2]) {
				peasant.meshes[i].animations[2].reset();
				peasant.meshes[i].animations[2].play();
			}
		}
		setTimeout(function(){ starBlink(1, peasant.meshes[0].position); peasant.vanish(); }, Paras.peasant.dieTime);
		if (game.tutorialStep !== -1) game.tutorial(); 
	}
	
	peasant.isLeft = function() {
		var d1 = Math.abs( peasant.degree - surus.getOrientation() + Math.PI * 2); 
		while (d1 >= Math.PI * 2) d1 -= Math.PI * 2; 
		var d2 = Math.abs( surus.getOrientation() - peasant.degree + Math.PI * 2); 
		while (d2 >= Math.PI * 2) d2 -= Math.PI * 2; 
		return d1 > d2; 
	}
	
	/**
	 * Play cutting tree animation
	 */
	peasant.work = function() {
		if (game.isOver) return; 
		peasant.isBuilding = false; 
		peasant.isWorking = true; 
		peasant.isDestroyed = false; 
		if (!audio.axe.isPlaying) audio.axe.play();
		
		for (var i = 0; i < peasant.meshes.length; i++) {
			if (peasant.meshes[i].animations[2]) {
				peasant.meshes[i].animations[2].reset();
				peasant.meshes[i].animations[2].stop();
			}
		}
		
		for (var i = 0; i < peasant.meshes.length; i++) {
			if (peasant.meshes[i].animations[1]) {
				peasant.meshes[i].animations[1].reset();
				peasant.meshes[i].animations[1].play();
			}
		}
	}
	
	/**
	 * When the model is loaded
	 */
	peasant.onComplete = function( e ) {
		for (var i = 0; i < peasant.meshes.length; i++) {
			var vec = new THREE.Vector3(); 
			vec.copy(peasant.meshes[i].position); 
			peasant.initPos.push( vec );
		}
		peasant.meshes[0].add(audio.axe);
		peasant.meshes[1].add(audio.die);
		console.log( "peasant loading:", peasant.file.timer.elapsedTime + "ms" );
		checkLoading(); 
	};
	
	peasant.load( Paras.peasant.fileName );
}
