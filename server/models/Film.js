import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title : { type: String, required: true},
    format: { type: String },
    releaseYear  : { type: Number },
    stars : { type: String }
});

mongoose.model('Film', FilmSchema);