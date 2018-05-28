import {post} from './post'

export function postSubscribeData(type,id,key) {
    const result = post('/api/subscribe', {
        type: type,
        id:id,
        key:key||''
    });
    return result
}

export function postSetSubscribeData(data) {
    const result = post('/api/subscribe', data);
    return result
}