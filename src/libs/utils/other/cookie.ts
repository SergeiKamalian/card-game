import { setCookie as setNookieCookie, destroyCookie as destroyNookieCookie } from 'nookies';
import jsCookie from 'js-cookie';

export function setCookie(name: string, data: any, path?: string) {
    setNookieCookie(null, name, data, {
        path: path ?? '/',
    });
}

export function destroyCookie(name: string) {
    destroyNookieCookie(null, name, { path: '/' });
}

export function getCookie(key: string) {
    if (key) return jsCookie.get(key);
    return null;
}
