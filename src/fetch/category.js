import {get} from './get'
import {post} from './post'

export function getCategoryData() {
    const result = get('/api/nav');
    return result;
}

export function setCategoryData(data) {
    const result = post('/api/setNav',{
        tag:JSON.stringify(data.tag),
        push:[]
    });
    return result;
}
