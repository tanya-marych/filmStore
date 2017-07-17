import api from '../api';

export function loadFilms(value){
    return (dispatch)=>{
        api.listFilms()
            .then(data =>
                dispatch({
                    type:'LOAD_FILMS',
                    payload:data.data
                })
            )
            .catch(err =>{
            console.log("*",err);
        });  
    }
};


export function addFilm(value){
    return (dispatch)=>{
        api.addFilm(value)
        .then(() =>
            api.listFilms()
                .then(data =>
                    dispatch({
                        type:'LOAD_FILMS',
                        payload:data.data
                    })
                )
        )
        .catch(err =>{
            console.log("*",err);
        }); 
    }
};

export function deleteFilm(value){
    console.log("val",value);
    return (dispatch)=>{
        api.deleteFilm(value)
        .then(() =>
            api.listFilms()
                .then(data =>
                    dispatch({
                        type:'LOAD_FILMS',
                        payload:data.data
                    })
                )
        )
        .catch(err =>{
            console.log("*",err);
        }); 
    }
    // return {
    //     type:'DELETE_FILM',
    //     payload:value 
    // };
};

export function sortList(value){
    return {
        type:'SORT_LIST',
        payload:value 
    };
};

export function findFilm(searchType,value){
    return {
        type:'SEARCH_FILM',
        payload:{searchType,value}
    };
};
