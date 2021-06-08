import { AnimationMixer } from 'three';

export default class Animation {
    constructor(mesh) {
        this.mesh = mesh;
        this.mixer = new AnimationMixer(this.mesh);
    }

    playAnim(animName) {
        this.animName = animName
        this.mixer.uncacheRoot(this.mesh)
        this.mixer.clipAction(this.animName).play()
    }

    stopAllAction(){
        this.mixer.stopAllAction()
    }

    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }
}