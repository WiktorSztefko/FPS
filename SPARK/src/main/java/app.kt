
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import spark.Request
import spark.Response
import spark.Spark.*
import spark.kotlin.Http
import spark.kotlin.ignite
import java.sql.Connection
import java.sql.Driver
import java.sql.DriverManager


fun main(args: Array<String>) {

    val http: Http = ignite()
    var service = Service()

    http.port(5000)
    http.staticFiles.location("/public");

        http.before() {
            response.header("Access-Control-Allow-Origin", "*")
            response.header("Access-Control-Request-Method", "GET,POST,OPTIONS")
            response.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version")
        }

        http.options("/*"){
            "ok"
        }

        http.get("/") {}

        http.get("/editor") {
            response.type("text/html")
            response.redirect("editor.html")
        }

        http.get("/game"){
            response.type("text/html")
            response.redirect("/game/index.html")
        }

        http.post("/add","application/json") {
            val type = object : TypeToken<MutableList<LevelItem>>() {}.type
            var list: MutableList<LevelItem> = Gson().fromJson(request.body(), type)
            "ok"
            service.setLevel(Level(list.size,list))
            "ok"
        }

        http.post("/load") {
           service.getLevel()
        }

        http.post("/score", "application/json") { add(request, response) }

}

class Service(var empty:Boolean=true){
    private lateinit var level: Level

    fun setLevel(level:Level){
        this.level=level
        println(this.level)
        this.empty=false
    }

    fun getLevel(): String {
        return if(!this.empty){
            Gson().toJson(this.level.list)
        } else{
            Gson().toJson(arrayOf<LevelItem>())
        }
    }
}

fun add(req: Request, res: Response): String { println(req.body())

    val result=Gson().fromJson(req.body(), data::class.java)

    var health=result.health
    var killed=result.killed
    var ammo=result.ammo

//    println(health)
//    println(killed)
//    println(ammo)

    val conn: Connection = DriverManager.getConnection("jdbc:postgresql://localhost/projekt", "postgres", "admin")
    val stmt = conn.createStatement()
    stmt.execute("insert into scores(player_health,killed_enemy,ammunition) values('${health}', '${killed}', '${ammo}')")

    conn.close()
    res.type("text/plain")
    return "ok"
}

data class data(
    val health: String,
    val killed: String,
    val ammo: String)
