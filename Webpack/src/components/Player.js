import { Mesh, TextureLoader, MeshBasicMaterial} from "three"
import tex from "./assets/player/tekstura.png"
import { MD2Loader } from './MD2Loader';
import GUI from "./GUI"


export default class Model {
    constructor(scene, manager) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
        this.health=10
        this.ammo=20
        this.useAmmo=0
        this.damage=0
        this.killedEnemy=null
       
    }

    load(path) {
        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshBasicMaterial({
                    map: new TextureLoader().load(tex), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))

                this.mesh.position.set(350, 25, 600)
                this.mesh.rotation.y = Math.PI / 2
                this.scene.add(this.mesh);
            },
        );
    }

    unload() {
        this.scene.remove(this.mesh)
    }
    update(){
        if(this.mesh){
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
}