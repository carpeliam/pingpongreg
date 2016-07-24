import Cookie from 'js-cookie';

const COOKIE_NAME = 'ping.user';

export function fetchUser() {
  const cookie = Cookie.get(COOKIE_NAME);
  let user;
  if (cookie) {
    user = JSON.parse(cookie);
  }
  return user;
}

export function setUser(user) {
  Cookie.set(COOKIE_NAME, JSON.stringify(user));
}
