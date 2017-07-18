import { combineReducers } from 'redux';
import film from './film';
import searchFilter from './searchFilter';

export default combineReducers({
  film,
  searchFilter
})
