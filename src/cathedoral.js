//import * as BABYLON from 'babylonjs';
//
//export function initCathedoral(scene) {
//    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "cathedoral.babylon", scene, function (newMeshes) {
//        // Set the target of the camera to the first imported mesh
//        newMeshes[0].position.x = -1.3;
//        newMeshes[0].position.z = 12;
//        newMeshes[0].position.y = 0.7;
//        newMeshes[0].rotation.x = 3.141592;
//        newMeshes[0].rotation.y = 3.141592;
//
//        for (var i = 0; i < newMeshes.length; i++) {
//            newMeshes[0].scaling.x = 0.025;
//            newMeshes[0].scaling.y = 0.04;
//            newMeshes[0].scaling.z = 0.004;
//        }
//
//        var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-0.5, 0.73, 12), new BABYLON.Vector3(-1, -0.1, 0), Math.PI / 2, 1, scene);
//        light.diffuse = new BABYLON.Color3(1, 1, 1);
//        light.specular = new BABYLON.Color3(1, 1, 1);
//    });
//}
