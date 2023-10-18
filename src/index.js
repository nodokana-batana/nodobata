import * as BABYLON from 'babylonjs';

var camera;
var camera_speed = 0.005;
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
var createScene = function(){
    var scene = new BABYLON.Scene(engine);
    camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0.5, 0), scene);
    camera.setTarget(new BABYLON.Vector3(0,0.5,1));
    camera.minZ = 0.03;
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
    if (Math.abs(camera.rotation.y) > 2.641592) {
        camera.position.z += -0.01;
    } else if (Math.abs(camera.rotation.y) < 0.5){
        camera.position.z += +0.01;
    }
    if (camera.position.z < -2) {
        camera.position.z = 33;
    } else if (camera.position.z > 33.5) {
        camera.position.z = -1.5;
    }

});

window.addEventListener('resize', function(){
    engine.resize();
});
