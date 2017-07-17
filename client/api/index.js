import axios from 'axios';
let apiPrefix = "http://localhost:8080";

export default {
    listFilms() {
        return axios.get(`${apiPrefix}/films`);
    },

    addFilm(data) {
        return axios.post(`${apiPrefix}/films`, data);
    },

    deleteFilm(noteId) {
        return axios.delete(`${apiPrefix}/films/${noteId}`);
    }
}