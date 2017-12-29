import {get} from './get'

export function getUserInfoData() {
    const result = get('/api/UserInfo');
    return result;
}