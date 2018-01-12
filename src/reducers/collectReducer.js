import { COLLECTLIST_ADDITEM } from "../contants/collectlistActionType";

const initialState = [];

export default function category(state = initialState ,action) {
    switch (action.type){
        case COLLECTLIST_ADDITEM:
            return state.concat(action.data);
        default:
            return state;
    }
}
