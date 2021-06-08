import { BoxGeometry, MeshBasicMaterial, Mesh, AnimationMixer, DoubleSide, Vector3 } from "three";
import GUI from "./GUI"
import model from "./assets/enemy/tris.md2"
import Meshes from "./MeshLoader";
import { enemys } from "./tabs"
import LaserEnemy from "./LaserEnemy"
import Scores from './Scores';

export default class Enemy {

    constructor(scene, x, z, itemSize, player) {
        this.scene = scene;
        this.mesh = null;
        this.player = player
        this.geometry = null
        this.x = x
        this.z = z
        this.itemSize = itemSize
        this.geometry = new BoxGeometry(50, 60, 50);
        this.material = new MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0,
            wireframe: false,
            transparent: true,
            side: DoubleSide,
        });
        this.laser = new LaserEnemy(this.scene)
        this.isKilled = false
        this.init()
        this.load(model)
    }

    init() {
        this.div=Scores.createEnemyDiv()
        document.getElementById("enemyContainer").appendChild(this.div)
    }
    load() {

        this.obj = new Mesh(this.geometry, this.material);
        this.obj.attack = false

        this.obj.health = 6
        this.obj.damage = 0

        this.obj.position.set(this.x * this.itemSize, 28, this.z * this.itemSize)

        this.obj.onCollision = () => {
            if (this.obj.attack == false) {
                this.mixer.stopAllAction()
                this.mixer.uncacheRoot(this.mesh)

                this.action = this.mixer.clipAction("attack")
                this.action.play()

                this.obj.attack = true
            }
        }

        this.obj.offCollision = () => {
            if (this.obj.attack == true) {
                this.mixer.stopAllAction()
                this.mixer.uncacheRoot(this.mesh)
                this.mixer.clipAction("stand").play()

                this.laser.remove()

                this.obj.attack = false
            }
        }

        this.obj.onLostHealth = () => {
            this.updateHealth()
        }

        this.mesh = Meshes.meshEnemy.clone()
        this.mesh.position.set(this.x * this.itemSize, 28, this.z * this.itemSize)
        this.mixer = new AnimationMixer(this.mesh);
        this.mixer.uncacheRoot(this.mesh)
        this.mixer.clipAction("stand").play()

        this.scene.add(this.obj)
        this.obj.add(this.mesh)
        enemys.push(this.obj)
        this.scene.add(this.mesh);
    }

    updateHealth() {
        this.div.removeChild(this.div.lastElementChild)
        if (this.obj.health == 0) {
            this.enemyDeath()
        }
    }
    enemyDeath() {
        var material = new MeshBasicMaterial({
            color: 0x000000,
        });

        this.mesh.material = material
        this.laser.remove()
        this.div.textContent = "Wróg nie żyje"
        this.div.style.display = "block"
        this.isKilled = true
       if( this.player.killedEnemy==null){
           this.player.killedEnemy=1
       }
        else{
            this.player.killedEnemy++
        }
       
    }

    unload() {
        this.scene.remove(this.mesh)
    }

    update(delta) {
        if (this.isKilled == false) {
            if (this.player.mesh) {
                let vect = this.player.mesh.position.clone()
                vect.y = this.mesh.position.y
                this.mesh.lookAt(vect)
                this.mesh.rotateY(-Math.PI / 2)
            }
            if (this.obj.attack) {
                this.laser.mesh.visible = true
                let dir = new Vector3(0, 0, 1)
                dir.transformDirection(this.mesh.matrixWorld)
                this.laser.update(this.mesh.position, dir)
                this.player.damage++
                if (this.player.damage == 100 && this.player.health != 0) {
                    this.player.damage = 0
                    this.player.health--
                    Scores.updateHealth(this.player.ammo)
                }
            }

            if (this.player.mesh && this.player.mesh.position.distanceTo(this.mesh.position) < 100 && this.obj.attack == false) {
                this.mixer.stopAllAction()
                this.mixer.uncacheRoot(this.mesh)

                this.action = this.mixer.clipAction("attack")
                this.action.play()
                this.obj.attack = true
            }

            if (this.player.mesh && this.player.mesh.position.distanceTo(this.mesh.position) > 100 && this.obj.attack == true) {
                this.mixer.stopAllAction()
                this.mixer.uncacheRoot(this.mesh)
                this.mixer.clipAction("stand").play()

                this.laser.remove()

                this.obj.attack = false
            }

            if (this.mixer) {
                this.mixer.update(delta)
            }
        }

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