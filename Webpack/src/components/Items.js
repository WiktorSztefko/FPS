import { BoxGeometry, MeshBasicMaterial, Mesh, MeshPhongMaterial, PointLight, TextureLoader, AnimationMixer, DoubleSide, Vector3 } from "three";
import GUI from "./GUI"
import model from "./assets/enemy/tris.md2"
import wallTexture from "../material/wall.jpg"
import Meshes from "./MeshLoader";
import Fireplace from "./Fireplace"
import {walls, enemys} from "./tabs"
import LaserEnemy from "./LaserEnemy"

export class Treasure {

    constructor(scene, x, z, itemSize) {
        this.scene = scene;
        this.geometry = new BoxGeometry(100, 100, 100);
        this.material = new MeshBasicMaterial({ color: 0x0000ff });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(x * itemSize, 50, z * itemSize)
        this.scene.add(this.mesh)
    }
    update() {
        if (GUI.options.shadow.checked) {
            if (this.mesh.castShadow == false) {
                this.mesh.castShadow = true
            }
        }
        else {
            if (this.mesh.castShadow == true) {
                this.mesh.castShadow = false
            }
        }
    }
}