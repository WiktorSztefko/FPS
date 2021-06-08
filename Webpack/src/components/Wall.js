import { BoxGeometry, Mesh, MeshPhongMaterial, TextureLoader} from "three";
import GUI from "./GUI"
import wallTexture from "../material/wall.jpg"
import {walls} from "./tabs"
export default class Wall {
    constructor(scene, x, z, itemSize) {
        this.scene = scene;
        this.geometry = new BoxGeometry(100, 100, 100);
        this.material = new MeshPhongMaterial({
            map: new TextureLoader().load(wallTexture),
        });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true
        this.mesh.position.set(x * itemSize, 50, z * itemSize)
        this.scene.add(this.mesh)
        walls.push(this.mesh)
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