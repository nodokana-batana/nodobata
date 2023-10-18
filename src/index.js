import * as BABYLON from 'babylonjs';
//let BABYLON = require('babylonjs');
//let GUI = require('babylonjs-gui');
//let materials = require('babylonjs-materials');
var camera;
var camera_speed = 0.005;
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
var createScene = function(){
    var scene = new BABYLON.Scene(engine);
    camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0.5, 0), scene);
    camera.setTarget(new BABYLON.Vector3(0,0.5,1));
    camera.attachControl(canvas, false);
    //const light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 5, 1), scene);
    //light.intensity = 2;
	
    const mats = [];
    const planes = [];
    for (var i = 0; i < 130; i++) {
        var mat = new BABYLON.StandardMaterial("");
	    //mat.diffuseTexture = new BABYLON.Texture("../images/low/600px_favorite-"+i+".JPG");
	    mat.emissiveTexture = new BABYLON.Texture("../images/low/600px_favorite-"+i+".JPG");
        mats.push(mat);
        var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:1.5, width: 2});
        plane.material = mat;
        planes.push(plane);
        var theta = 3.1415926535 * i / 5;
        plane.position.x = Math.sin(theta) * 3;
        plane.position.z = Math.cos(theta) * 3;
        plane.position.y = (Math.floor(i / 10) - 6)*1.5;
        plane.rotation.y = theta;
    }

    var floor = BABYLON.MeshBuilder.CreatePlane("floor", {height:10, width: 10});
    floor.rotation.x = 1.57;
    var mat = new BABYLON.StandardMaterial("");
    mat.emissiveColor = new BABYLON.Color3(1,1,1);
    floor.material = mat;

    return scene;

}

var scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
    camera.position.y += camera_speed;
    if (camera.position.y > 9 || camera.position.y < -9) {
        camera_speed *= -1;
    }
});

window.addEventListener('resize', function(){
    engine.resize();
});
