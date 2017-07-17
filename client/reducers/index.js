import api from '../api';
import actions from '../actions/filmActions.js';
let films =[
    {
        "_id":0,
        "title": "Charade",
        "releaseYear": 1953,
        "format": "DVD",
        "stars": "Audrey Hepburn, Cary Grant, Walter Matthau, James Coburn, George Kennedy"
    },
    {
        "_id":1,
        "title": "Blazing Saddles",
        "releaseYear": 1974,
        "format": "VHS",
        "stars": "Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn"
    },
    {
        "_id":2,
        "title": "Casablanca",
        "releaseYear": 1942,
        "format": "DVD",
        "stars": "Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre"
    }
];

const initialState = {
    sorted:false,
    filmTypes:["VHS","DVD","Blu-Ray"],
    films:[]
};

export default function filmState(state = initialState, action) {
    console.log("heeere?",action.payload);
    switch(action.type){
        case"LOAD_FILMS":
            return {
                sorted: false,
                filmTypes:state.filmTypes,
                films:action.payload
            };
        case "SORT_LIST":
            if(action.payload==false){
                let temp = state.films.slice();
                return {
                    sorted: !state.sorted,
                    filmTypes:state.filmTypes,
                    filmRev:state.films,
                    films:temp.sort((f1,f2) => f1.title>f2.title)
                };
            }
            return {
                sorted: !state.sorted,
                filmTypes:state.filmTypes,
                films:state.filmRev
            };     
        case 'SEARCH_FILM':
            if(action.payload.value=="")
                return {
                sorted: state.sorted,
                filmTypes:state.filmTypes,
                films:state.films
            };
            let temp = state.films.slice();
            return {
                sorted:state.sorted,
                filmTypes:state.filmTypes,
                films:temp.filter(item=>{
                    return item[action.payload.searchType].toLowerCase().indexOf(action.payload.value.toLowerCase())>-1;
                })
            };
        // case 'ADD_FILM':
        // console.log("reducer before");
        
        // console.log("reducer after");
        // loadFilms();
        // console.log("data",x)
        // films.push(action.payload);           
        //     return {
        //         sorted:state.sorted,
        //         filmTypes:state.filmTypes,
        //         films: [...state.films]
        //     }
        // case 'DELETE_FILM':
        //     return {
        //         sorted:state.sorted,
        //         filmTypes:state.filmTypes,
        //         films:state.films.filter(item=>{
        //             return item.id!=action.payload;
        //         })
        //     };
        default:
            return state;
    }

}