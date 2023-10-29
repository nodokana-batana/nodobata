import * as BABYLON from 'babylonjs';
import { initCamera, updateCamera} from "./camera.js";
import { initMonado } from "./monado.js"
//import { initCathedoral } from "./cathedoral.js"

var camera;
var camera_speed = 0.005;
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

var createScene = function(){
    console.log("createScene");
    var scene = new BABYLON.Scene(engine);
    camera = initCamera(scene, canvas);
    
    initMonado(scene); 
    //initCathedoral(scene);
    //BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "monado.babylon", scene, function (newMeshes) {
    //    // Set the target of the camera to the first imported mesh
    //    newMeshes[0].position.x = 1.5;
    //    newMeshes[0].position.z = 15;
    //    newMeshes[0].position.y = 1.0;

    //    newMeshes[0].rotation.z = 1.57;

    //    newMeshes[0].scaling.x = 0.10;
    //    newMeshes[0].scaling.y = 0.10;
    //    newMeshes[0].scaling.z = 0.10;
    //    var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(1, 2, 15), new BABYLON.Vector3(1, -1, 0), Math.PI / 2, 5, scene);
    //    light.diffuse = new BABYLON.Color3(1, 1, 1);
    //    light.specular = new BABYLON.Color3(1, 1, 1);
    //});

    const mats = [];
    const planes = [];
    for (var i = 0; i < 40; i++) {
        var mat = new BABYLON.StandardMaterial("");
	    //mat.diffuseTexture = new BABYLON.Texture("../images/low/600px_favorite-"+i+".JPG");
	    mat.emissiveTexture = new BABYLON.Texture("../images/low/600px_favorite-"+i+".JPG");
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
                plane.position.y = 1.75;
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
                plane.position.y = 1.75;
                plane.position.z = (i-3) / 4;
                plane.position.x = -1.5;
                plane.rotation.y = -1.57;
            }
        }
    }

    var floor = BABYLON.MeshBuilder.CreatePlane("floor", {height:36, width: 10});
    floor.rotation.x = 1.57;
    floor.position.z = 16;
    var ceiling = BABYLON.MeshBuilder.CreatePlane("ceiling", {height:36, width: 10});
    ceiling.rotation.x = -1.57;
    ceiling.position.y = 3.0;
    ceiling.position.z = 16;
    
    var right_wall = BABYLON.MeshBuilder.CreatePlane("right_wall", {height:10, width: 36});
    right_wall.rotation.y = 1.57;
    right_wall.position.x = 2.0;
    right_wall.position.y = 1.5;
    right_wall.position.z = 16;

    var left_wall = BABYLON.MeshBuilder.CreatePlane("left_wall", {height:10, width: 36});
    left_wall.rotation.y = -1.57;
    left_wall.position.x = -2.0;
    left_wall.position.y = 1.5;
    left_wall.position.z = 16;

    var front_wall = BABYLON.MeshBuilder.CreatePlane("front_wall", {height:10, width: 5});
    front_wall.rotation.y = -3.141592653589;
    front_wall.position.y = 1.5;
    front_wall.position.z = -2;

    var back_wall = BABYLON.MeshBuilder.CreatePlane("back_wall", {height:10, width: 5});
    back_wall.position.y = 1.5;
    back_wall.position.z = 32;


    var floor_mat = new BABYLON.StandardMaterial("");
    floor_mat.emissiveColor = new BABYLON.Color3(0.4,0.38,0.33);
    floor.material = floor_mat;
    var ceiling_mat = new BABYLON.StandardMaterial("");
    ceiling_mat.emissiveColor = new BABYLON.Color3(0.47,0.45,0.43);
    ceiling.material = ceiling_mat;
    var side_wall_mat = new BABYLON.StandardMaterial("");
    side_wall_mat.emissiveColor = new BABYLON.Color3(0.6,0.65,0.4);
    right_wall.material = side_wall_mat;
    left_wall.material = side_wall_mat;

    var door_mat = new BABYLON.StandardMaterial("");
    door_mat.emissiveColor = new BABYLON.Color3(0.28,0.25,0.15);
    front_wall.material = door_mat;
    back_wall.material = door_mat;
    
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
