import * as types from '../contants/collectlistActionType'

export const update = (data) => ({type:types.COLLECTLIST_UPDATE,data});
export const addItem = (data) => ({type:types.COLLECTLIST_ADDITEM,data});
export const removeItem = (data) => ({type:types.COLLECTLIST_REMOVEITEM,data});