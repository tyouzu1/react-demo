import {post} from './post'

export function postSubscribeData(type,id) {
    const result = post('/api/subscribe', {
        type: type,
        id:id
    });
    return result
}