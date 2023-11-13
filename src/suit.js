import * as BABYLON from 'babylonjs';

import "babylon-vrm-loader";

export function initSuit(scene) {
    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "YuruDoriSuit_Version_Kawasemi.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        for (var i = 0; i < newMeshes.length; i++) {
            newMeshes[i].position.x = 1.5;
            newMeshes[i].position.z = 15;
            newMeshes[i].position.y = 1.0;
        }

        var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(1, 2, 15), new BABYLON.Vector3(1, -1, 0), Math.PI / 2, 5, scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    });
}
