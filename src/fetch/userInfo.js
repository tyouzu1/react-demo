import {get} from './get'
import {post} from './post'
import LocalStore from '../util/localStore'
import {TOKEN,LOGIN } from '../config/localStoreKey'

export function postUserInfoData() {
    let token = LocalStore.getItem(TOKEN);
    let name = LocalStore.getItem(LOGIN);

    const result = post('/api/getUserInfo', {
        userName:name,
        token:token
    });
    return result;
}

export function postSignUp(obj) {
    const result = post('/api/signUp', {
        userName:obj.name,
        password:obj.password,
        confirmPassword:obj.confirmPassword,
        email:obj.email,
        nick:obj.nick,
    });

    return result;
}

export function postUserUpdate(obj) {
    const result = post('/api/userUpdate', {
        id:obj.id,
        password:obj.password,
        detail_info:obj.detail_info,
        nick:obj.nick,
    });
    return result;
}

export function postSignIn(obj) {
    const result = post('/api/signIn', {
        userName:obj.name,
        password:obj.password,
    });

    return result;
}
