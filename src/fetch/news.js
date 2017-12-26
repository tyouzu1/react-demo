import {get} from './get'

export function getCarouselNewsData(type) {
    const result = get('/api/carousel/'+type);
    return result;
}

export function getNewsData() {
    const result = get('/api/news');
    return result;
}
