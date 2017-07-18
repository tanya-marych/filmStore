export function findFilm(searchType,value){
    return {
        type:'SEARCH_FILM',
        payload:{searchType,value}
    };
};

export function changeFilterType(filter){
    return {
        type:'CHANGE_FILTER_TYPE',
        payload:filter
    };
};

export function changeFilterValue(value){
    return {
        type:'CHANGE_FILTER_VALUE',
        payload:value
    };
};