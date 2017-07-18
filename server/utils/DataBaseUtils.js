import '../models/Film';
import mongoose from "mongoose";

const Film = mongoose.model('Film');

export function setUpConnection(){
    mongoose.connect(`mongodb://root:secret@ds161042.mlab.com:61042/film_store`);
}

export function listFilms() {
    return Film.find();
}

export function addFilm(data) {
    const film = new Film({
        title: data.title,
        format: data.format,
        releaseYear: data.releaseYear,
        stars: data.stars
    });

    return film.save();
}

export function addFilmS(data) {
    return Film.db.collections.films.insertMany(data);
}

export function deleteFilm(id) {
    return Film.findById(id).remove();
}