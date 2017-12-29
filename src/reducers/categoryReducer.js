import {UPDATE} from "../contants/categoryActionType";

const initialState = {};

export default function category(state = initialState ,action) {
    switch (action.type){
        case UPDATE:
            return action.data;
        default:
            return state;
    }
}
