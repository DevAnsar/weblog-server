import { combineReducers } from 'redux';
import categoryReducer  from './CategoryReducer';
import tagReducer from './TagReducer';
import postReducer from './PostReducer';

const rootReducer = combineReducers({
   category: categoryReducer,
   tag : tagReducer,
   post: postReducer
});
export default rootReducer;