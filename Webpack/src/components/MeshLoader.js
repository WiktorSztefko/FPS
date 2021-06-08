import { MD2Loader } from './MD2Loader';
import { MeshBasicMaterial, Mesh, TextureLoader, LoadingManager } from "three";
import texEnemy from "./assets/enemy/tekstura.png"
import pathEnemy from "./assets/enemy/tris.md2"

const Meshes = {
    meshEnemy: pathEnemy
    //tak samo dla treasure pewno
}
let manager = new LoadingManager();

for (let mesh in Meshes) {
    new MD2Loader(manager).load(
        Meshes[mesh],
        geometry => {

            let geo = geometry;
            let skin = new Mesh(geo, new MeshBasicMaterial({
                map: new TextureLoader().load(texEnemy), // dowolny plik png, jpg
                morphTargets: true // animowanie materiału modelu
            }))
            Meshes[mesh] = skin
        },
    );
}
export default Meshes