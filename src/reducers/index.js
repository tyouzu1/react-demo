import {combineReducers} from 'redux'

import category from  './categoryReducer'
import userInfo from  './userInfoReducer'

const rootReducer = combineReducers({
    category,
    userInfo
});

export default rootReducer;