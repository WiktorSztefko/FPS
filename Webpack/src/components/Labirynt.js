import { Mesh, AxesHelper, PlaneGeometry, MeshPhongMaterial, TextureLoader, RepeatWrapping, FrontSide, BoxGeometry, MeshBasicMaterial, BackSide } from "three";
import Wall from "./Wall"
import Enemy from "./Enemy"
import Ligth from "./Ligth"
import Treasure from "./Treasure"
import floorTexture from "../material/floor.jpg"


export default class Labirynt {

    constructor(scene, level, player) {
        this.scene = scene;
        this.level = level
        this.items = []

        this.itemSize = 100
        this.size = 10
        this.player = player

        this.addAxesHelper()
        this.addPlane()
        this.addItems()
    }
  
    addAxesHelper() {
        this.axes = new AxesHelper(1000)
        this.scene.add(this.axes)
    }

    addPlane() {
        this.geometry = new PlaneGeometry(2000, 2000, 1);
        this.geometry.rotateX(-Math.PI * 0.5);

        this.texture = new TextureLoader().load(floorTexture)
        this.texture.wrapS = RepeatWrapping;
        this.texture.wrapT = RepeatWrapping;
        this.texture.repeat.set(10, 10);

        this.material = new MeshPhongMaterial({ map: this.texture, side: FrontSide });
        this.plane = new Mesh(this.geometry, this.material);
        this.plane.position.set(0, 0, 0)
        this.plane.receiveShadow = true
        this.scene.add(this.plane)

        this.geometry = new PlaneGeometry(1000, 1000, 1);
        this.geometry.rotateX(Math.PI * 0.5);

        this.texture = new TextureLoader().load(floorTexture)
        this.texture.wrapS = RepeatWrapping;
        this.texture.wrapT = RepeatWrapping;
        this.texture.repeat.set(10, 10);

        this.material = new MeshPhongMaterial({ map: this.texture });
        this.sufit = new Mesh(this.geometry, this.material);
        this.sufit.position.set(0, 100, 0)
        this.scene.add(this.sufit)
    }

    addItems() {
        this.level.forEach(item => {
            item.z = item.z - 5
            item.z += 1 / 2
            item.x = item.x - 5
            item.x += 1 / 2

            switch (item.type) {
                case "wall": this.items.push(new Wall(this.scene, item.x, item.z, this.itemSize)); break;
                case "enemy": this.items.push(new Enemy(this.scene, item.x, item.z, this.itemSize, this.player)); break;
                case "treasure": this.items.push(new Treasure(this.scene, item.x, item.z, this.itemSize)); break;
                case "ligth": this.items.push(new Ligth(this.scene, item.x, item.z, this.itemSize)); break;
            }
        })
    }
    update(delta, player) {

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].update(delta, player)
        }
    }
}
