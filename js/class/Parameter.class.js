'use strict';

var ControlParas = function() {
	this.mouseLock			=	true; 
	this.useComposer		=	true; 
}

var SurusPara = function() {
	this.posX		=	0.0; 
	this.posY		=	14.5;
	this.posZ		=	2.0; 
	this.fileName	=	'./models/springer.sea';
	this.meshName	=	'elephant';
	this.initRot	=	0; 
	this.crossFade	=	0.5; 
}

var PeasantPara = function() {
	this.fileName	=	'./models/peasant.sea';
}

var FactoryPara = function() {
	this.fileName	=	'./models/factory.sea'; 
}

var GarbagePara = function() {
	this.count = 4; 
	this.fileNames	=	['./models/garbage0.sea', './models/garbage1.sea', './models/garbage2.sea', './models/garbage3.sea']; 
}

var CameraPara = function() {
	this.posX	 	=   0.0; 
	this.posY	 	= 	26.0; 
	this.posZ	 	= 	0.0; 
	this.theta		=	-Math.PI/2; 
}

var CanvasPara = function() {
	this.container	=	'gl'; 
}

var RenderPara = function() {
	this.postprocessing = false; 
}

var SkyPara = function() {
	this.radius			=	2000; 
	this.widthSegments	=	8; 
	this.heightSegments	=	8; 
	this.texFile		=	'images/cloudsphere.jpg'; 
}

var Parameters = function() {
	this.debugMode = true; 
	this.control = new ControlParas(); 
	this.surus = new SurusPara(); 
	this.camera = new CameraPara(); 
	this.canvas = new CanvasPara(); 
	this.render = new RenderPara();
	this.sky = new SkyPara(); 
	this.factory = new FactoryPara(); 
	this.peasant = new PeasantPara(); 
	this.garbage = new GarbagePara(); 
}

var Paras = new Parameters(); 