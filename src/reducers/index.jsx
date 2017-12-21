import {combineReducers} from 'redux'
import {UPDATE} from "../contants/ActionType";
// import {initialState} from '../store/categoryStore'

const initialState = {};
const initialState_ = {};


function nav(state = initialState ,action) {
    switch (action.type){
        case UPDATE:
            return action.data;
        default:
            return state;
    }
}

function userInfo(state = initialState_ ,action) {
    switch (action.types){
        case UPDATE:
            return action.data;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    nav,
    userInfo
});

export default rootReducer;