import * as BABYLON from 'babylonjs';

export function initCage(scene) {
    	// Skybox
            // ブルームの設定
    var pipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene);
    pipeline.bloomEnabled = true;
    pipeline.bloomWeight = 0.9; // ブルームの強さを調整

    //const light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    var mat = new BABYLON.StandardMaterial("");
    mat.diffuseColor = new BABYLON.Color3(0.52,0.52,0.55);
	mat.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    
    var mat2 = new BABYLON.StandardMaterial("");
    mat2.emissiveColor = new BABYLON.Color3(0.25,0.2,0.95);

    var mat3 = new BABYLON.StandardMaterial("");
    mat3.emissiveColor = new BABYLON.Color3(0.45,0.3,0.99);
    var cage_length = 3.5;

    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "picture_cage.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        for (var i = 0; i < 1; i++) {
            newMeshes[i].position.x = -1.48;
            newMeshes[i].position.y = 0.15;
            newMeshes[i].position.z = cage_length+1.05;
            newMeshes[i].rotation.y = 1.57;

            newMeshes[i].scaling.x = cage_length;
            newMeshes[i].scaling.y = 0.65;
            newMeshes[i].scaling.z = 0.5;
        }
        newMeshes[0].material = mat;
        newMeshes[1].material = mat2;
    });

    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "picture_cage.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        for (var i = 0; i < 1; i++) {
            newMeshes[i].position.x = 1.48;
            newMeshes[i].position.y = 0.15;
            newMeshes[i].position.z = cage_length+1.05;
            newMeshes[i].rotation.y = -1.57;

            newMeshes[i].scaling.x = cage_length;
            newMeshes[i].scaling.y = 0.65;
            newMeshes[i].scaling.z = 0.5;
        }
        newMeshes[0].material = mat;
        newMeshes[1].material = mat2;
    });

    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "picture_cage_pillar.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        for (var i = 0; i < 1; i++) {
            newMeshes[i].position.x = 1.48;
            newMeshes[i].position.y = 0.15;
            newMeshes[i].position.z = cage_length*2+2.65;
            newMeshes[i].rotation.y = -1.57;

            newMeshes[i].scaling.x = 0.5;
            newMeshes[i].scaling.y = 0.65;
            newMeshes[i].scaling.z = 0.5;
        }
        newMeshes[0].material = mat;
        newMeshes[1].material = mat3;
    });

    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "picture_cage_pillar.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        for (var i = 0; i < 1; i++) {
            newMeshes[i].position.x = -1.48;
            newMeshes[i].position.y = 0.15;
            newMeshes[i].position.z = cage_length*2+2.65;
            newMeshes[i].rotation.y = -1.57;

            newMeshes[i].scaling.x = 0.5;
            newMeshes[i].scaling.y = 0.65;
            newMeshes[i].scaling.z = 0.5;
        }
        newMeshes[0].material = mat;
        newMeshes[1].material = mat3;
    });

    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "mecha_01.babylon", scene, function (newMeshes) {
        newMeshes[1].position.x = -2.78;
        newMeshes[1].position.y = 0.4;
        newMeshes[1].position.z = 11.5;
        newMeshes[1].rotation.y = 1.57;
        newMeshes[1].scaling.x = 1.15;
        newMeshes[1].scaling.y = 1.15;
        newMeshes[1].scaling.z = 1.15;
        // Set the target of the camera to the first imported mesh
        for (var i = 0; i < newMeshes.length; i++) {
            if (i != 5 && i != 9) {
                newMeshes[i].material = mat;
            }
        }
    });


}
