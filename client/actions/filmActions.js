import api from '../api';

export function loadData(file){
    return (dispatch)=>{
        api.loadData(file)
        .then(() =>{
            api.listFilms()
                .then(data =>
                    dispatch({
                        type:'LOAD_FILMS',
                        payload:data.data
                    })
                )
        })
        .catch(err =>{
            console.log("*",err);
        }); 
    }
};

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
    console.log(value)
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
};

export function sortList(value){
    return {
        type:'SORT_LIST',
        payload:value 
    };
};
