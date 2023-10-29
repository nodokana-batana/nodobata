import * as BABYLON from 'babylonjs';

export function initMonado(scene) {
    BABYLON.SceneLoader.ImportMesh("", "3d_assets/", "monado.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        newMeshes[0].position.x = 1.3;
        newMeshes[0].position.z = 12;
        newMeshes[0].position.y = 0.7;

        newMeshes[0].rotation.z = 1.57;

        newMeshes[0].scaling.x = 0.10;
        newMeshes[0].scaling.y = 0.10;
        newMeshes[0].scaling.z = 0.10;

        var mat = new BABYLON.StandardMaterial("");
        mat.diffuseColor = new BABYLON.Color3(0.8,0.38,0.33);
        for (var i = 0; i < 31; i++) {
            if ("material" in newMeshes[i]) {
                if (newMeshes[i].material == null) {
                } else if ("emissiveColor" in newMeshes[i].material) {
                    if (newMeshes[i].material.emissiveColor.r == 0) {
                        newMeshes[i].material = mat;
                    }
                }
            }
        }
        var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0.5, 0.73, 12), new BABYLON.Vector3(1, -0.1, 0), Math.PI / 2, 1, scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    });
}
