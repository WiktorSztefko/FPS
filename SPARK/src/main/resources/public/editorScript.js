import testLevel from "./testLevel.js"
class GridItem {
    constructor(x, z) {
        this.item = document.createElement("td")
        this.item.id = `x${x}z${z}`
        this.z = z
        this.x = x
        this.item.addEventListener("click", () => {
            this.setType(currentType)
        })
        this.type = null
    }

    setType(type) {
        if (currentType != undefined) {
            switch (type) {
                case "wall": this.item.style.background = "limegreen"; break;
                case "enemy": this.item.style.background = "red"; break;
                case "treasure": this.item.style.background = "rgb(0, 81, 255)"; break;
                case "ligth": this.item.style.background = "gold"; break;
                case "delete": this.item.style.background = "white"; break;
            }
            this.type = type == "delete" ? null : type

            let obj = {
                id: this.item.id,
                x: this.x,
                y: 0,
                z: this.z,
                type: this.type
            }
            let edit = false
            let index
            for (let i = 0; i < level.length; i++) {
                if (level[i].id == obj.id) {
                    edit = true
                    index = i
                    break
                }
            }
            if (edit) {
                //console.log("zmieniam obecny")
                if (this.type == null) {
                    level.splice(index, 1)
                }
                else {
                    level[index] = obj
                }
            }
            else if (obj.type != null) {
                //console.log("dodaje nowy")
                level.push(obj)
            }
            textDivUpdate()
        }
        else {
            alert("WYBIERZ TYP ITEMA")
        }
    }
}


let grid = document.getElementById("grid")
let currentType = undefined
let currentDiv = undefined
let level = []
createGrid()


function textDivUpdate() {
    // console.log(level)
    if (level.length != 0) {
        document.getElementById("textDiv").textContent = JSON.stringify(level, null, 4)
    }
    else {
        document.getElementById("textDiv").textContent = ""
    }
}

function createGrid() {
    let table = document.createElement("table")

    for (let row = 0; row <= 9; row++) {
        let tr = document.createElement("tr")

        for (let column = 0; column <= 9; column++) {
            let td = new GridItem(column, row)
            tr.appendChild(td.item)
        }
        table.appendChild(tr)
    }
    grid.appendChild(table)
}

let wallButton = document.getElementById("wallButton")
wallButton.addEventListener("click", function () {
    currentType = "wall"
    this.style.border = "5px solid black"
    if (currentDiv) {
        currentDiv.style.border = ""
    }
    currentDiv = this
})

let enemyButton = document.getElementById("enemyButton")
enemyButton.addEventListener("click", function () {
    currentType = "enemy"
    this.style.border = "5px solid black"
    if (currentDiv) {
        currentDiv.style.border = ""
    }
    currentDiv = this
})
let treasureButton = document.getElementById("treasureButton")
treasureButton.addEventListener("click", function () {
    currentType = "treasure"
    this.style.border = "5px solid black"
    if (currentDiv) {
        currentDiv.style.border = ""
    }
    currentDiv = this
})
let ligthButton = document.getElementById("ligthButton")
ligthButton.addEventListener("click", function () {
    currentType = "ligth"
    this.style.border = "5px solid black"
    if (currentDiv) {
        currentDiv.style.border = ""
    }
    currentDiv = this
})
let deleteButton = document.getElementById("deleteButton")
deleteButton.addEventListener("click", function () {
    currentType = "delete"
    this.style.border = "5px solid black"
    if (currentDiv) {
        currentDiv.style.border = ""
    }
    currentDiv = this
})


let saveButton = document.getElementById("saveButton")

saveButton.addEventListener("click", function () {
    saveLevel()
})

let saveTestButton = document.getElementById("saveTestButton")

saveTestButton.addEventListener("click", function(){
    level=testLevel
    saveLevel()
})

async function saveLevel() {

    const body = JSON.stringify(level) // body - dane

    const headers = { "Content-Type": "application/json" } // nagłówek

    let response = await fetch("/add", { method: "post", body, headers }) // fetch

    if (!response.ok)
        return response.status
    else
        alert("ZAPISANO LEVEL NA SERWERZE")
}

let loadButton = document.getElementById("loadButton")

loadButton.addEventListener("click", function () {
    loadLevel()
})

async function loadLevel() {

    const headers = { "Content-Type": "application/json" } // nagłówek

    let response = await fetch("/load", { method: "post", headers }) // fetch

    if (!response.ok) {
        return response.status
    }
    else {
        level = await response.json()
        textDivUpdate()
        grid.innerHTML=""
        createGrid()
        itemsColorUpdate()
    }
}
function itemsColorUpdate() {
    if(level!=""){
        for (let item of level) {
            //console.log(item)
            let elem = document.getElementById(item.id)
            switch (item.type) {
                case "wall": elem.style.background = "limegreen"; break;
                case "enemy": elem.style.background = "red"; break;
                case "treasure": elem.style.background = "rgb(0, 81, 255)"; break;
                case "ligth": elem.style.background = "gold"; break;
                case "delete": elem.style.background = "white"; break;
            }
        }
    }
}