import {get} from './get'

export function getCategoryData() {
    const result = get('/api/nav');
    return result;
}
