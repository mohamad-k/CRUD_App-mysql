const express = require("express")
const mysql = require("mysql")
const app = express()
const port = process.env.PORT || 8080
const mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'mohammed',
    password : '123456',
    database : 'test1'
  })
mysqlConnection.connect(err=>{if(err)throw err
    console.log("mysql connected")}
)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get("/createtable",(req,res)=>{
    let sql = 'CREATE TABLE users (id int AUTO_INCREMENT,name VARCHAR(255), email VARCHAR(255),city VARCHAR(255), PRIMARY KEY (id))';
    mysqlConnection.query(sql,(err, result)=>{
        if(err) throw err
        res.send("table created")
    })
})
app.post("/user/register",(req,res)=>{
    let {name, email, city} = req.body
    let sql = 'INSERT INTO users SET ?';
    mysqlConnection.query(sql, {name, email, city},(err, result)=>{
        if(err) throw err
        res.redirect("/users")
    })
})
app.get("/users",(req,res)=>{
    let sql = 'SELECT * FROM users';
    mysqlConnection.query(sql,(err, results)=>{
        if(err) throw err
        res.render("allusers",{users: results})
    })
})
app.get("/user/delete/:id",(req,res)=>{
    let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
    mysqlConnection.query(sql,(err, result)=>{
        if(err) throw err
        console.log(result)
        res.redirect("/users")
    })
})
app.get("/user/update/:id",(req,res)=>{
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    mysqlConnection.query(sql,(err, result)=>{
        if(err) throw err
        console.log(result)
        res.render("updateuser",{user: result})
    })
})
app.post("/user/update/:id",(req,res)=>{
    let {name, email, city} = req.body
    let sql = `UPDATE users SET name = '${name}', email = '${email}', city = '${city}' WHERE id = ${req.params.id}`;
    mysqlConnection.query(sql,(err, results)=>{
        if(err) throw err
        res.redirect("/users")
    })
})

app.set("view engine", "hbs")
app.use(express.static(__dirname + "views"))
app.get("/",(req,res)=>{
    res.render("index")
})
app.listen(port,console.log("app running on port 3200")) 