import { COLLECTLIST_ADDITEM , COLLECTLIST_REMOVEITEM, COLLECTLIST_UPDATE } from "../contants/collectlistActionType";
import { setCollectData ,deleteCollectData } from '../fetch/collect'

const initialState = [];

export default function category(state = initialState ,action) {
    switch (action.type){
        case COLLECTLIST_UPDATE:
                return action.data;
        case COLLECTLIST_ADDITEM:
                setCollectData(action.data.nid).then(res => {
                    return res.json()
                }).then((json) => {
                }).catch(ex => {
                    if (__DEV__) {
                        console.error('获取分类数据报错, ', ex.message)
                    }
                });
                return state.concat(action.data);
        case COLLECTLIST_REMOVEITEM:
            let collectResult = deleteCollectData(action.data.nid);
            collectResult.then(res => {
                return res.json()
            }).then((json) => {
            }).catch(ex => {
                if (__DEV__) {
                    console.error('获取分类数据报错, ', ex.message)
                }
            });
            console.log(state.filter(item =>
                item.nid != action.data.nid
             ),123333333333333)
            return state.filter(item =>
               item.nid != action.data.nid
            );
        default:
            return state;
    }
}
