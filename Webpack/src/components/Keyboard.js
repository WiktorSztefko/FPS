import Config from "./Config";

export default class Keyboard {
    constructor(domElement, animation, modelMesh) {

        this.domElement = domElement;
        this.animation = animation
        this.modelMesh = modelMesh
        
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);
        this.ok = true
        this.current = null

        this.KEYS = {
            "left": 65,
            "up": 87,
            "right": 68,
            "down": 83,
            "space":32
        };
    }

    onKeyUp(event) {
        if (event.keyCode == this.KEYS.up || event.keyCode == this.KEYS.down) {
            this.animation.stopAllAction()
            this.animation.playAnim("stand")
            this.ok = true
            this.current = null
        }
        switch (event.keyCode) {
            case this.KEYS.up:
                Config.moveForward = false;
                break;
            case this.KEYS.down:
                Config.movePrevious = false;
                break;
            case this.KEYS.left:
                Config.rotateLeft = false;
                break;
            case this.KEYS.right:
                Config.rotateRight = false;
                break;
            case 32:
                Config.laser = false;
                break;
        }
    }

    onKeyDown(event) {
        if ((event.keyCode == this.KEYS.up || event.keyCode == this.KEYS.down) && this.ok == true) {
            this.animation.stopAllAction()
            this.animation.playAnim("run")
            this.ok = false
            this.current = event.keyCode
        }
      
        switch (event.keyCode) {
            case this.KEYS.up:
                Config.moveForward = true;
                break;
            case this.KEYS.down:
                Config.movePrevious = true;
                break;
            case this.KEYS.left:
                Config.rotateLeft = true;
                break;
            case this.KEYS.right:
                Config.rotateRight = true;
                break;
            case this.KEYS.space:
                Config.laser = true
                break;
        }
    }
}