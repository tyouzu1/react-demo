import {get} from './get'
import {post} from './post'

export function getUserInfoData() {
    const result = get('/api/getUserInfo');
    return result;
}

export function postSignUp(userName,password,email,confirmPassword) {
    const result = post('/api/signUp', {
        userName,
        password,
        confirmPassword,
        email
    });

    return result;
}

export function postSignIn(userName,password,email,confirmPassword) {
    const result = post('/api/signIn', {
        userName,
        password,
        confirmPassword,
        email
    });

    return result;
}