import { Raycaster, Vector3, Ray } from 'three';
import { walls, enemys } from "./tabs"
import Config from './Config';
export default class Collision {

    static checkCollision(player, keyboard) {
        this.raycaster = new Raycaster()
        let dir = new Vector3(1, 0, 0)
        dir.transformDirection(player.mesh.matrixWorld)
        let ray = new Ray(player.mesh.position, dir)

        this.raycaster.ray = ray
        let intersects = this.raycaster.intersectObjects(walls);

        if (intersects.length > 0) {
            if (intersects[0].distance < 30 && Config.moveForward) {
                Config.moveForward = false
            }
            else if (keyboard.current == 87 && intersects[0].distance > 30) {
                Config.moveForward = true
            }
        }

        intersects = this.raycaster.intersectObjects(enemys);

        if (intersects.length > 0) {
            if (intersects[0].distance < 10) {
                Config.moveForward = false
            }

            if (intersects[0].distance < 150 && Config.laser) {
                intersects[0].object.damage++
                if (intersects[0].object.damage == 25 && intersects[0].object.health != 0) {
                    intersects[0].object.damage = 0
                    intersects[0].object.health--
                    intersects[0].object.onLostHealth()
                }
            }
        }

        dir = new Vector3(-1, 0, 0)
        dir.transformDirection(player.mesh.matrixWorld)
        ray = new Ray(player.mesh.position, dir)
        this.raycaster.ray = ray

        intersects = this.raycaster.intersectObjects(walls);
        if (intersects.length > 0) {
            if (intersects[0].distance < 30 && Config.movePrevious) {
                Config.movePrevious = false
            }
            else if (keyboard.current == 40 && intersects[0].distance > 30) {
                Config.movePrevious = true
            }
        }
    }
}