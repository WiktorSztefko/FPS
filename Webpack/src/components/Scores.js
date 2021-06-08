import health from "../material/health.png"
import ammo from "../material/ammo.png"
export default class PlayerStatistic {
    // constructor(player) {
    //     this.player = player
    //     this.init()
    // }

    static init(player) {
        // let statisticDiv = document.createElement("div")
        // statisticDiv.id = "playerStatistic"

        // let infoDiv = document.createElement("div")
        // infoDiv.id = "infoPlayer"
        // infoDiv.textContent="Player"

        // let ammoDiv = document.createElement("div")
        // ammoDiv.id = "ammo"

        // let healthDiv = document.createElement("div")
        // healthDiv.id = "health"

        // statisticDiv.appendChild(infoDiv)
        // statisticDiv.appendChild(ammoDiv)
        // statisticDiv.appendChild(healthDiv)

        //document.getElementsByTagName("body")[0].appendChild(statisticDiv)

        this.createAmmo(player.ammo)
        this.createHealth(player.health)
    }

    static createAmmo(ile) {
        for (let i = 0; i < ile; i++) {
            let img = document.createElement("img")
            img.src = ammo
            document.getElementById("ammo").appendChild(img)
        }
    }
    static createHealth(ile) {
        for (let i = 0; i < ile; i++) {
            let img = document.createElement("img")
            img.src = health
            document.getElementById("health").appendChild(img)
        }
        
    }
    static updateAmmo(){
        document.getElementById("ammo").removeChild(document.getElementById("ammo").lastElementChild)
    }
    static updateHealth(){
        document.getElementById("health").removeChild(document.getElementById("health").lastElementChild)
    }
    static createEnemyDiv(){
        let div = document.createElement("div")
        div.className = "enemyDiv"

        for (let i = 0; i < 6; i++) {
            let img = document.createElement("img")
            img.src = health
            div.appendChild(img)
        }
        return div
    }


}