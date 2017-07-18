const initialState = {
    sorted:false,
    filmTypes:["VHS","DVD","Blu-Ray"],
    films:[]
};

export default function filmState(state = initialState, action) {
    switch(action.type){
        case"LOAD_FILMS":
            return {
                sorted: false,
                filmTypes:state.filmTypes,
                films:action.payload
            };
        case "SORT_LIST":
            return {
                sorted: !state.sorted,
                filmTypes:state.filmTypes,
                films:state.films
            };     
        default:
            return state;
    }

}