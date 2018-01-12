import { COLLECTLIST_ADDITEM , COLLECTLIST_REMOVEITEM} from "../contants/collectlistActionType";

const initialState = [];

export default function category(state = initialState ,action) {
    switch (action.type){
        case COLLECTLIST_ADDITEM:
            return state.concat(action.data);
        case COLLECTLIST_REMOVEITEM:
            return state.filter(item =>
               item !== action.data
            );
        default:
            return state;
    }
}
