import { Object3D, SpriteMaterial, TextureLoader, AdditiveBlending, PointLight } from "three"
import fireTex from "./assets/fire.png"
import Particle from "./Particle"

export default class Fireplace extends Object3D {

    constructor() {
        super()
        this.particles = []
        this.count = 400
        this.particleMaterial = new SpriteMaterial({
            color: 0xe25822,
            map: new TextureLoader().load(fireTex),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: AdditiveBlending
        });
        this.point = new PointLight(0xe25822, 30, 30)
        this.init()
    }

    init() {
       for(let i=1;i<=this.count;i++){
           var particle = new Particle(this.particleMaterial)
           this.add(particle)
           this.particles.push(particle);
       }
    }

    update() {
        for(let p of this.particles){
            p.update()
        }    
    }
}