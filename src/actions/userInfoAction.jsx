import * as types from '../contants/userInfoActionType'

export const update = (data) => ({type:types.USER_INFO,data});
export const updateImageModel = (data) => ({type:types.USER_INFO_IMAGE_MODEL,data});
export const logout = (data) => ({type:types.USER_INFO_LOGOUT,data});
