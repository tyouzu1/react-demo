import * as types from '../contants/collectlistActionType'

export const addItem = (data) => ({type:types.COLLECTLIST_ADDITEM,data});
export const removeItem = (data) => ({type:types.COLLECTLIST_REMOVEITEM,data});