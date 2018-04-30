import {get} from './get'
import {post} from './post'

export function getUserInfoData() {
    const result = get('/api/getUserInfo');
    return result;
}

export function postSignUp(obj) {
    const result = post('/api/signUp', {
        userName:obj.name,
        password:obj.password,
        confirmPassword:obj.confirmPassword,
        email:obj.email,
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