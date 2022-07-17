import { combineReducers } from 'redux';
import categoryReducer  from './CategoryReducer';
const rootReducer = combineReducers({
   category: categoryReducer
});
export default rootReducer;