import {post} from './post'
import {get} from './get'

export function getCollectData() {
    const result = get('/api/getCollect');
    return result;
}
export function setCollectData(id) {
    const result = post('/api/setCollect',{
        id,
    });
    return result;
}
export function deleteCollectData(id) {
    const result = post('/api/deleteCollect',{
        id,
    });
    return result;
}
