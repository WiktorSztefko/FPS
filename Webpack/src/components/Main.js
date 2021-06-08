import { Scene, LoadingManager, Clock, Vector3, } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Labirynt from "./Labirynt"
import Player from "./Player"
import Keyboard from "./Keyboard"
import Animation from "./Animation"
import Config from './Config';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import model from "./assets/player/tris.md2"
import { enemys } from "./tabs"
import Scores from './Scores';

import Laser from "./Laser"
import Collision from "./Collision"

export default class Main {
    constructor(container) {
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);

        this.isLoaded = null
        this.animation = null

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom)

        this.clock = new Clock()

        this.manager = new LoadingManager();
        this.laser = new Laser(this.scene)

        this.manager.onProgress = (item, loaded, total) => {
            //console.log(`progress ${item}: ${loaded} ${total}`);
        };

        this.manager.onLoad = () => {

            this.isLoaded = true;
            //console.log("MODEL LOADED!!!")
            this.animation = new Animation(this.player.mesh)
            this.animation.playAnim("stand")
            this.keyboard = new Keyboard(window, this.animation, this.player.mesh, this.laser);
            Scores.init(this.player)

        };

        this.loadLevel()
    }

    async loadLevel() {
        const headers = { "Content-Type": "application/json" }
        let response = await fetch("http://localhost:5000/load", { method: "POST", headers }) // fetch

        if (!response.ok) {
            //console.log(response.status)
        }
        else {
            let level = await response.json()
            this.player = new Player(this.scene, this.manager);
            this.labirynt = new Labirynt(this.scene, level, this.player)

            this.player.load(model);
            this.render();
        }
    }
    async gameover(text) {
        document.getElementsByTagName("body")[0].innerHTML = ""
        let div = document.createElement("div")
        div.id = "gameover"
        div.textContent = text
        document.getElementsByTagName("body")[0].append(div)

        if (this.player.killedEnemy == null) {
            this.player.killedEnemy = 0
        }

        const body = JSON.stringify({ health: this.player.health, killed: this.player.killedEnemy, ammo: this.player.ammo }) 

        const headers = { "Content-Type": "application/json" }
        let response = await fetch("http://localhost:5000/score", { method: "POST", headers, body })

        if (!response.ok) {
            //console.log(response.status)
        }
        else {
            //console.log("rekord dodany")
        }

        await new Promise((resolve) => setTimeout(resolve, 5000))
        document.getElementsByTagName("body")[0].innerHTML = ""

        location.reload();
    }

    render() {
        if (this.player.mesh) {
            Collision.checkCollision(this.player, this.keyboard)
        }

        this.stats.begin()

        var delta = this.clock.getDelta();

        if (this.animation) this.animation.update(delta)

        if (this.player.mesh) {
            if (Config.rotateLeft) {
                this.player.mesh.rotation.y += 0.05
            }
            if (Config.rotateRight) {
                this.player.mesh.rotation.y -= 0.05
            }
            if (Config.moveForward) {
                this.player.mesh.translateX(3)
            }
            if (Config.movePrevious) {
                this.player.mesh.translateX(-3)
            }
            if (Config.laser && this.player.ammo != 0) {
                this.laser.mesh.visible = true
                let dir = new Vector3(0, 0, 1)
                dir.transformDirection(this.player.mesh.matrixWorld)
                this.laser.update(this.player.mesh.position, dir)

                this.player.useAmmo++
                if (this.player.useAmmo == 100) {
                    this.player.useAmmo = 0
                    this.player.ammo--
                    Scores.updateAmmo(this.player.ammo)
                }
            }
            else {
                this.laser.remove()
            }
        }

        this.stats.end()
        this.renderer.render(this.scene, this.camera.threeCamera);
        this.camera.update(this.player)
        this.labirynt.update(delta, this.player)
        this.player.update()
        this.renderer.render(this.scene, this.camera.threeCamera);

        if (this.player.health == 0) {

            this.gameover("GAME OVER")
        }
        else if (this.player.killedEnemy == enemys.length) {

            this.gameover("LEVEL COMPLETE")
        }
        else {
            requestAnimationFrame(this.render.bind(this));
        }
    }
}