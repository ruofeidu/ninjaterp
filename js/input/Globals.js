'use strict';
// Three.js
var container, stats, camera, scene, renderer, composer, controls, manager;

var g_loadedItems = 0, objects = [], trees = [];
var surus, ground, peasant, factory, garbage, debugBall;
var water = {}, fire = {}, wind = {};
var audio = {}, game = {};

// shaderToy
var isMouseDown = false, mousePos = {x:0, y:0, z:0, w:0};
var startTime = new Date() / 1000;
var clock = new THREE.Clock();