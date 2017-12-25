import {USER_INFO,USER_INFO_IMAGE_MODEL} from "../contants/userInfoActionType";

const initialState = {};

export default function userInfo(state = initialState ,action) {
    switch (action.type){
        case USER_INFO:
            return action.data;
        case USER_INFO_IMAGE_MODEL:
            return {
                ...state,
                imageMode:action.data
            };
        default:
            return state;
    }
}

