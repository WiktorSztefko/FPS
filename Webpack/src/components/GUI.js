const GUI={

    options:{
        "cameraY":null,
        "cameraVertical":null,
        "cameraDistance":null,
        "ligthIntensity": null,
        "cameraHorizontal":null,
        "cameraFov":null,
        "ligthIntensity":null,
        "shadow":null,
        "topView":null,
        "cameraBehindPLayer":null,
        "FireY":null,
        "FireX":null,
        "FireZ":null,
        "laserSpread":null,
        "laserSize":null,
    }
}
for(let option in GUI.options){
    GUI.options[option]=document.getElementById(option)
}
export default GUI