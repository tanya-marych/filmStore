import axios from 'axios';
import { apiPrefix } from '../../etc/config.json';

export default {
    loadData(file){
        return axios.post(`${apiPrefix}/load`,file);
    },

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