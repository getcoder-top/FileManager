var express = require("express");
var {Pool} = require("pg");
var mysql = require("mysql");
var multer = require("multer");
var fs = require("fs");
var app = express();
var bodyparser = require("body-parser");
var alert = require("alert")

app.set("view engine", 'ejs');


const database = mysql.createConnection({user : "jack7775", password : "Jack@7775", database : "aajmarket", host : "db4free.net" })

database.connect( (err) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("database connected");
    }
})
// newdatabase.query("CREATE TABLE newtable(sessionguid UUID NOT NULL, username text NOT NULL, email email NOT NULL, password password NOT NULL, user text NOT NULL)", (res, err) =>{
//     if(err){
//     console.log(err);
//     }
//     else{
//         console.log("data entered");
//     }
// })

// database();

app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views'));


app.get("/", (request,response) =>{
    response.render("index", {data : ""});
;})

// var newquery = 'SELECT * FROM newtable';

app.get("/filemanager", (request,response) =>{

    Pool.query(newquery, (err, newdata) =>{
        
        if(err){
            consoler.log(err);
        }
        else{
            response.render("filemanager", {data:newdata});
        }
    });
})

app.get("/signup", (req,res) =>{

    var username = req.query.txt;
    var email = req.query.email;
    var password = req.query.pswd;
    var user = req.query.user;

    var newdata = [{username : username, user : user}];

    database.query("INSERT INTO newtable (username, email, password, user) VALUES (" +"'"+username+"', "+ "'"+email+"', " +"'"+password+"', "+ "'"+user+"')", (err) =>{
        if(err){
            console.log(err);
        }
        else{
            res.render("filemanager", {data : newdata});
            console.log("user registered");
        }
    })


    // res.render("filemanager");
})

app.get("/login", (request, response) =>{

    var username = request.query.email;
    var password = request.query.pswd;

    // var newuser = '';
    database.query('SELECT * FROM newtable as t WHERE t.email LIKE ' + "'"+username+"'" + ' && t.password LIKE ' + "'"+password+"'", (err,data) =>{
        if(data!=''){
            response.render("filemanager", {data: data, data1 : ""});
        }
        else{
            var message = [{message : "User not registered"}];
            response.render("index", {data: message});
            console.log("user not registered");
        }
    });

    // console.log(user);

    // if(user!=''){
    //     response.render("filemanager");
    // }
    // else{
    //     console.log("user not registered");
    // }
})

function readfiles(request, response){
}

app.get("/addfolder", (request, response) =>{
    var newfolder = request.query.newfolder;

    var path = "./files/" + newfolder;

    fs.access(path, (err) =>{

    if(err){
        fs.mkdirSync(path, (err) =>{
            var newfiles = fs.readdirSync("files");
                    // files.forEach(file =>{
                    //     console.log(file);
                    // })
                console.log(newfiles);
            
                var data10 = [{newdata : "Folder created"}];
                    response.render("filemanager", {data : newfiles, data1 : data10});
                // })
                console.log("new folder created");
        })
        var newfiles = fs.readdirSync("files");
                    // files.forEach(file =>{
                    //     console.log(file);
                    // })
            
                var data10 = [{newdata : "Folder created"}];
                    response.render("filemanager", {data : newfiles, data1 : data10});
                // })
                console.log("new folder created");
    }
    else{
        var newfiles = fs.readdirSync("files");
        var data10 = [{newdata : "Folder Exists"}];
        response.render("filemanager", {data : newfiles, data1 : data10});
        console.log("folder exists");
    }

    // var data = fs.readdirSync("files");
    // console.log(data);
    // response.render("filemanager", {data : data});

})

    // response.render("filemanager");
})

const newstorage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, "./files");
    },

    filename : (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

var upload = multer({storage : newstorage}).single("newfile");
// app.get("/uploadfile", files, (request, response) =>{

//     // var file = request.query.newfile;
//     console.log(request.file);

//     response.render("filemanager", {data : ""});
// })

app.post("/upload", upload, (request, response, err) =>{
    // upload((request, response, err) =>{
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("File Uploaded");
    //     // console.log(request.query.file);
    
    //     // return response.send("files");
    //     }
    // })
    var data = fs.readdirSync("files");
    var data10 = [{newdata : "File Uploaded"}];
    console.log("File Uploaded");
    response.render("filemanager", {data : data, data1 : data10})
})

app.get("/editfile", (request, response) =>{
    var filename = request.query.filename;
    var newfile = request.query.newfile;

    fs.rename("./files/" + filename, "./files/" + newfile + ".jpg", (err) =>{
        console.log(err);
        var data = fs.readdirSync("files");
    var data10 = [{newdata : "File Edited"}];
    response.render("filemanager", {data : data, data1 : data10});
    });
})

app.get("/delete", (request, response) =>{
    var deletefile = request.query.delete;
    console.log(deletefile)
    //delete the file from the db
    var filename = "./files/" + deletefile;
    fs.unlink(filename, (err) =>{
        console.log(err);
        var data = fs.readdirSync("files");
    var data10 = [{newdata : "File Deleted"}];
    response.render("filemanager", {data : data, data1 : data10});
    console.log("File Deleted " + deletefile);
    });
    fs.rmdir(filename, (err) =>{
        console.log(err);
        var data = fs.readdirSync("files");
    var data10 = [{newdata : "File Deleted"}];
    response.render("filemanager", {data : data, data1 : data10});
    console.log("File Deleted " + deletefile);
    });

    // response.render("filemanager", {data : newdata});
})


app.listen("3000", () =>{console.log("Server running on 3000")})
