import * as BABYLON from 'babylonjs';

export function initCamera(scene, canvas) {
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1.2, 0), scene);
    camera.setTarget(new BABYLON.Vector3(0,1.2,1));
    camera.minZ = 0.03;
    camera.attachControl(canvas, false);
    return camera;
}

export function updateCamera(camera) {
    while (camera.rotation.y > 3.14) {
        camera.rotation.y -= 3.14 * 2
    }
    while (camera.rotation.y < -3.14) {
        camera.rotation.y += 3.14 * 2
    }

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
}
