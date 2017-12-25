import {get} from './get'

export function getCarouselNewsData() {
    const result = get('/api/carousel');
    return result;
}

export function getNewsData() {
    const result = get('/api/news');
    return result;
}
