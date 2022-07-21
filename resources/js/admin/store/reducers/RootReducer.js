import { combineReducers } from 'redux';
import categoryReducer  from './CategoryReducer';
import tagReducer from './TagReducer';

const rootReducer = combineReducers({
   category: categoryReducer,
   tag : tagReducer
});
export default rootReducer;