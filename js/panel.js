import * as THREE from 'three';

export function loadBirdPanel(scene) {
    const geometry = new THREE.PlaneGeometry( 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x33aa77, side: THREE.DoubleSide} );
    for (var i = 0; i < 36; i++) {
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI / 2;
        plane.position.x = (i % 6 - 3) * 2;
        plane.position.y = 4.75;
        plane.position.z = (i / 6 - 3) * 2;
        scene.add(plane);
    }

    const image_geometry = new THREE.PlaneGeometry( 0.8*2, 0.45*2 );
    var textureLoader = new THREE.TextureLoader();
    for (var i = 0; i < 13*4+3; i++) {
        var texture = textureLoader.load('images/low/600px_favorite-'+(2*i+1)+'.JPG');
        var image_material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh( image_geometry, image_material );
        plane.position.x = (i % 11 - 5) * 1.65;
        plane.position.y = Math.floor(i / 11) * 0.9 + 0.72;
        plane.position.z = -6;
        scene.add(plane);
    }

}
