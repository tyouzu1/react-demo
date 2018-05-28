import {get} from './get'
import {post} from './post'

export function getCarouselNewsData(type) {
    const result = get('/api/carousel/'+type);
    return result;
}

export function getNewsData(type) {
    const result = get('/api/news/'+type);
    return result;
}

export function getSubscribeNewsData(type) {
    const result = get('/api/subscribe/newsList/'+type);
    return result;
}

export function postAddNewsData(page) {
    const result = post('/api/addNews', {
        page: page,
    });
    return result
}

export function getNoticeData(id) {
    const result = get('/api/getNotice/'+id);
    return result;
}

export function getNewsDetailData(id) {
    const result = get('/api/detail/'+id);
    return result;
}

export function getNewsLike(id,like) {
    const result = get('/api/like/'+id + '/' +like);
    return result;
}

export function getNewsCommentData(id) {
    const result = get('/api/comment/'+id);
    return result;
}
export function getNewsCommentCountData(id) {
    const result = get('/api/commentCount/'+id);
    return result;
}
export function postNewsCommentData(id,data) {
    const result = post('/api/setComment', {
        id: id,
        data: JSON.stringify(data),
    });
    return result;
}

