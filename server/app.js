import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './utils/DataBaseUtils';

const app = express();

// Set up connection of database
db.setUpConnection();
// Using bodyParser middleware
app.use( bodyParser.json() );
// Allow requests from any origin
app.use(cors({ origin: '*' }));
app.options('*', cors());

// RESTful api handlers
app.get('/films', (req, res) => {
    db.listFilms().then(data =>res.send(data));
});

app.post('/load',bodyParser.text({type: '*/*'}),(req,res)=>{
    let arr =req.body.trim().split("\n\n");
    let arr1 = arr.map(item=>item.trim().split("\n"));
    
    let obj = arr1.map(item=>{
        let o = {};
        item.forEach(function(element) {
            let k = element.split(": ");
            if(k[0]=="Release Year")
                o["releaseYear"]= k[1];
            else{
                o[k[0].toLowerCase()] = k[1];
            }
        }, this);
        return o;
    });
    db.addFilmS(obj).then(data =>res.send(""));
});

app.post('/films', (req, res) => {
    console.log(req.body);
    db.addFilm(req.body).then(data =>res.send(data));
});

app.delete('/films/:id', (req, res) => {
    db.deleteFilm(req.params.id).then(data => res.send(data));
});

const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});