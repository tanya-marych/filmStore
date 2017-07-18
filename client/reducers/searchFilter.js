const initialState = {
    searchType:"title",
    searchValue:""
};

export default function filmState(state = initialState, action) {
    switch(action.type){
        case 'CHANGE_FILTER_TYPE':
            return {
                searchType:action.payload,
                searchValue:state.searchValue
            };
        case 'CHANGE_FILTER_VALUE':
            return {
                searchType:state.searchType,
                searchValue:action.payload
            };
        case 'SEARCH_FILM':
            return {
                searchType:action.payload.searchType,
                searchValue:action.payload.state
            };
        default:
            return state;
    }

}