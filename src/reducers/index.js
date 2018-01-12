import {combineReducers} from 'redux'

import category from  './categoryReducer'
import userInfo from  './userInfoReducer'
import collectList from  './collectReducer'

const rootReducer = combineReducers({
    category,
    userInfo,
    collectList
});

export default rootReducer;