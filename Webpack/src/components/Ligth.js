import {PointLight } from "three";
import GUI from "./GUI"
import Fireplace from "./Fireplace"

export default class Ligth {

    constructor(scene, x, z, itemSize) {
        this.scene = scene;
        // this.geometry = new SphereGeometry(5, 10, 10);
        // this.material = new MeshBasicMaterial({ color: 0xfeff00, wireframe: true });
        // this.mesh = new Mesh(this.geometry, this.material);
        // this.mesh.position.set(x * itemSize, 40, z * itemSize)
        // this.scene.add(this.mesh)

        this.light = new PointLight(0xeffffff, GUI.options.ligthIntensity.value, 600);
        this.light.position.set(x * itemSize, 40, z * itemSize);
        scene.add(this.light);

        this.fire = new Fireplace()
        this.fire.position.set(x * itemSize, 30, z * itemSize)
        this.scene.add(this.fire)
    }
    update() {
        this.light.intensity = GUI.options.ligthIntensity.value
        this.fire.update()

        if (GUI.options.shadow.checked) {
            if (this.light.castShadow == false) {
                this.light.castShadow = true
            }
        }
        else {
            if (this.light.castShadow == true) {
                this.light.castShadow = false
            }

        }
    }
}