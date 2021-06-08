import {BufferAttribute, Points, BufferGeometry, PointsMaterial, TextureLoader, AdditiveBlending, Vector3} from 'three';
import fireTex from "./assets/fire.png"
import GUI from "./GUI"
export default class Laser {
    constructor(scene) {
        this.scene = scene
        this.particlesCount = 20
        this.particlesGeometry = new BufferGeometry()
        this.verticesArray = new Float32Array(this.particlesCount * 3)
        this.particleMaterial = new PointsMaterial({
            color: 0xff7000,
            depthWrite: false,
            transparent: true,
            size: 30,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending
        })

        this.mesh = new Points(this.particlesGeometry, this.particleMaterial)
        this.scene.add(this.mesh)
    }

    update(v1, dir) {
        this.v1 = v1
        this.subV = dir.clone()
        this.subV.multiplyScalar(50)
        const axis = new Vector3(0, 1, 0)
        this.subV.applyAxisAngle(axis, Math.PI / 2)
        this.stepV = this.subV.divideScalar(this.particlesCount)

        for (let i = 0; i < this.verticesArray.length; i += 3) {
            let v2 = this.stepV.clone()
            v2.multiplyScalar(i)
            this.verticesArray[i] = v2.x
            this.verticesArray[i + 1] = 12
            this.verticesArray[i + 2] = v2.z
        }

        this.particleMaterial.size=GUI.options.laserSize.value
        this.particlesGeometry.setAttribute("position", new BufferAttribute(this.verticesArray, 3))
        
        this.mesh.position.copy(v1)
        this.shake()
    }
    remove() {
        this.mesh.visible = false
    }
    shake() {
        let positions = this.particlesGeometry.attributes.position.array
        for (let i = 0; i < this.verticesArray.length; i += 3) {

            let random = Math.random()
            let dir = 0
            if (random > 0.5) {
                dir = 1
            }
            else {
                dir = -1
            }

           positions[i] =i * this.stepV.x  + Math.random() * GUI.options.laserSpread.value *dir
        }
        this.particlesGeometry.attributes.position.array = positions
        this.particlesGeometry.attributes.position.needsUpdate = true
    }
}
