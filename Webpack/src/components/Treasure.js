import { BoxGeometry, MeshPhongMaterial, Mesh, TextureLoader,MeshBasicMaterial } from "three";
import GUI from "./GUI"
import woodTexture from "../material/wood.jpg"
import goldTexture from "../material/gold.jpg"

export default class Treasure {
    constructor(scene, x, z, itemSize) {
        this.scene = scene;
        this.geometry = new BoxGeometry(25, 25, 25);
 

         this.material = []

        this.material.push(new MeshBasicMaterial({ map: new TextureLoader().load(woodTexture) })); //prawa
        this.material.push(new MeshPhongMaterial({ map: new TextureLoader().load(woodTexture) })); //lewa
        this.material.push(new MeshPhongMaterial({ map: new TextureLoader().load(goldTexture) })); //top
        this.material.push(new MeshPhongMaterial({ map: new TextureLoader().load(woodTexture) })); //bottom
        this.material.push(new MeshPhongMaterial({ map: new TextureLoader().load(woodTexture) })); //front
        this.material.push(new MeshPhongMaterial({ map: new TextureLoader().load(woodTexture) })); //back

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(x * itemSize, 12.5, z * itemSize)
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