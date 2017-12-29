import {get} from './get'

export function getUserInfoData() {
    const result = get('/api/userInfo');
    return result;
}