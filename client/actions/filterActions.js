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