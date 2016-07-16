import shortid from 'shortid';
import Cookie from 'js-cookie';

export default function fetchCurrentUser() {
  let uid = Cookie.get('userid');
  if (!uid) {
    uid = shortid.generate();
    Cookie.set('userid', uid);
  }
  return uid;
}
