import {USER_INFO} from "../contants/userInfoActionType";

const initialState = {};

export default function userInfo(state = initialState ,action) {
    switch (action.type){
        case USER_INFO:
            return action.data;
        default:
            return state;
    }
}

