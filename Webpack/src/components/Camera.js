import { PerspectiveCamera, Vector3 } from 'three';

import GUI from "./GUI"

export default class Camera {
    constructor(renderer) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;

        this.threeCamera = new PerspectiveCamera(75, width / height, 0.1, 10000);
        this.threeCamera.position.set(300, 300, 300);
        this.threeCamera.lookAt(new Vector3(0, 0, 0))

        this.updateSize(renderer);
        window.addEventListener('resize', () => this.updateSize(renderer), false);
    }

    updateSize(renderer) {
        this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height;
        this.threeCamera.updateProjectionMatrix();
    }

    update(player) {

        this.threeCamera.fov = GUI.options.cameraFov.value
        this.threeCamera.updateProjectionMatrix()

        if (player.mesh) {
            const camVect = new Vector3(-GUI.options.cameraDistance.value, GUI.options.cameraY.value, 0)
            const camPos = camVect.applyMatrix4(player.mesh.matrixWorld);

            this.threeCamera.position.x = camPos.x
            this.threeCamera.position.y = camPos.y
            this.threeCamera.position.z = camPos.z

            const target = new Vector3(0, parseFloat(GUI.options.cameraVertical.value), parseFloat(GUI.options.cameraHorizontal.value))
            target.applyMatrix4(player.mesh.matrixWorld)
            this.threeCamera.lookAt(target)
        }

        if (GUI.options.topView.checked) {
            this.threeCamera.position.set(0, 1200, 0)
            this.threeCamera.lookAt(new Vector3(0, 0, 0))
        }
    }
}