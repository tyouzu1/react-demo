import {post} from './post'

export function postSubscribeData(type,id) {
    const result = post('/api/subscribe', {
        type: type,
        id:id
    });
    return result
}

export function postSetSubscribeData(data) {
    const result = post('/api/subscribe', data);
    return result
}