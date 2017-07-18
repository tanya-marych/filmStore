import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(){
    const store = createStore(rootReducer,applyMiddleware(thunk));
    return store;
}