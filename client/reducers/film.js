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
        default:
            return state;
    }

}