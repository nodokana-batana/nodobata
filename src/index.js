import * as BABYLON from 'babylonjs';
import { initCamera, updateCamera} from "./camera.js";
import { initMonado } from "./monado.js"
import { initCage } from "./cage.js"

var camera;
var camera_speed = 0.005;
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

import "babylon-vrm-loader";

// Create a scene.
var scene = new BABYLON.Scene(engine);

var createScene = function(){
    console.log("createScene");
    var scene = new BABYLON.Scene(engine);
    camera = initCamera(scene, canvas);
    
    initMonado(scene); 
    initCage(scene); 

    const mats = [];
    const planes = [];
    for (var i = 0; i < 40; i++) {
        var mat = new BABYLON.StandardMaterial("");
	    //mat.diffuseTexture = new BABYLON.Texture("../images/low/600px_favorite-"+i+".JPG");
	    mat.diffuseTexture = new BABYLON.Texture("../images/low/600px_favorite-"+i+".JPG");
        mat.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
        mats.push(mat);
        var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:0.75, width: 1});
        plane.material = mat;
        planes.push(plane);
        if (i % 2 == 0) { 
            if (i % 4 == 0) {
                plane.position.y = 0.75;
                plane.position.z = i / 4;
                plane.position.x = 1.5;
                plane.rotation.y = 1.57;
            } else {
                plane.position.y = 1.6;
                plane.position.z = (i - 2)/ 4;
                plane.position.x = 1.5;
                plane.rotation.y = 1.57;
            }
        } else {
            if (i % 4 == 1) {
                plane.position.y = 0.75;
                plane.position.z = (i-1) / 4;
                plane.position.x = -1.5;
                plane.rotation.y = -1.57;
            } else {
                plane.position.y = 1.6;
                plane.position.z = (i-3) / 4;
                plane.position.x = -1.5;
                plane.rotation.y = -1.57;
            }
        }
    }

    var floor = BABYLON.MeshBuilder.CreatePlane("floor", {height:36, width: 10});
    floor.rotation.x = 1.57;
    floor.position.z = 16;

    var floor_mat = new BABYLON.StandardMaterial("");
    floor_mat.diffuseColor = new BABYLON.Color3(0.4,0.38,0.33);
    floor.material = floor_mat;
    
    return scene;

}

var scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
    updateCamera(camera);
});

window.addEventListener('resize', function(){
    engine.resize();
});
