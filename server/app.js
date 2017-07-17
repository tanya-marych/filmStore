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

app.post('/films', (req, res) => {
    db.addFilm(req.body).then(data =>res.send(data));
});

app.delete('/films/:id', (req, res) => {
    db.deleteFilm(req.params.id).then(data => res.send(data));
});

const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});