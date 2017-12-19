import {combineReducers} from 'redux'
import {COMPLETE_ALL} from "../contants/ActionType";
import {initialState} from '../store/categoryStore'

function update(state = initialState ,action) {
    switch (action.types){
        case COMPLETE_ALL:
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    update,
});

export default rootReducer;