const express = require('express');
const http = require('http');


const PORT = 3000;


const mongoose = require('mongoose'); 
const url_db = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";


let app = express();


app.use(express.static(__dirname+'/client'));
app.use(express.urlencoded());




mongoose.connect(url_db)
    .then( result=> console.log("db conncected"))
    .catch(err => console.log('ERROR:  db not connected '));





//1.Assunzione Nella traccia è specificato bene se il numero di genere sia fissato 
//METTRE IN OGNI ROTTA ANCHE CONSOLE.LOG (METODO)




//TODO:ID GENERATO CASUALMENTE  


function getArtist(req,res) {

    artists.find({})
        .then(artistJSON => {
            console.log(artistJSON);
            res.status(200).json(artistJSON)})
        .catch((err)=>{
            console.log("fail findDB")
            res.status(404)
        })
    
}



let ArtistSchema = mongoose.Schema({

    id:Number,
    firstName: String,
    lastName: String,
    specialist:String,
    email: String,
    password: String,
    chachet: Number,
    phone: String,
    genre: String,
    vocal_registrer: String,
    img_src: String,
    strumensts:[String]

})


let artists= mongoose.model("ArtistsDocument",ArtistSchema);


let id_artist=0;


//Cerco l'id piu grande 
artists.find({})
    .then(result =>{
        let max = -1;

        result.forEach(element => {
            if(element.id>max)
                max = element.id;
        });

        id= max;

        console.log("MAX ID = " + max);
    })


http.createServer(app).listen(PORT,() => console.log("Server listening in %d",PORT));



app.get('/artists',(req,res) =>{

    //Invio al client il file json 
    //Cerca nell db lo schema e carica tutti i risultati senza filtro
    //invia una lista di oggetti JSON  [{},{}....] 

    getArtist(req,res);

})




app.post('/RemoveArtist',(req,res) =>{


    //Rimuovo L' artista selezionato passando id
    //Req

    console.log(req.body);

    artists.deleteOne({ "id":req.body.id })
        .then(result => {  
            
            console.log("Saul goodman",result);
        })
        .catch(err => {
           
            console.log("ERROR :",err);
            res.status(404).send("Something went wrong , could not elimante artist");
        })


})

app.post('/InsertArtist',(req,res) => {


    //inserisco l' artista selezionato TERMINATO

    console.log("Artist to insert  in  the DB");
    console.log(req.body);


    id_artist++;

    let newArtist = new artists({

        "id": id_artist,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "specialist": req.body.specialist,
        "email": req.body.email,
        "password": req.body.password,
        "chachet": req.body.chachet,
        "phone": req.body.phone,
        "genre": req.body.genre,
        "vocal_registrer": req.body.vocal_registrer,
        "img_src": req.body.img_src,
        "strumensts": req.body.strumensts

    })


    newArtist.save()
        .then((result)=> {
            
            console.log("Good Insert");
            res.status(200).send("Saul Goodman");

        })
        .catch((err) => {
            console.log("ERRORE",err);
            res.status(404).send("Could not save artist");
        })




})





